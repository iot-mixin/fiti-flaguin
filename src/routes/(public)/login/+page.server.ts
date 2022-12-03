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
          login: true,
          error: "Invalid credentials." as const,
          values: {
            email
          }
        });
      }
      return invalid(500, {
        login: true,
        error: "Server error. Try again later." as const,
        values: {
          email
        }
      });
    }

    throw redirect(303, "/");
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
          login: false,
          error: "Invalid email." as const,
          values: {
            email
          }
        });
      }
      return invalid(500, {
        login: false,
        error: "Server error. Try again later." as const,
        values: {
          email
        }
      });
    }
  }
};
