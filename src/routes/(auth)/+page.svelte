<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  onMount(() => {
    console.log("Hello From Home");
  });
</script>

<h2>Welcome to SvelteKit, dear {$page.data.session?.user.email}</h2>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/profile">Profile</a>
<a href="/about">About my site</a>
