import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Load } from "@sveltejs/kit";

export const load: Load = async (event) => {
  const { session } = await getSupabase(event);
  if (session) {
    throw redirect(303, "/");
  }
};
