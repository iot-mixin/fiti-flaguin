import { createLike } from "$lib/phrases/services/create-like";
import { deleteLike } from "$lib/phrases/services/delete-like";
import { getLikes } from "$lib/phrases/services/get-likes";
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
  const likes = await getLikes(supabaseClient, phraseId);
  return new Response(JSON.stringify(likes));
};

export const PUT: RequestHandler = async (event) => {
  const { params } = event;
  if (params.phraseId == null) {
    throw error(404);
  }
  const phraseId = Number(params.phraseId);
  if (isNaN(phraseId)) {
    throw error(404);
  }
  const { session, supabaseClient } = await getSupabase(event);
  if (session == null) {
    throw error(401);
  }
  await createLike(supabaseClient, phraseId, session.user.id);
  return new Response(undefined);
};

export const DELETE: RequestHandler = async (event) => {
  const { params } = event;
  if (params.phraseId == null) {
    throw error(404);
  }
  const phraseId = Number(params.phraseId);
  if (isNaN(phraseId)) {
    throw error(404);
  }
  const { session, supabaseClient } = await getSupabase(event);
  if (session == null) {
    throw error(401);
  }
  await deleteLike(supabaseClient, phraseId, session.user.id);
  return new Response(undefined, { status: 204 });
};
