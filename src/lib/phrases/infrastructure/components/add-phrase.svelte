<script lang="ts">
  import Posit from "./posit.svelte";
  import save from "$lib/assets/save.png";

  export let action: string;
</script>

<div class="phrase--add">
  <Posit>
    <form class="modal--container" {action}>
      <div class="modal--actions">
        <button type="submit" class="phrase--save-btn">
          <img alt="save button" src={save} class="phrase--save" />
        </button>
      </div>
      <div class="modal--content">
        <textarea type="text" />
      </div>
    </form>
  </Posit>
</div>

<style>
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
    height: 100%;
    padding: 0px 1rem 0 1rem;
  }
  .modal--content > textarea {
    width: 100%;
    height: 90%;
    line-height: 30px;
    margin: 0;
    border: 0;
    border-radius: 0;
    padding: 0;
    resize: none;
    background: linear-gradient(to bottom, transparent 29px, #00b0d7 1px);
    background-size: 100% 30px;
    padding: 30px 0 30px 0;
  }
  .phrase--add {
    width: min(100vw, 30rem);
    height: min(100vh, 20rem);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
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
</style>
