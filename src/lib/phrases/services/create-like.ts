import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";

export const createLike = async (
  supabaseClient: TypedSupabaseClient,
  phraseId: number,
  userId: string
) => {
  const { error: err } = await supabaseClient
    .from("likes")
    .upsert(
      { phrase_id: phraseId, user_id: userId },
      { onConflict: "phrase_id,user_id", ignoreDuplicates: true }
    );
  if (err) {
    console.error(err);
    throw new Error(`error creating like [phrase_id=${phraseId};user_id=${userId}]`, {
      cause: err
    });
  }
  return;
};
