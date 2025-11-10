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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { analysisId } = await req.json();

    if (!analysisId) {
      return new Response(
        JSON.stringify({ error: "Analysis ID is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: analysis, error: analysisError } = await supabase
      .from("analysis_history")
      .select("id, user_id")
      .eq("id", analysisId)
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

    if (analysis.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized to share this analysis" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: existingShare, error: existingError } = await supabase
      .from("shared_reports")
      .select("share_token, is_active")
      .eq("analysis_id", analysisId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingError) {
      console.error("Error checking existing share:", existingError);
    }

    if (existingShare && existingShare.is_active) {
      return new Response(
        JSON.stringify({
          shareToken: existingShare.share_token,
          message: "Existing share link retrieved",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (existingShare && !existingShare.is_active) {
      const { data: reactivated, error: reactivateError } = await supabase
        .from("shared_reports")
        .update({ is_active: true })
        .eq("analysis_id", analysisId)
        .eq("user_id", user.id)
        .select("share_token")
        .single();

      if (reactivateError) {
        console.error("Error reactivating share:", reactivateError);
      } else if (reactivated) {
        return new Response(
          JSON.stringify({
            shareToken: reactivated.share_token,
            message: "Share link reactivated",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    const { data: newShare, error: createError } = await supabase
      .from("shared_reports")
      .insert({
        analysis_id: analysisId,
        user_id: user.id,
        is_active: true,
      })
      .select("share_token")
      .single();

    if (createError) {
      console.error("Error creating share:", createError);
      return new Response(
        JSON.stringify({ error: "Failed to create share link" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        shareToken: newShare.share_token,
        message: "Share link created successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error in create-share-link:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
