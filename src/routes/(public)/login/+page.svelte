<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import logo from "$lib/assets/google-icon.svg";

  export let form: ActionData;
</script>

<article class="login">
  <div class="card border login--card">
    <div class="card-body login--card-body">
      <h4 class="card-title login--card-title">LOG In To Your account</h4>
      <div class="login--card-options">
        <form action="/login?/loginWithGoogle" method="post" use:enhance>
          {#if form?.method === "loginWithGoogle" && form?.error}
            <span class="row">
              <p class="text-danger">{form.error}</p>
            </span>
          {/if}
          <button type="submit">
            <img alt="Google Logo" src={logo} class="login--social-icon" />
            Log In With Google
          </button>
        </form>
      </div>
    </div>
  </div>
</article>

<style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  }
  .login--card {
    background-color: white;
    max-width: 400px;
    min-width: 300px;
    width: 100%;
    border-color: inherit;
  }

  .login--card-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
  }
  .login--social-icon {
    display: inline;
    height: 1.5rem;
    vertical-align: text-bottom;
    margin-right: 0.5rem;
  }
</style>
