# Fiti Flaguin seminar

Repository for seminary of Feature Flagging

TODO: Rework this

## Developing

Once you've created a project and installed dependencies with `yarn`, start a development server:

```bash
yarn run dev

# or start the server and open the app in a new browser tab
yarn run dev -- --open
```

Do not forget to run husky to set the commit hooks:

```bash
npx husky install
```

## Building

To create a production version of your app:

```bash
yarn run build
```

You can preview the production build with `yarn run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Configuration

The following environment variables are required to deploy the server:

| Variable                 | Description          |  type  |
| :----------------------- | :------------------- | :----: |
| `PUBLIC_SUPABASE_URL`    | Supabase project url | string |
| `PUBLIC_SUPABASE_KEY` 🔑 | Supabase project key | string |
| `PUBLIC_POSTHOG_KEY` 🔑  | PostHog project key  | string |

**Notes:**

- Configuration variables with 🔑 are sensitive data. DO NOT push them in any circumstance.

## Authors

- Pablo Renero: @Canario0
- Ismael Taboada: @ismtabo
