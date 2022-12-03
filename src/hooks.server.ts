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

  // protect POST requests to all routes that start with /(auth)
  if (event.route.id?.startsWith("/(auth)") && event.request.method === "POST") {
    const { session } = await getSupabase(event);

    if (!session) {
      throw redirect(303, "/login");
    }
  }

  if (event.url.pathname.startsWith("/login")) {
    const { session } = await getSupabase(event);
    if (session) {
      throw redirect(303, "/");
    }
  }

  return resolve(event);
};
