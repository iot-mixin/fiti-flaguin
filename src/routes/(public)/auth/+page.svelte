<script lang="ts">
  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  onMount(() => {
    if ($page.url.hash) {
      handleLogin($page.url.hash.slice(1));
    }
  });

  async function handleLogin(authInfo: string) {
    const params = new URLSearchParams(authInfo);
    const data = new FormData();
    for (const [key, value] of params.entries()) {
      data.set(key, value);
    }
    const response = await fetch("", { method: "POST", body: data });
    const result = deserialize(await response.text());
    if (result.type === "success") {
      await invalidateAll();
    }
    applyAction(result);
  }
</script>

<p>Loggin...</p>
