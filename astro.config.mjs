import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import dotenv from "dotenv";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
dotenv.config();


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), db()],
  output: "server",
  adapter: vercel()
});