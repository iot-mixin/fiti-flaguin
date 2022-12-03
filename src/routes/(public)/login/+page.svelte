<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let email: string = "";
  let password: string = "";
  let sendLinkEmail: string = "";
</script>

<div class="row">
  <div class="col-6 col border row">
    <div class="col-6 col padding-large">
      <form action="/login?/login" method="POST" use:enhance>
        <h3>Login</h3>
        <span class="row"
          ><label class="col" for="email">Email:</label>
          <input
            class="col"
            id="email"
            name="email"
            type="email"
            bind:value={email}
            required
          /></span
        >
        <span class="row"
          ><label class="col" for="password">Password:</label>
          <input
            class="col"
            id="password"
            name="password"
            type="password"
            bind:value={password}
            required
          /></span
        >
        {#if form?.method === "login" && form?.error}
          <span class="row">
            <p class="text-danger">{form.error}</p>
          </span>
        {/if}
        <span class="row"><button type="submit">Log In</button></span>
        {#if form?.method === "loginWithGoogle" && form?.error}
          <span class="row">
            <p class="text-danger">{form.error}</p>
          </span>
        {/if}
      </form>
      <form action="/login?/loginWithGoogle" method="post" use:enhance>
        <span class="row"><button type="submit">Log In With Google</button></span>
      </form>
    </div>
    <div class="col-6 col padding-large">
      <form action="/login?/sendLink" method="POST" use:enhance>
        <h3>Have your forgot your password?</h3>
        <span class="row"
          ><label class="col" for="email">Email:</label>
          <input
            class="col"
            id="email"
            name="email"
            type="email"
            bind:value={sendLinkEmail}
            required
          /></span
        >
        {#if form?.method === "magicLink" && form?.error}
          <span class="row">
            <p class="text-danger">{form.error}</p>
          </span>
        {/if}
        <span class="row"><button type="submit">Send me a login link</button></span>
      </form>
    </div>
  </div>
</div>
