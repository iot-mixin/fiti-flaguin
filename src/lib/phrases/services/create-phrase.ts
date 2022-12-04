import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { CreatePhrase } from "./types";

export const createPhrase = async (
  supabaseClient: TypedSupabaseClient,
  phrase: CreatePhrase
): Promise<void> => {
  const { error: err } = await supabaseClient.from("phrases").insert(phrase);
  if (err) {
    console.error(err);
    throw new Error("error creating phrase", { cause: err });
  }
  return;
};
