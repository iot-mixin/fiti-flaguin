import "$lib/db";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // protect requests to all routes that start with /(auth)
  if (event.route.id?.startsWith("/(auth)")) {
    const { session } = await getSupabase(event);
    if (!session) {
      throw redirect(303, "/login");
    }
  }

  // redirect authenticated user to home page
  if (event.url.pathname.startsWith("/login")) {
    const { session } = await getSupabase(event);
    if (session) {
      throw redirect(303, "/");
    }
  }

  return resolve(event);
};
