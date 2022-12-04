import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Phrase } from "../domain/types";

export const getLikes = async (supabaseClient: TypedSupabaseClient, phraseId: number) => {
  const { data: phrases, error } = await supabaseClient
    .from("likes")
    .select()
    .eq("phrase_id", phraseId)
    .returns<Phrase>();
  if (error) {
    console.error(error);
    throw new Error(`error while retrieving likes [phrase_id=${phraseId}]`, { cause: error });
  }
  return phrases;
};
