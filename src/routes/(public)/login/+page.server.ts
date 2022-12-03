import { USER_COOKIE_NAME } from "$env/static/private";
import { supabase } from "$lib/shared/infrastructure/supabase";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email")?.toString();
    if (!email) {
      return invalid(400, { email, missing: true });
    }
    const password = data.get("password")?.toString();
    if (!password) {
      return invalid(400, { password, missing: true });
    }
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error != null) {
      return invalid(400, { incorrect: true });
    }
    cookies.set(USER_COOKIE_NAME, email);
    throw redirect(303, "/");
  }
};
