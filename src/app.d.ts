/// <reference types="@sveltejs/kit" />

declare namespace App {
  // interface Locals {}
  interface PageData {
    session: import("@supabase/supabase-js").Session | null;
    title?: string;
    content?: string;
    shouldLoad?: boolean;
  }
  // interface Error {}
  // interface Platform {}
  interface Supabase {
    Database: import("./DatabaseDefinitions").Database;
    SchemaName: "public";
  }
}
