import type { Phrase } from "$lib/phrases/domain/types";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
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
  },
  addPhrase: async ({ request, fetch }) => {
    const formData = await request.formData();
    const phrase = formData.get("phrase");
    if (!phrase) {
      return fail(400, {
        error: "Missing phrase.",
        value: phrase
      });
    }
    const response = await fetch("/api/v1/phrases", {
      method: "POST",
      body: JSON.stringify({ content: phrase })
    });
    if (response.status !== 200) {
      return fail(500, {
        error: "Error creating the phrase.",
        value: phrase
      });
    }
    return { success: true };
  }
};
