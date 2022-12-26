import { createPhrase } from "$lib/phrases/services/create-phrase";
import { getPhrases } from "$lib/phrases/services/get-phrases";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
  const { supabaseClient } = await getSupabase(event);
  const result = await getPhrases(supabaseClient);
  return new Response(JSON.stringify(result));
};

export const POST: RequestHandler = async (event) => {
  const { request } = event;
  const { session, supabaseClient } = await getSupabase(event);
  if (session == null) {
    throw error(403);
  }
  const data = await request.json();
  const content = data.content;
  if (content == null || content === "") {
    throw error(400, { message: "missing content parameter" });
  }
  await createPhrase(supabaseClient, { content, user_id: session.user.id });
  return new Response();
};
