import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import { error } from "@sveltejs/kit";
import type { Phrase } from "../domain/types";

export const getPhrase = async (
  supabaseClient: TypedSupabaseClient,
  phraseId: number
): Promise<Phrase> => {
  const { data: phrases, error: err } = await supabaseClient
    .from("phrases")
    .select<"*", Phrase>()
    .eq("id", phraseId)
    .returns<Phrase>();
  if (err) {
    console.error(err);
    throw new Error(`error fetching phrase [id=${phraseId}]`, { cause: err });
  }
  const phrase = phrases.at(0);
  if (phrase == null) {
    throw error(404);
  }
  return phrase;
};
