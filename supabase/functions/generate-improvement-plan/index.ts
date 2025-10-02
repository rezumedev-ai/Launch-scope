import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { idea, analysis } = await req.json()

    if (!idea || !analysis) {
      return new Response(
        JSON.stringify({ error: 'Both idea and analysis are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get OpenAI API key from environment variables
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

    // Extract current viability score for context
    const currentScore = analysis.detailedViabilityBreakdown?.weightedOverallScore 
      ? parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore)
      : parseInt(analysis.viabilityScore?.split(' ')[0]) || 5;

    // Create the improvement plan prompt
    const prompt = `
You are LaunchScope AI, a highly experienced startup mentor specializing in helping solo developers and indie hackers refine their ideas. Your goal is to provide a clear, actionable, and brutally honest improvement plan to elevate a startup idea's viability score from its current state to a high-potential state (8-10).

CURRENT STARTUP IDEA: "${idea}"

CURRENT ANALYSIS CONTEXT:
- Current Viability Score: ${currentScore}/10
- Verdict: ${analysis.verdict}
- Problem Fit: ${analysis.problemFit}
- Primary Audience: ${analysis.audience?.primary}
- Secondary Audience: ${analysis.audience?.secondary || 'None specified'}

DETAILED VIABILITY BREAKDOWN:
${analysis.detailedViabilityBreakdown ? `
- Market Demand: ${analysis.detailedViabilityBreakdown.marketDemand?.score}/10 - ${analysis.detailedViabilityBreakdown.marketDemand?.justification}
- Technical Feasibility: ${analysis.detailedViabilityBreakdown.technicalFeasibility?.score}/10 - ${analysis.detailedViabilityBreakdown.technicalFeasibility?.justification}
- Differentiation: ${analysis.detailedViabilityBreakdown.differentiation?.score}/10 - ${analysis.detailedViabilityBreakdown.differentiation?.justification}
- Monetization Potential: ${analysis.detailedViabilityBreakdown.monetizationPotential?.score}/10 - ${analysis.detailedViabilityBreakdown.monetizationPotential?.justification}
- Timing: ${analysis.detailedViabilityBreakdown.timing?.score}/10 - ${analysis.detailedViabilityBreakdown.timing?.justification}
` : 'Detailed breakdown not available'}

STRENGTHS: ${analysis.strengths?.join(', ') || 'None identified'}
CHALLENGES: ${analysis.challenges?.join(', ') || 'None identified'}
CURRENT MVP FEATURES: ${analysis.leanMVP?.join(', ') || 'None specified'}
DISTRIBUTION CHANNELS: ${analysis.distribution?.join(', ') || 'None specified'}
MONETIZATION MODELS: ${analysis.monetization?.join(', ') || 'None specified'}

INSTRUCTIONS:
1. Focus on the lowest-scoring areas from the detailed viability breakdown
2. Provide concrete, specific actions tailored for a solo developer with minimal budget
3. Prioritize validation steps over immediate building
4. Be brutally honest about fundamental flaws that require pivots
5. All suggestions must be lean, low-cost, and validation-first approaches
6. Avoid generic advice - be specific and actionable

Respond strictly in the following JSON format:

{
  "summary": "A concise overview of the main areas for improvement based on the analysis",
  "keyAreasForImprovement": [
    "List 3-5 specific areas from the viability breakdown that need the most attention"
  ],
  "actionableSteps": [
    {
      "category": "Problem/Solution Fit" | "Audience" | "MVP Features" | "Monetization" | "Distribution" | "Validation" | "Pivot Consideration",
      "description": "A concrete, specific action the founder should take. Be specific to this idea and analysis.",
      "impact": "High" | "Medium" | "Low",
      "effort": "Low" | "Medium" | "High"
    }
  ],
  "potentialPivots": [
    "If the core idea has fundamental flaws, suggest 1-3 alternative directions based on the strengths identified"
  ],
  "estimatedScoreIncrease": "A realistic estimate of potential score increase if the plan is executed (e.g., '2-3 points', '1-2 points')",
  "warning": "Any critical caveats or risks associated with the improvement plan"
}

Generate 6-10 actionable steps that directly address the weaknesses identified in the analysis. Focus on the areas with the lowest scores first.
`;

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert startup advisor focused on helping solo developers improve their ideas. Always respond with valid JSON format as requested.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_completion_tokens: 4000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      let errorMessage = 'Failed to generate improvement plan'
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
    const improvementPlan = data.choices?.[0]?.message?.content

    if (!improvementPlan) {
      console.error('No content in OpenAI response:', data)
      return new Response(
        JSON.stringify({ 
          error: 'No improvement plan content received from OpenAI',
          rawResponse: data 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Try to parse the JSON response
    let parsedPlan
    try {
      const trimmedPlan = improvementPlan.trim()
      if (!trimmedPlan) {
        throw new Error('Empty response from OpenAI')
      }
      parsedPlan = JSON.parse(improvementPlan)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError, 'Raw plan:', improvementPlan)
      return new Response(
        JSON.stringify({ 
          error: `Failed to parse improvement plan: ${parseError.message}`,
          rawResponse: improvementPlan 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate required fields and provide defaults if missing
    if (!parsedPlan.summary) {
      parsedPlan.summary = "Improvement plan generated based on analysis";
    }
    
    if (!Array.isArray(parsedPlan.keyAreasForImprovement)) {
      parsedPlan.keyAreasForImprovement = ["Market validation", "Product differentiation", "Revenue model"];
    }
    
    if (!Array.isArray(parsedPlan.actionableSteps)) {
      parsedPlan.actionableSteps = [
        {
          category: "Validation",
          description: "Conduct customer interviews to validate the problem",
          impact: "High",
          effort: "Medium"
        }
      ];
    }
    
    if (!Array.isArray(parsedPlan.potentialPivots)) {
      parsedPlan.potentialPivots = [];
    }
    
    if (!parsedPlan.estimatedScoreIncrease) {
      parsedPlan.estimatedScoreIncrease = "1-2 points with proper execution";
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        plan: parsedPlan,
        currentScore: currentScore
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in generate-improvement-plan function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})