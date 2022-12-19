import type { Phrase } from "$lib/phrases/domain/types";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, depends }) => {
  const response = await fetch("/api/v1/phrases");
  const phrases: Phrase[] = await response.json();
  depends("app:phrases");
  return {
    phrases
  };
};

export const actions: Actions = {
  logout: async (event) => {
    const { supabaseClient } = await getSupabase(event);
    await supabaseClient.auth.signOut();
    throw redirect(303, "/");
  }
};
