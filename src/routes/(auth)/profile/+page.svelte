<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<form action="/profile?/changePassword" method="post" use:enhance>
  <span
    ><label for="password">Password:</label><input
      id="password"
      name="password"
      type="password"
      pattern={"\\w{6,}"}
      required
    /></span
  >
  <span
    ><label for="confirm-password">Confirm Password:</label><input
      id="confirm-password"
      name="confirm-password"
      type="password"
      pattern={"\\w{6,}"}
      required
    /></span
  >
  <button type="submit">Update Password</button>
  {#if form?.error}
    {form.error}
  {/if}
</form>
