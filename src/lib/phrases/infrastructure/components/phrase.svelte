<script lang="ts">
  import remove from "$lib/assets/close.png";
  import like from "$lib/assets/like.png";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import Posit from "./posit.svelte";
  dayjs.extend(relativeTime);

  export let content = "";
  export let lastUpdate: Date;
  export let removeable = false;
</script>

<Posit>
  <div class="phrase--container">
    <div class="phrase--header">
      {#if removeable}
        <button class="phrase--remove-btn">
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
        <button class="phrase--like-btn">
          <img alt="like" src={like} class="phrase--like" />
        </button>
      </div>
    </div>
  </div>
</Posit>

<style>
  .phrase--container {
    padding: 1rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
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
