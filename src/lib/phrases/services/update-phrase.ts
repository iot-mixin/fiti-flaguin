import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Phrase } from "../domain/types";
import { getPhrase } from "./get-phrase";
import type { UpdatePhrase } from "./types";

export const updatePhrase = async (
  supabaseClient: TypedSupabaseClient,
  phraseId: number,
  phrase: UpdatePhrase
): Promise<void> => {
  await getPhrase(supabaseClient, phraseId);
  const { error: err } = await supabaseClient
    .from("phrases")
    .update({ ...phrase, updated_at: new Date().toISOString() })
    .eq("id", phraseId)
    .returns<Phrase>();
  if (err) {
    console.error(err);
    throw new Error(`error updating phrase [id=${phraseId}]`, { cause: err });
  }
  return;
};
