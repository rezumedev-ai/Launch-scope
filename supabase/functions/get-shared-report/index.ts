import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { shareToken } = await req.json();

    if (!shareToken) {
      return new Response(
        JSON.stringify({ error: "Share token is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: sharedReport, error: shareError } = await supabase
      .from("shared_reports")
      .select("id, analysis_id, is_active, view_count")
      .eq("share_token", shareToken)
      .maybeSingle();

    if (shareError || !sharedReport) {
      return new Response(
        JSON.stringify({ error: "Shared report not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!sharedReport.is_active) {
      return new Response(
        JSON.stringify({ error: "This share link has been disabled" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: analysis, error: analysisError } = await supabase
      .from("analysis_history")
      .select("id, idea, analysis_result, viability_score, created_at")
      .eq("id", sharedReport.analysis_id)
      .maybeSingle();

    if (analysisError || !analysis) {
      return new Response(
        JSON.stringify({ error: "Analysis not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const newViewCount = (sharedReport.view_count || 0) + 1;
    await supabase
      .from("shared_reports")
      .update({ view_count: newViewCount })
      .eq("id", sharedReport.id);

    return new Response(
      JSON.stringify({
        analysis: analysis.analysis_result,
        idea: analysis.idea,
        viabilityScore: analysis.viability_score,
        createdAt: analysis.created_at,
        viewCount: newViewCount,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error in get-shared-report:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
