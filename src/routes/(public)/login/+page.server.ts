import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  loginWithGoogle: async (event) => {
    const { request } = event;
    const { supabaseClient } = await getSupabase(event);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: new URL(request.url).origin
      }
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          method: "loginWithGoogle" as const,
          error: "Invalid credentials." as const,
          values: {}
        });
      }
      return fail(500, {
        method: "loginWithGoogle" as const,
        error: "Server error. Try again later." as const,
        values: {}
      });
    }

    throw redirect(303, data.url);
  }
};
