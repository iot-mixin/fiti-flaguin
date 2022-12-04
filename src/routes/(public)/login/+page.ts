import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { AuthApiError } from "@supabase/supabase-js";
import { invalid, redirect, type Actions, type Load } from "@sveltejs/kit";

export const load: Load = async (event) => {
  const { session } = await getSupabase(event);
  if (session) {
    throw redirect(303, "/");
  }
};

export const actions: Actions = {
  loginWithGoogle: async (event) => {
    const { supabaseClient } = await getSupabase(event);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return invalid(400, {
          method: "loginWithGoogle" as const,
          error: "Invalid credentials." as const,
          values: {}
        });
      }
      return invalid(500, {
        method: "loginWithGoogle" as const,
        error: "Server error. Try again later." as const,
        values: {}
      });
    }

    throw redirect(303, data.url);
  }
};
