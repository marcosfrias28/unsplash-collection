import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import dotenv from "dotenv";
import react from "@astrojs/react";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "hybrid",
  define: {
    "process.env": process.env,
  },
});
