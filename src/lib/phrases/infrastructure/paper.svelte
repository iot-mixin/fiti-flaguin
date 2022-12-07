<script>
  export let message = "No items found";
  export let width = "100%";
</script>

<div class="paper-stack" style:width>
  <div class="paper--content">
    <slot>{message}</slot>
  </div>
</div>

<style>
  .paper--content {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100%;
    padding: 0.5rem;
  }
  .paper-stack {
    background: #fff;
    padding: 30px;
    position: relative;
    max-height: 100%;
  }

  .paper-stack,
  .paper-stack::before,
  .paper-stack::after {
    /* Styles to distinguish sheets from one another */
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    border: 1px solid #bbb;
  }

  .paper-stack::before,
  .paper-stack::after {
    content: "";
    position: absolute;
    height: 95%;
    width: 99%;
  }

  .paper-stack::before {
    right: 15px;
    top: 0;
    transform: rotate(-1deg);
    z-index: -1;
  }

  .paper-stack::after {
    top: 5px;
    right: -5px;
    transform: rotate(1deg);
    z-index: -2;
  }
</style>
