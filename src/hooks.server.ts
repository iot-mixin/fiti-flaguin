import { USER_COOKIE_NAME } from "$env/static/private";
import { supabase } from "$lib/shared/infrastructure/supabase";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.cookies.get(USER_COOKIE_NAME);
  if (event.url.pathname.startsWith("/login") && cookie) {
    console.debug("redirecting authenticated user to page");
    throw redirect(303, "/");
  }
  if (event.route.id?.startsWith("/(auth)") && !cookie) {
    console.debug("redirecting not authenticated user to login");
    throw redirect(303, "/login");
  }
  if (cookie != null) {
    const response = await supabase.auth.getUser(cookie);
    if (response.error != null) {
      event.cookies.delete(USER_COOKIE_NAME);
      throw redirect(303, "/login");
    }
    event.locals.user = response.data.user;
  }
  return resolve(event);
};
