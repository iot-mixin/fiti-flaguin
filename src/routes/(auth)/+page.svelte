<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  onMount(() => {
    console.log("Hello From Home");
  });

  export let data: PageData;
</script>

<h1>Welcome to SvelteKit, dear {data.user}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/about">About my site</a>
