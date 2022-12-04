import { deletePhrase } from "$lib/phrases/services/delete-phrase";
import { getPhrase } from "$lib/phrases/services/get-phrase";
import { updatePhrase } from "$lib/phrases/services/update-phrase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
  const { params } = event;
  if (params.phraseId == null) {
    throw error(404);
  }
  const phraseId = Number(params.phraseId);
  if (isNaN(phraseId)) {
    throw error(404);
  }
  const { supabaseClient } = await getSupabase(event);
  const phrase = await getPhrase(supabaseClient, phraseId);
  return new Response(JSON.stringify(phrase));
};

export const PUT: RequestHandler = async (event) => {
  const { request, params } = event;
  if (params.phraseId == null) {
    throw error(404);
  }
  const phraseId = Number(params.phraseId);
  if (isNaN(phraseId)) {
    throw error(404);
  }
  const { session, supabaseClient } = await getSupabase(event);
  if (session == null) {
    throw error(403);
  }
  const data = await request.formData();
  const content = data.get("content")?.toString();
  if (content == null || content === "") {
    throw error(400, { message: "missing content parameter" });
  }
  await updatePhrase(supabaseClient, phraseId, { content });
  return new Response(undefined);
};

export const DELETE: RequestHandler = async (event) => {
  const { params } = event;
  if (params.phraseId == null) {
    return new Response(undefined, { status: 204 });
  }
  const phraseId = Number(params.phraseId);
  if (isNaN(phraseId)) {
    return new Response(undefined, { status: 204 });
  }
  const { session, supabaseClient } = await getSupabase(event);
  if (session == null) {
    throw error(403);
  }
  await deletePhrase(supabaseClient, phraseId);
  return new Response(undefined, { status: 204 });
};
