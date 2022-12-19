<script lang="ts">
  import remove from "$lib/assets/close.png";
  import likeImg from "$lib/assets/like.png";
  import likedImg from "$lib/assets/liked.png";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { createEventDispatcher } from "svelte";
  dayjs.extend(relativeTime);

  export let content = "";
  export let lastUpdate: Date;
  export let removeable = false;
  export let liked = false;
  export let likeCount = 0;

  const dispatch = createEventDispatcher();
  function handleCancelOnClick() {
    dispatch("cancel", {});
  }

  function handleLikeOnClick() {
    dispatch("like", {});
  }

  function handleUnLikeOnClick() {
    dispatch("unlike", {});
  }

  const borderClasses = ["", "border-2", "border-3", "border-4", "border-5", "border-6"];
  const borderIndex = Math.floor(Math.random() * borderClasses.length);

  const colors = ["#fff49c", "#69c7b5", "#b7ddc8", "#f4c4d6", "#9fc7e4"];
  const colorIndex = Math.floor(Math.random() * colors.length);
</script>

<div
  class={`phrase--container border ${borderClasses[borderIndex]} shadow`}
  style:background={colors[colorIndex]}
>
  <div class="phrase--header">
    {#if removeable}
      <button class="phrase--remove-btn" on:click|preventDefault={handleCancelOnClick}>
        <img alt="closeButton" src={remove} class="phrase--remove" />
      </button>
    {/if}
  </div>
  <p class="phrase--content">
    {content}
  </p>
  <div class="phrase--footer">
    <span class="phrase--footer-date">{dayjs().to(lastUpdate)}</span>
    <div>
      {#if likeCount > 0}
        <span>{likeCount}</span>
      {/if}
      <button
        class="phrase--like-btn"
        on:click|preventDefault={liked ? handleUnLikeOnClick : handleLikeOnClick}
      >
        <img alt="like" src={liked ? likedImg : likeImg} class="phrase--like" />
      </button>
    </div>
  </div>
</div>

<style>
  .phrase--container {
    padding: 1rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
  }

  .phrase--content {
    overflow: hidden;
    overflow-y: auto;
    overflow-y: auto;
    /* CAVEAT: hide scroll bar while being able to scroll for IE and Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  /* CAVEAT: hide scroll bar while being able to scroll for Chrome */
  .phrase--content::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .phrase--footer {
    display: flex;
    justify-content: space-between;
  }

  .phrase--footer-date {
    font-size: 0.7rem;
  }

  .phrase--header {
    display: flex;
    flex-flow: row-reverse;
  }

  .phrase--like-btn,
  .phrase--remove-btn {
    border: 0;
    height: 1rem;
    width: 1rem;
    border-radius: 1rem;
    padding: 0;
    background: transparent;
    margin: 0;
  }
  .phrase--like,
  .phrase--remove {
    border: 0;
    height: 1rem;
  }
</style>
