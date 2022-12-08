import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import { error } from "@sveltejs/kit";
import type { Phrase } from "../domain/types";

export const getPhrase = async (
  supabaseClient: TypedSupabaseClient,
  phraseId: number
): Promise<Phrase> => {
  const { data: phrase, error: err } = await supabaseClient
    .from("phrases")
    .select("*, user:users!phrases_user_id_fkey(*), likes(*, user:users(*))")
    .eq("id", phraseId)
    .returns<Phrase>()
    .single();
  if (err) {
    console.error(err);
    throw new Error(`error fetching phrase [id=${phraseId}]`, { cause: err });
  }
  if (phrase == null) {
    throw error(404);
  }
  return phrase;
};
