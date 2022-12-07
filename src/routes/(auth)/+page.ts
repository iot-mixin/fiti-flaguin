import type { Phrase } from "$lib/phrases/domain/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/api/v1/phrases");
  const phrases: Phrase[] = await response.json();
  return {
    phrases
  };
};
