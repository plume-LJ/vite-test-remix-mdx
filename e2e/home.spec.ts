import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/blog");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Remix 🤝 MDX/);
});

test("get started link", async ({ page }) => {
  await page.goto("/blog/how-this-site-is-built");

  // Click the get started link.
  await page.getByRole("link", { name: "Vite", exact: true }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Vite" })).toBeVisible();
});
