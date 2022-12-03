import { USER_COOKIE_NAME } from "$env/static/private";
import { supabase } from "$lib/shared/infrastructure/supabase";
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import dayjs from "dayjs";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const accessToken = data.get("access_token")?.toString();
    if (accessToken == null) {
      throw invalid(400, { refreshToken: accessToken, missing: true });
    }
    const result = await supabase.auth.getUser(accessToken);
    if (result.error != null) {
      throw invalid(400, { invalid: true });
    }
    const expiresIn = parseInt(data.get("expires_in")?.toString() ?? "3600");
    const expires = dayjs().add(expiresIn, "seconds").toDate();
    cookies.set(USER_COOKIE_NAME, accessToken, { expires });
    throw redirect(303, "/");
  }
};
