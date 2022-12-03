<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let email: string = "";
  let password: string = "";
</script>

<form
  action="/login"
  method="POST"
  use:enhance={() => {
    return async ({ update }) => {
      await update();
    };
  }}
>
  <span
    ><label for="email">Email:</label>
    <input id="email" name="email" type="email" bind:value={email} /></span
  >
  <span
    ><label for="password">Password:</label>
    <input id="password" name="password" type="password" bind:value={password} /></span
  >
  {#if form?.missing}
    <p>
      {#if "email" in form}email field is required.{/if}
      {#if "password" in form}Password field is required.{/if}
      {JSON.stringify(form)}
    </p>
  {/if}
  {#if form?.incorrect}
    <p>Invalid credentials!</p>
  {/if}
  <button type="submit">Log In</button>
</form>
