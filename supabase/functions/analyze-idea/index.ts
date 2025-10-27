import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { idea, refinedData, parentAnalysisId } = await req.json()

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    let ideaToAnalyze: string;
    let isRefinement = false;

    if (refinedData) {
      isRefinement = true;
      ideaToAnalyze = refinedData.idea;
    } else if (idea) {
      ideaToAnalyze = idea;
    } else {
      return new Response(
        JSON.stringify({ error: 'Startup idea is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { data: subscriptionData } = await supabase
      .from('stripe_user_subscriptions')
      .select('subscription_status')
      .maybeSingle()

    const hasActiveSubscription = subscriptionData &&
      (subscriptionData.subscription_status === 'active' ||
       subscriptionData.subscription_status === 'trialing')

    if (!hasActiveSubscription && !isRefinement) {
      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      const { count, error: countError } = await supabase
        .from('analysis_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .is('parent_analysis_id', null)
        .gte('created_at', firstDayOfMonth.toISOString())

      if (countError) {
        console.error('Error checking usage:', countError)
      } else if (count && count >= 1) {
        return new Response(
          JSON.stringify({
            error: 'Free plan limit reached',
            message: 'You have reached your monthly limit of 1 analysis on the free plan. Upgrade to get unlimited analyses.',
            limitReached: true
          }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let prompt = `
You are LaunchScope AI — a brutally honest startup mentor for solo developers, indie hackers, and vibe coders. 
Your role is NOT to validate every idea, but to give an unfiltered, professional, and reality-checked analysis. 
Solo devs must walk away with clarity, not delusion.

Rules of engagement:
- Always prioritize truth over encouragement. Do not sugarcoat.
- Point out fatal flaws, market risks, or unrealistic assumptions directly.
- Assume the founder is building alone, with minimal budget, using AI coding tools (GPT-5, Claude Code, Cursor) and cheap infra (Vercel, Supabase, Firebase, etc.).
- Be concise but thorough: every section should give practical value, not generic advice.
- Maintain a professional, matter-of-fact tone (think "startup analyst who respects their time").
- If the idea is weak or non-viable, state that clearly and explain why.

SCORING DISCIPLINE:
- Most ideas will score 4-6 overall. This is normal and expected.
- Score 7-8: Reserved for ideas with clear product-market fit, validated demand, and unique positioning
- Score 8-10: Only for exceptional ideas with obvious competitive advantages and strong market signals
- Score 1-3: Fatal flaws, no clear path to viability, saturated markets with no differentiation
- Do NOT be generous. A "me-too" SaaS in a crowded space is a 4-5, not a 7.
- Each dimension should be scored independently based on evidence, not optimism.

SCORING CALIBRATION EXAMPLES:
- "A todo app with AI features": Market Demand: 3 (saturated), Technical: 8 (easy), Differentiation: 3 (me-too), Monetization: 4 (hard to charge), Timing: 5 (okay) = Overall: ~4.0
- "B2B tool automating a painful manual process for accountants": Market Demand: 8 (clear pain), Technical: 7 (achievable), Differentiation: 7 (specific niche), Monetization: 8 (B2B will pay), Timing: 7 (good) = Overall: ~7.5
- "Generic social network for a broad audience": Market Demand: 4 (uncertain), Technical: 5 (complex), Differentiation: 2 (commodity), Monetization: 3 (ads only), Timing: 3 (late) = Overall: ~3.3
- "Notion alternative for X niche": Market: 4 (saturated note-taking), Technical: 7 (doable), Differentiation: 5 (niche helps but Notion dominates), Monetization: 6 (freemium works), Timing: 5 (market mature) = Overall: ~5.3
- "WhatsApp bot for restaurant reservations": Market: 7 (real pain point), Technical: 8 (API integration), Differentiation: 6 (geographic advantage), Monetization: 7 (B2B SaaS), Timing: 8 (WhatsApp Business API recently launched) = Overall: ~7.3
- "AI-powered resume builder": Market: 3 (saturated), Technical: 6 (needs AI integration), Differentiation: 3 (dozens exist), Monetization: 4 (race to bottom on pricing), Timing: 4 (trend cooling) = Overall: ~3.8

Analyze the following startup idea:

Startup Idea: "${ideaToAnalyze}"

Respond strictly in the following JSON format:

{
  "summary": "2-3 sentence objective description of the idea",
  "problemFit": {
    "description": "Clear statement of the problem being solved",
    "painLevel": "Critical/High/Medium/Low - how painful is this problem for users?",
    "currentSolutions": "How do people solve this today and why is it inadequate?",
    "proofPoints": "Evidence that this problem exists (searches, forums, complaints, workarounds). Be specific with examples."
  },
  "audience": {
    "primary": "Main group that would realistically use this",
    "secondary": "Other possible but less likely groups"
  },
  "opportunities": [
    "3-5 specific, actionable opportunities: underserved market segments, emerging trends to leverage, gaps in competitor offerings, technological advantages, timing-based windows. Be concrete and tactical, not generic."
  ],
  "strengths": [
    "3-4 grounded advantages if they exist (omit if none)"
  ],
  "challenges": [
    "3-4 blunt risks or roadblocks — technical, financial, or market"
  ],
  "riskFactors": [
    {
      "risk": "Specific risk description",
      "severity": "High/Medium/Low",
      "mitigation": "Concrete mitigation strategy"
    }
  ],
  "competitiveAnalysis": {
    "directCompetitors": [
      "2-3 main direct competitors or competitive forces with brief notes on their positioning and weaknesses"
    ],
    "competitiveAdvantages": [
      "2-3 specific, defensible ways this idea could differentiate and win"
    ],
    "barrierToEntry": "Low/Medium/High - how easy is it for others to copy this once you prove it works?"
  },
  "leanMVP": [
    "3-5 features that could realistically be built/tested first (if viable)"
  ],
  "buildCost": {
    "estimate": "Low/Medium/High (indie POV)",
    "notes": "Realistic assumptions with AI coding tools + cheap infra"
  },
  "timeToMVP": "Estimated weeks to build a working demo alone",
  "distribution": [
    "2-3 practical channels if this can actually gain traction"
  ],
  "monetization": [
    "2-3 revenue models that make sense, otherwise 'none viable'"
  ],
  "nextSteps": [
    "3-5 concrete, actionable next steps for the founder to take immediately"
  ],
  "customerAcquisition": {
    "primaryChannel": "Most promising channel with specific reasoning why it will work for this idea",
    "estimatedCAC": "Low (<$50), Medium ($50-$200), or High (>$200) - rough customer acquisition cost estimate",
    "earlyAdopterStrategy": "Concrete plan for getting first 10, then 50, then 100 customers"
  },
  "successMetrics": {
    "mvpValidation": "What specific metrics would prove the MVP is working? (e.g., '50 signups in month 1', '20% weekly active', '15% conversion rate')",
    "pmfIndicators": "What signals would indicate product-market fit? (e.g., '40% users active weekly', 'Organic referrals >20%', 'Users complain if service goes down')",
    "revenueGoal": "Realistic first-year revenue target based on this model (be specific with numbers)"
  },
  "marketSignals": {
    "searchVolume": "Be specific with numbers when possible: e.g., '10K-50K monthly searches for X keyword', 'Growing 20% YoY based on Google Trends', 'Reddit has 50K members in r/problemspace'. Cite evidence.",
    "fundingActivity": "Cite specific examples: 'CompanyX raised $Nm in 2024', 'Y VC funds actively investing', 'Z recent acquisitions in space'. Be concrete with names and numbers.",
    "competitionDensity": "Quantify: 'X major players control Y% market share', 'Z total companies in space per Crunchbase', 'Market dominated by NAME', 'Fragmented with no clear leader'",
    "adoptionStage": "Be specific about adoption curve position with evidence of where the market is and momentum direction"
  },
  "detailedViabilityBreakdown": {
    "marketDemand": {
      "score": 1-10 (number),
      "justification": "MUST include: (1) specific evidence or data point, (2) comparison to benchmark, (3) key factor influencing score, (4) one action to improve score by 1-2 points. Score 8-10: validated demand with evidence, 6-7: moderate signals, 4-5: uncertain demand, 1-3: no clear demand or saturated market"
    },
    "technicalFeasibility": {
      "score": 1-10 (number),
      "justification": "MUST include: (1) specific technical requirements, (2) comparison to similar builds, (3) key complexity factor, (4) one action to de-risk. Score 8-10: easily achievable, 6-7: doable with effort, 4-5: challenging but possible, 1-3: requires team/expertise beyond solo dev"
    },
    "differentiation": {
      "score": 1-10 (number),
      "justification": "MUST include: (1) specific differentiator, (2) how it compares to alternatives, (3) defensibility factor, (4) one way to strengthen uniqueness. Score 8-10: clear competitive advantage, 6-7: some differentiation, 4-5: minor differences, 1-3: commodity/me-too product"
    },
    "monetizationPotential": {
      "score": 1-10 (number),
      "justification": "MUST include: (1) specific revenue model, (2) willingness-to-pay evidence, (3) pricing benchmark, (4) one way to improve monetization. Score 8-10: clear willingness to pay, 6-7: viable models exist, 4-5: uncertain monetization, 1-3: no realistic revenue path"
    },
    "timing": {
      "score": 1-10 (number),
      "justification": "MUST include: (1) specific market trend, (2) timing evidence, (3) window of opportunity, (4) timing risk to watch. Score 8-10: perfect timing/emerging trend, 6-7: good timing, 4-5: okay timing, 1-3: too early/too late/declining market"
    },
    "weightedOverallScore": "Calculate using: (marketDemand × 0.25) + (monetizationPotential × 0.25) + (technicalFeasibility × 0.20) + (differentiation × 0.20) + (timing × 0.10). Return as string with 1 decimal (e.g., '5.8')",
    "overallJustification": "2-3 sentence summary explaining the overall score"
  },
  "founderFit": {
    "skillsRequired": [
      "2-3 critical skills needed to execute this successfully (e.g., 'Cold email outreach', 'Technical SEO', 'B2B sales', 'Community building')"
    ],
    "learningCurve": "Low/Medium/High - complexity of skills required for a solo technical founder",
    "domainKnowledge": "How important is industry expertise? Can it be learned quickly or is deep experience required?"
  },
  "viabilityScore": "Format as: '{rounded score} - {verdict text}' where verdict is 'Excellent viability for indie development' (8-10), 'Good viability with manageable risks' (6-7), 'Fair viability requiring careful execution' (4-5), or 'Poor viability with significant challenges' (1-3)",
  "verdict": "Your final honest assessment: is this worth building? Be direct."
}
`;

    if (isRefinement && refinedData) {
      prompt += `

REFINEMENT CONTEXT:
This is a refined version of a previously analyzed idea. Pay special attention to these modified aspects:
${refinedData.problemFit ? `- Problem-Solution Fit: ${refinedData.problemFit}` : ''}
${refinedData.primaryAudience ? `- Primary Audience: ${refinedData.primaryAudience}` : ''}
${refinedData.secondaryAudience ? `- Secondary Audience: ${refinedData.secondaryAudience}` : ''}
${refinedData.leanMVP ? `- MVP Features: ${refinedData.leanMVP.join(', ')}` : ''}
${refinedData.distribution ? `- Distribution Channels: ${refinedData.distribution.join(', ')}` : ''}
${refinedData.monetization ? `- Revenue Models: ${refinedData.monetization.join(', ')}` : ''}

Focus your analysis on how these refinements impact the overall viability and provide comparative insights where relevant.
`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert startup advisor with deep knowledge of indie hacker economics and market realities. You MUST respond with valid, complete JSON that includes ALL requested fields, especially the detailedViabilityBreakdown with numeric scores (1-10) for all five dimensions. Be precise with numbers. Do not use markdown code blocks, return pure JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_completion_tokens: 8000,
        temperature: 1,
      }),
    })

    if (!response.ok) {
      let errorMessage = 'Failed to analyze idea'
      try {
        const errorData = await response.json()
        errorMessage = errorData.error?.message || errorData.error || errorMessage
      } catch {
        const errorText = await response.text()
        errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`
      }
      console.error('OpenAI API error:', errorMessage)
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API Error: ${errorMessage}`,
          status: response.status,
          statusText: response.statusText
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    const analysis = data.choices?.[0]?.message?.content

    if (!analysis) {
      console.error('No content in OpenAI response:', data)
      return new Response(
        JSON.stringify({ 
          error: 'No analysis content received from OpenAI',
          rawResponse: data 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let parsedAnalysis
    try {
      const trimmedAnalysis = analysis.trim()
      if (!trimmedAnalysis) {
        throw new Error('Empty response from OpenAI')
      }
      parsedAnalysis = JSON.parse(analysis)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError, 'Raw analysis:', analysis)
      return new Response(
        JSON.stringify({ 
          error: `Failed to parse analysis: ${parseError.message}`,
          rawResponse: analysis 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const hasValidBreakdown = parsedAnalysis.detailedViabilityBreakdown &&
      parsedAnalysis.detailedViabilityBreakdown.marketDemand &&
      parsedAnalysis.detailedViabilityBreakdown.technicalFeasibility &&
      parsedAnalysis.detailedViabilityBreakdown.differentiation &&
      parsedAnalysis.detailedViabilityBreakdown.monetizationPotential &&
      parsedAnalysis.detailedViabilityBreakdown.timing;

    if (!hasValidBreakdown) {
      console.error('CRITICAL: Model did not return detailedViabilityBreakdown. Raw response:', analysis);
      console.error('This indicates a prompt issue. The model should return all 5 scoring dimensions.');
      console.warn('Using fallback scoring - THIS SHOULD NOT HAPPEN IN PRODUCTION');

      parsedAnalysis.detailedViabilityBreakdown = {
        marketDemand: { score: 5, justification: "ERROR: Score not provided by AI model. Check prompt configuration." },
        technicalFeasibility: { score: 5, justification: "ERROR: Score not provided by AI model. Check prompt configuration." },
        differentiation: { score: 5, justification: "ERROR: Score not provided by AI model. Check prompt configuration." },
        monetizationPotential: { score: 5, justification: "ERROR: Score not provided by AI model. Check prompt configuration." },
        timing: { score: 5, justification: "ERROR: Score not provided by AI model. Check prompt configuration." },
        weightedOverallScore: "5.0",
        overallJustification: "ERROR: AI model did not return proper scoring data. Please review the analysis manually."
      };
    } else {
      const breakdown = parsedAnalysis.detailedViabilityBreakdown;
      ['marketDemand', 'technicalFeasibility', 'differentiation', 'monetizationPotential', 'timing'].forEach(key => {
        const score = breakdown[key]?.score;
        if (typeof score !== 'number' || score < 1 || score > 10) {
          console.error(`Invalid score for ${key}: ${score}. Raw:`, breakdown[key]);
          breakdown[key].score = 5;
          breakdown[key].justification = `ERROR: Invalid score received (${score}). ${breakdown[key].justification || ''}`;
        }
      });

      if (!breakdown.weightedOverallScore || isNaN(parseFloat(breakdown.weightedOverallScore))) {
        const weightedScore = (
          (breakdown.marketDemand.score * 0.25) +
          (breakdown.monetizationPotential.score * 0.25) +
          (breakdown.technicalFeasibility.score * 0.20) +
          (breakdown.differentiation.score * 0.20) +
          (breakdown.timing.score * 0.10)
        );
        breakdown.weightedOverallScore = weightedScore.toFixed(1);
        console.warn('Calculated weightedOverallScore from component scores:', weightedScore);
      }

      if (!breakdown.overallJustification) {
        breakdown.overallJustification = parsedAnalysis.verdict || "Comprehensive viability analysis completed";
      }

      console.log('Score distribution:', {
        overall: breakdown.weightedOverallScore,
        breakdown: {
          marketDemand: breakdown.marketDemand.score,
          technicalFeasibility: breakdown.technicalFeasibility.score,
          differentiation: breakdown.differentiation.score,
          monetizationPotential: breakdown.monetizationPotential.score,
          timing: breakdown.timing.score
        },
        idea: ideaToAnalyze.substring(0, 100)
      });
    }

    if (!parsedAnalysis.nextSteps || !Array.isArray(parsedAnalysis.nextSteps) || parsedAnalysis.nextSteps.length === 0) {
      parsedAnalysis.nextSteps = [
        "Validate the problem by interviewing 10-15 potential customers",
        "Create a simple landing page to test market interest",
        "Build a minimal prototype to demonstrate core functionality",
        "Research and analyze direct competitors in detail",
        "Define your go-to-market strategy and first distribution channel"
      ];
    }

    if (!parsedAnalysis.validationSteps) {
      parsedAnalysis.validationSteps = [
        "Create a landing page to test interest",
        "Conduct customer interviews",
        "Build a simple prototype",
        "Test with target users"
      ];
    }

    if (!parsedAnalysis.verdict || typeof parsedAnalysis.verdict !== 'string') {
      const weightedScore = parseFloat(parsedAnalysis.detailedViabilityBreakdown?.weightedOverallScore || '5');
      if (weightedScore >= 8) {
        parsedAnalysis.verdict = 'Excellent viability for indie development';
      } else if (weightedScore >= 6) {
        parsedAnalysis.verdict = 'Good viability with manageable risks';
      } else if (weightedScore >= 4) {
        parsedAnalysis.verdict = 'Fair viability requiring careful execution';
      } else {
        parsedAnalysis.verdict = 'Poor viability with significant challenges';
      }
    }
    
    const weightedScore = parseFloat(parsedAnalysis.detailedViabilityBreakdown.weightedOverallScore);
    parsedAnalysis.viabilityScore = `${Math.round(weightedScore)} - ${
      weightedScore >= 8 ? 'Excellent viability for indie development' :
      weightedScore >= 6 ? 'Good viability with manageable risks' :
      weightedScore >= 4 ? 'Fair viability requiring careful execution' :
      'Poor viability with significant challenges'
    }`;
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: parsedAnalysis,
        idea: ideaToAnalyze,
        isRefinement: isRefinement,
        parentAnalysisId: parentAnalysisId || null
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in analyze-idea function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})