<script lang="ts">
  import Phrase from "$lib/phrases/infrastructure/phrase.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const today = new Date();
</script>

<article>
  {#each data.phrases as phrase (phrase.id)}
    <Phrase content={phrase.content} {today} lastUpdate={new Date(phrase.updated_at)} />
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
  }
  /* CAVEAT: hide scroll bar while being able to scroll for Chrome */
  article::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
</style>
