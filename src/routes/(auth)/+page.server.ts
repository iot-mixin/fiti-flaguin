import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  logout: async (event) => {
    const { supabaseClient } = await getSupabase(event);
    await supabaseClient.auth.signOut();
    throw redirect(303, "/");
  }
};
