/// <reference types="vitest" />
import { defineConfig } from "vite";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypePrettyCode],
    }),
    !process.env.VITEST
      ? remix({
          async routes(defineRoutes) {
            return defineRoutes((route) => {
              route("/", "routes/_index.tsx");
              route("/posts", "routes/posts/index.tsx", () => {
                route("/posts/first-post", "routes/posts/first-post.mdx");
              });
              route("/form", "routes/form/index.tsx", () => {
                route("/form", "routes/form/_index.tsx", { index: true });
                route("/form/:formId", "routes/form/$form.tsx");
              });
              route("/recipes", "routes/recipes/index.tsx", () => {
                route("/recipes", "routes/recipes/_index.tsx", { index: true });
                route("/recipes/:recipeId", "routes/recipes/$recipe.tsx");
                route("/recipes/new", "routes/recipes/new.tsx");
              });
            });
          },
        })
      : react(),
  ],
  server: {
    host: "0.0.0.0",
    // port: 3000,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
  test: {
    include: ["{tests, app}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    environment: "jsdom",
    globals: true,
  },
});
