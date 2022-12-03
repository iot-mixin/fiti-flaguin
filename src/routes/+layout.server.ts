import { USER_COOKIE_NAME } from "$env/static/private";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = ({ cookies }) => {
  return {
    isLoggedIn: cookies.get(USER_COOKIE_NAME) != null
  };
};
