<script lang="ts">
  const borderClasses = ["", "border-2", "border-3", "border-4", "border-5", "border-6"];
  const borderIndex = Math.floor(Math.random() * borderClasses.length);

  const colors = ["#fff49c", "#69c7b5", "#b7ddc8", "#f4c4d6", "#9fc7e4"];
  const colorIndex = Math.floor(Math.random() * colors.length);
</script>

<div
  class={`posit border ${borderClasses[borderIndex]} shadow`}
  style:background={colors[colorIndex]}
>
  <slot />
</div>

<style>
  .posit {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
