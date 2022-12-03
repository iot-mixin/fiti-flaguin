import { USER_COOKIE_NAME } from "$env/static/private";
import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  return {
    user: locals.user?.email
  };
};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete(USER_COOKIE_NAME);
    throw redirect(302, "/login");
  }
};
