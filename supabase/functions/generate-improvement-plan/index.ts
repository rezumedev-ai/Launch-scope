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

  console.log('generate-improvement-plan function called')

  try {
    const { idea, analysis } = await req.json()

    console.log('Received input:', { 
      ideaLength: idea?.length || 0, 
      hasAnalysis: !!analysis,
      analysisKeys: analysis ? Object.keys(analysis) : []
    })

    if (!idea || !analysis) {
      console.error('Missing required input:', { hasIdea: !!idea, hasAnalysis: !!analysis })
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
      console.error('OPENAI_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not configured. Please check environment variables.',
          details: 'OPENAI_API_KEY is missing from environment'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('OpenAI API key found, length:', openaiApiKey.length)

    // Extract current viability score for context
    const currentScore = analysis.detailedViabilityBreakdown?.weightedOverallScore 
      ? parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore)
      : parseInt(analysis.viabilityScore?.split(' ')[0]) || 5;

    console.log('Current viability score extracted:', currentScore)

    // Create the improvement plan prompt optimized for GPT-5-Mini
    const prompt = `You are a startup validation expert specializing in helping solo developers improve their ideas.

STARTUP IDEA: "${idea}"

CURRENT ANALYSIS DATA:
• Viability Score: ${currentScore}/10
• Verdict: ${analysis.verdict || 'Not specified'}
• Problem Fit: ${analysis.problemFit || 'Not analyzed'}
• Primary Audience: ${analysis.audience?.primary || 'Not defined'}
• Secondary Audience: ${analysis.audience?.secondary || 'None'}

DETAILED SCORES:
• Market Demand: ${analysis.detailedViabilityBreakdown?.marketDemand?.score || 'N/A'}/10
• Technical Feasibility: ${analysis.detailedViabilityBreakdown?.technicalFeasibility?.score || 'N/A'}/10
• Differentiation: ${analysis.detailedViabilityBreakdown?.differentiation?.score || 'N/A'}/10
• Monetization: ${analysis.detailedViabilityBreakdown?.monetizationPotential?.score || 'N/A'}/10
• Timing: ${analysis.detailedViabilityBreakdown?.timing?.score || 'N/A'}/10

CURRENT STRENGTHS: ${analysis.strengths?.join(' | ') || 'None identified'}
CURRENT CHALLENGES: ${analysis.challenges?.join(' | ') || 'None identified'}
CURRENT MVP FEATURES: ${analysis.leanMVP?.join(' | ') || 'None specified'}

REQUIREMENTS:
1. Focus on the lowest-scoring areas first
2. Provide concrete actions for solo developers
3. Prioritize validation over building
4. Be specific to this idea and analysis
5. Include realistic effort and impact assessments

Respond with valid JSON in this exact format:

{
  "summary": "Brief overview of main improvement areas",
  "keyAreasForImprovement": [
    "List 3-5 specific areas needing attention"
  ],
  "actionableSteps": [
    {
      "category": "Problem/Solution Fit",
      "description": "Specific action to take",
      "impact": "High",
      "effort": "Low"
    }
  ],
  "potentialPivots": [
    "Alternative directions if needed"
  ],
  "estimatedScoreIncrease": "Realistic estimate like '2-3 points'",
  "warning": "Critical risks or caveats"
}

Valid categories: Problem/Solution Fit, Audience, MVP Features, Monetization, Distribution, Validation, Pivot Consideration
Valid impact levels: High, Medium, Low
Valid effort levels: Low, Medium, High

Generate 6-10 actionable steps addressing the weakest areas.`

    console.log('Prompt created, length:', prompt.length)
    console.log('Making request to OpenAI API...')

    // Make request to OpenAI API
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
            content: 'You are a startup improvement expert. Always respond with valid JSON format for improvement plans focused on solo developers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_completion_tokens: 4000
      }),
    })

    console.log('OpenAI API response status:', response.status, response.statusText)

    if (!response.ok) {
      let errorMessage = 'Failed to generate improvement plan'
      let errorDetails = null
      try {
        const errorData = await response.json()
        console.error('OpenAI API error data:', errorData)
        errorMessage = errorData.error?.message || errorData.error || errorMessage
        errorDetails = errorData
      } catch {
        const errorText = await response.text()
        console.error('OpenAI API error text:', errorText)
        errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`
        errorDetails = { rawError: errorText }
      }
      console.error('OpenAI API error:', errorMessage)
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API Error: ${errorMessage}`,
          status: response.status,
          statusText: response.statusText,
          details: errorDetails
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    console.log('OpenAI API response received, choices length:', data.choices?.length || 0)
    
    const improvementPlan = data.choices?.[0]?.message?.content

    if (!improvementPlan) {
      console.error('No content in OpenAI response:', data)
      return new Response(
        JSON.stringify({ 
          error: 'No improvement plan content received from OpenAI',
          rawResponse: data,
          details: 'OpenAI returned empty or invalid content'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Raw improvement plan received, length:', improvementPlan.length)
    console.log('Raw improvement plan preview:', improvementPlan.substring(0, 200) + '...')

    // Try to parse the JSON response
    let parsedPlan
    try {
      const trimmedPlan = improvementPlan.trim()
      if (!trimmedPlan) {
        console.error('Empty improvement plan after trimming')
        throw new Error('Empty response from OpenAI')
      }
      console.log('Attempting to parse JSON...')
      parsedPlan = JSON.parse(improvementPlan)
      console.log('JSON parsed successfully, keys:', Object.keys(parsedPlan))
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError, 'Raw plan:', improvementPlan)
      return new Response(
        JSON.stringify({ 
          error: `Failed to parse improvement plan: ${parseError.message}`,
          rawResponse: improvementPlan,
          details: {
            parseError: parseError.message,
            rawContentLength: improvementPlan.length,
            rawContentPreview: improvementPlan.substring(0, 500)
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate required fields and provide defaults if missing
    if (!parsedPlan.summary) {
      console.warn('Missing summary in parsed plan, adding default')
      parsedPlan.summary = "Improvement plan generated based on analysis"
    }
    
    if (!Array.isArray(parsedPlan.keyAreasForImprovement)) {
      console.warn('Missing or invalid keyAreasForImprovement, adding defaults')
      parsedPlan.keyAreasForImprovement = ["Market validation", "Product differentiation", "Revenue model"]
    }
    
    if (!Array.isArray(parsedPlan.actionableSteps)) {
      console.warn('Missing or invalid actionableSteps, adding defaults')
      parsedPlan.actionableSteps = [
        {
          category: "Validation",
          description: "Conduct customer interviews to validate the problem",
          impact: "High",
          effort: "Medium"
        }
      ]
    }
    
    if (!Array.isArray(parsedPlan.potentialPivots)) {
      console.warn('Missing potentialPivots, adding empty array')
      parsedPlan.potentialPivots = []
    }
    
    if (!parsedPlan.estimatedScoreIncrease) {
      console.warn('Missing estimatedScoreIncrease, adding default')
      parsedPlan.estimatedScoreIncrease = "1-2 points with proper execution"
    }
    
    console.log('Improvement plan validation complete, returning success response')
    
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
    console.error('Error stack:', error.stack)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
});