import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { AuthApiError } from "@supabase/supabase-js";
import { invalid, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  changePassword: async (event) => {
    const { request } = event;
    const { supabaseClient } = await getSupabase(event);
    const data = await request.formData();
    const password = data.get("password")?.toString();
    if (password == null) {
      return invalid(400, { password, missing: true });
    }
    const confirmPassword = data.get("confirm-password")?.toString();
    if (confirmPassword == null) {
      return invalid(400, { confirmPassword, missing: true });
    }
    if (password !== confirmPassword) {
      return invalid(400, { mismatch: true });
    }
    const { error } = await supabaseClient.auth.updateUser({
      password
    });

    if (error) {
      console.error(error);
      if (error instanceof AuthApiError && error.status === 400) {
        return invalid(400, {
          error: "Invalid credentials." as const,
          values: {}
        });
      }
      return invalid(500, {
        error: "Server error. Try again later." as const,
        values: {}
      });
    }
    return { success: true };
  }
};
