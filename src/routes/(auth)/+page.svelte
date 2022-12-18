<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageData } from "./$types";
  import Phrase from "$lib/phrases/infrastructure/components/phrase.svelte";

  export let data: PageData;

  const deletePhrase = async (id: bigint) => {
    const response = await fetch(`/api/v1/phrases/${id.toString()}`, { method: "DELETE" });
    if (response.status === 204) {
      invalidate("app:phrases");
    }
  };
</script>

<article>
  {#each data.phrases as phrase (phrase.id)}
    <Phrase
      content={phrase.content}
      lastUpdate={new Date(phrase.updated_at)}
      removeable={phrase.user_id === data.session?.user.id}
      on:cancel={() => deletePhrase(phrase.id)}
    />
  {/each}
</article>

<style>
  article {
    height: 100%;
    display: grid;
    row-gap: 1rem;
    column-gap: 1rem;
    grid-auto-rows: 12rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
    overflow-y: auto;
    /* CAVEAT: hide scroll bar while being able to scroll for IE and Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    padding-top: 4px;
  }
  /* CAVEAT: hide scroll bar while being able to scroll for Chrome */
  article::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
</style>
