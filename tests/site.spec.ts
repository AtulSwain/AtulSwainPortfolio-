import { expect, test, type Page } from "@playwright/test";
import { projects } from "../src/content/projects";

const routes = ["/", "/work/", ...projects.map((p) => `/work/${p.slug}/`)];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

for (const route of routes) {
  test(`renders ${route} without errors or sideways scroll`, async ({ page }) => {
    const errors = trackErrors(page);
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("unknown pages show the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("Lost")).toBeVisible();
});

test("content is visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projects That Create Impact" })).toBeAttached();
  await expect(page.getByRole("link", { name: /View Case Study/ })).toBeVisible();
  await context.close();
});

test("command palette opens with / and navigates to a project", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog", { name: "Command palette" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("textbox").fill("invest");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/investiq\/$/);
  await expect(page.locator("h1")).toHaveText("InvestIQ");
});

test("home features the lead project and the archive lists every project", async ({ page }) => {
  await page.goto("/");
  const lead = projects.find((p) => p.featured)!;
  await expect(page.getByRole("link", { name: /View Case Study/ })).toHaveAttribute("href", `/work/${lead.slug}/`);
  await expect(page.locator("#projects a[href^='/work/']").first()).toBeVisible();
  await page.goto("/work/");
  for (const p of projects) {
    await expect(page.locator(`main a[href="/work/${p.slug}/"]`).first()).toBeAttached();
  }
});

test("project filter narrows the home grid", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const grid = page.locator("#projects");
  await grid.getByRole("button", { name: "Real-time", exact: true }).click();
  await expect(grid.locator("ul a[href^='/work/']")).toHaveCount(
    projects.filter((p) => p.category === "Real-time" && !p.featured).length,
  );
});

test("mobile menu opens and jumps to a section", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only menu");
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: /Education/ }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#education$/);
});

test("arrow keys flip between case studies", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut");
  await page.goto(`/work/${projects[0].slug}/`);
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(new RegExp(`/work/${projects[1].slug}/$`));
});

test("archive switches between grid and list views", async ({ page }) => {
  await page.goto("/work/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "List view" }).click();
  await expect(page.getByRole("button", { name: "List view" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Data", exact: false }).first().click();
  await expect(page.locator("main li a[href^='/work/']")).toHaveCount(projects.filter((p) => p.category === "Data").length);
});
