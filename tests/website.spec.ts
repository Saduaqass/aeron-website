import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Kazakh is the default locale and language choice persists", async ({ page }) => {
  await expect(page.locator("html")).toHaveAttribute("lang", "kk");
  await expect(page.getByRole("button", { name: "KZ" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("AERON — Beyond Electric");
  await expect(page.getByRole("link", { name: "Explore AERON" })).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("mobile navigation opens and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.getByRole("button", { name: "Мәзірді ашу" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Мәзірді жабу" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Мәзірді ашу" })).toHaveAttribute("aria-expanded", "false");
});

test("configurator selection updates the visible summary", async ({ page }) => {
  const configurator = page.locator("#configurator");
  await configurator.getByRole("button", { name: "Электр көк" }).click();
  await expect(configurator.locator(".config-summary")).toContainText("Электр көк");
  await expect(configurator.getByRole("button", { name: "Электр көк" })).toHaveAttribute("aria-pressed", "true");
});

test("contact form reports local validation and does not claim server delivery", async ({ page }) => {
  const contact = page.locator("#contact");
  await contact.getByRole("button", { name: "Хабарламаны тексеру" }).click();
  await expect(contact.getByRole("status")).toContainText("Барлық жолды дұрыс толтырыңыз.");
  await expect(page.locator("#contact-name")).toBeFocused();

  await page.locator("#contact-name").fill("Aeron Guest");
  await page.locator("#contact-email").fill("guest@example.com");
  await page.locator("#contact-message").fill("A question about the concept.");
  await contact.getByRole("button", { name: "Хабарламаны тексеру" }).click();
  await expect(contact.getByRole("status")).toContainText("Хабарлама серверге жіберілген жоқ.");
});

test("320px layout has no horizontal overflow and vehicle controls meet touch sizing", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.locator(".vehicle-tools button").first().waitFor({ state: "visible" });
  const sizes = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    controls: [...document.querySelectorAll(".vehicle-tools button")].map((button) => {
      const { width, height } = button.getBoundingClientRect();
      return { width, height };
    }),
  }));
  expect(sizes.documentWidth).toBe(sizes.viewportWidth);
  expect(sizes.controls.length).toBeGreaterThan(0);
  expect(sizes.controls.every(({ width, height }) => width >= 40 && height >= 40)).toBe(true);
});
