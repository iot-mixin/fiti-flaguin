<script lang="ts">
  import Posit from "./posit.svelte";
  import save from "$lib/assets/save.png";
  import { enhance } from "$app/forms";
  import type { ActionData } from ".svelte-kit/types/src/routes/(auth)/$types";

  export let action: string;
  export let form: ActionData;

  let open = false;
  function handleFocus() {
    open = true;
  }
  function handleBlur() {
    open = false;
  }
</script>

<div
  class="phrase--add"
  class:phrase--add__show={open}
  on:mouseover={handleFocus}
  on:focus={handleFocus}
  on:mouseout={handleBlur}
  on:blur={handleBlur}
>
  <Posit>
    <form class="modal--container" {action} method="post" use:enhance>
      <div class="modal--actions">
        <button type="submit" class="phrase--save-btn">
          <img alt="save button" src={save} class="phrase--save" />
        </button>
      </div>
      <div class="modal--content">
        <textarea type="text" name="phrase" />
        {#if form?.error}
          <p class="text-danger">{form.error}</p>
        {/if}
      </div>
    </form>
  </Posit>
</div>

<style>
  .phrase--add {
    width: min(100vw, 30rem);
    height: min(100vh, 20rem);
    position: absolute;
    bottom: calc(-1 * min(100vh, 20rem) + 1rem);
    transition: bottom 0.5s linear;
    left: 50%;
    transform: translate(-50%);
  }
  .phrase--add__show {
    bottom: 0rem;
  }
  .phrase--save-btn {
    border: 0;
    height: 1rem;
    width: 1rem;
    border-radius: 1rem;
    padding: 0;
    background: transparent;
    margin: 0;
  }
  .phrase--save {
    border: 0;
    height: 1rem;
  }
  .modal--container {
    width: 100%;
    height: 100%;
  }
  .modal--actions {
    padding: 1rem 1rem 0 1rem;
    width: 100%;
    display: flex;
    flex-flow: row-reverse;
  }
  .modal--content {
    width: 100%;
    height: 90%;
    padding: 0px 1rem 0 1rem;
    display: flex;
    flex-direction: column;
  }
  .modal--content > textarea {
    width: 100%;
    line-height: 30px;
    flex-grow: 1;
    margin: 0;
    border: 0;
    border-radius: 0;
    padding: 0;
    resize: none;
    background: linear-gradient(to bottom, transparent 29px, #00b0d7 1px);
    background-size: 100% 30px;
    padding: 30px 0 30px 0;
  }
  .modal--content > p {
    margin: 0;
    text-align: center;
  }
</style>
