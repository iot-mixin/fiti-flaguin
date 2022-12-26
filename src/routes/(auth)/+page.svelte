<script lang="ts">
  import AddPhrase from "$lib/phrases/infrastructure/components/add-phrase.svelte";
  import Phrase from "$lib/phrases/infrastructure/components/phrase.svelte";
  import type { ActionData, PageData } from "./$types";
  import { invalidate } from "$app/navigation";
  import { onDestroy } from "svelte";

  export let data: PageData;
  export let form: ActionData;

  const abortController = new AbortController();
  const user_id = data.session?.user.id;

  onDestroy(() => abortController.abort());

  async function deletePhrase(id: bigint) {
    const response = await fetch(`/api/v1/phrases/${id.toString()}`, {
      method: "DELETE",
      signal: abortController.signal
    });
    if (response.status === 204) {
      invalidate("app:phrases");
    }
  }

  async function likedPhrase(id: bigint) {
    const response = await fetch(`/api/v1/phrases/${id.toString()}/likes`, {
      method: "PUT",
      signal: abortController.signal
    });
    if (response.status === 200) {
      invalidate("app:phrases");
    }
  }

  async function unLikePhrase(id: bigint) {
    const response = await fetch(`/api/v1/phrases/${id.toString()}/likes`, {
      method: "DELETE",
      signal: abortController.signal
    });
    if (response.status === 204) {
      invalidate("app:phrases");
    }
  }
</script>

<article>
  {#each data.phrases as phrase (phrase.id)}
    <Phrase
      content={phrase.content}
      lastUpdate={new Date(phrase.updated_at)}
      removeable={phrase.user_id === user_id}
      liked={phrase.likes.some((like) => like.user_id === user_id)}
      likeCount={phrase.likes.length}
      on:cancel={async () => await deletePhrase(phrase.id)}
      on:like={async () => await likedPhrase(phrase.id)}
      on:unlike={async () => await unLikePhrase(phrase.id)}
    />
  {/each}
  <AddPhrase action="/?/addPhrase" {form} />
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
