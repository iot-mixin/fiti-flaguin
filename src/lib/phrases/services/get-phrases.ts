import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Phrase } from "../domain/types";

export const getPhrases = async (supabaseClient: TypedSupabaseClient) => {
  const { data: phrases, error } = await supabaseClient
    .from("phrases")
    .select("*, user:users!phrases_user_id_fkey(*), likes(*, user:users(*))")
    .returns<Phrase>();
  if (error) {
    console.error(error);
    throw new Error("error while retrieving phrases", { cause: error });
  }
  return phrases;
};
