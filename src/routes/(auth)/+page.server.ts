import type { Phrase } from "$lib/phrases/domain/types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerData } from "./$types";

export const load: PageServerData = async ({ fetch }) => {
  console.log("test");
  const response = await fetch("/api/v1/phrases");
  const phrases: Phrase[] = await response.json();
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
