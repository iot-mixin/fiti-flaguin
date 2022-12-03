import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { AuthApiError } from "@supabase/supabase-js";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  login: async (event) => {
    const { request } = event;
    const { supabaseClient } = await getSupabase(event);
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error(error);
      if (error instanceof AuthApiError && error.status === 400) {
        return invalid(400, {
          method: "login" as const,
          error: "Invalid credentials." as const,
          values: {
            email
          }
        });
      }
      return invalid(500, {
        method: "login" as const,
        error: "Server error. Try again later." as const,
        values: {
          email
        }
      });
    }

    throw redirect(303, "/");
  },
  loginWithGoogle: async (event) => {
    const { supabaseClient } = await getSupabase(event);
    console.log("predator");

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google"
    });
    console.log(data);

    if (error) {
      console.error(error);
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
  },
  sendLink: async (event) => {
    const { request } = event;
    const { supabaseClient } = await getSupabase(event);
    const data = await request.formData();
    const email = data.get("email")?.toString();
    if (!email) {
      return invalid(400, { email, missing: true });
    }
    const { error } = await supabaseClient.auth.signInWithOtp({ email });

    if (error) {
      console.error(error);
      if (error instanceof AuthApiError && error.status === 400) {
        return invalid(400, {
          method: "magicLink" as const,
          error: "Invalid email." as const,
          values: {
            email
          }
        });
      }
      return invalid(500, {
        method: "magicLink" as const,
        error: "Server error. Try again later." as const,
        values: {
          email
        }
      });
    }
  }
};
