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
    const { idea } = await req.json()

    if (!idea) {
      return new Response(
        JSON.stringify({ error: 'Startup idea is required' }),
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

    // Create the prompt for startup idea analysis
    const prompt = `
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

Analyze the following startup idea:

Startup Idea: "${idea}"

Respond strictly in the following JSON format:

{
  "summary": "2-3 sentence objective description of the idea",
  "problemFit": "Does this solve a proven problem or is it a solution in search of a problem?",
  "audience": {
    "primary": "Main group that would realistically use this",
    "secondary": "Other possible but less likely groups"
  },
  "strengths": [
    "3-4 grounded advantages if they exist (omit if none)"
  ],
  "challenges": [
    "3-4 blunt risks or roadblocks — technical, financial, or market"
  ],
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
    "3-4 realistic actions to test the idea — or exit paths if non-viable"
  ],
  "verdict": "One sentence blunt assessment (e.g., 'Strong indie SaaS play with risks in churn' or 'Weak idea with no clear market demand')",
  "viabilityScore": "Score 1-10 with justification focused only on indie viability (1 = unworkable, 10 = highly viable)"
}
`;

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
            content: 'You are an expert startup advisor. Always respond with valid JSON format as requested.'
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

    // Try to parse the JSON response
    let parsedAnalysis
    try {
      // Trim whitespace and check if response is empty
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

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: parsedAnalysis,
        idea: idea 
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