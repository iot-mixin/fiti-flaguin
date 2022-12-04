import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";

export const deleteLike = async (
  supabaseClient: TypedSupabaseClient,
  phraseId: number,
  userId: string
) => {
  const { error: err } = await supabaseClient
    .from("likes")
    .delete()
    .eq("phrase_id", phraseId)
    .eq("user_id", userId);
  if (err) {
    console.error(err);
    throw new Error(`error deleting phrase [phrase_id=${phraseId};user_id=${userId}]`, {
      cause: err
    });
  }
  return;
};
