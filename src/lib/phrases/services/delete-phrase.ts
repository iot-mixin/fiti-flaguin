import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";

export const deletePhrase = async (
  supabaseClient: TypedSupabaseClient,
  phraseId: bigint
): Promise<void> => {
  const { error: err } = await supabaseClient.from("phrases").delete().eq("id", phraseId);
  if (err) {
    console.error(err);
    throw new Error(`error deleting phrase [id=${phraseId}]`, { cause: err });
  }
  return;
};
