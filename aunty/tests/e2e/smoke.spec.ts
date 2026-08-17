import { expect, test } from "@playwright/test";

/** The Phase 0 golden path: landing → login → OTP → home → logout. */

test("health endpoint reports demo mode", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBe(true);
  const body = await res.json();
  expect(body).toMatchObject({ ok: true, service: "aunty", demoMode: true });
});

test("visiting /home logged out bounces to login", async ({ page }) => {
  await page.goto("/home");
  await expect(page).toHaveURL(/\/login$/);
});

test("full demo login flow", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /aunty/i, level: 1 }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Meet Aunty" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel(/your number/i).fill("98765 43210");
  await page.getByRole("button", { name: "Send OTP" }).click();
  await expect(page).toHaveURL(/\/login\/verify$/);
  await expect(page.getByText("•••••• 3210")).toBeVisible();

  await page.getByLabel(/six digits/i).fill("000000");
  await page.getByRole("button", { name: "Verify" }).click();
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.getByText(/you're in my files now/i)).toBeVisible();

  // Logged-in users skip the login screen.
  await page.goto("/login");
  await expect(page).toHaveURL(/\/home$/);

  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("landing shows three sample rulings and takes a waitlist signup", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText(/recent rulings/i)).toBeVisible();
  await expect(page.getByText(/case nº/i)).toHaveCount(3);
  await expect(page.getByText(/needs supervision/i).first()).toBeVisible();

  await page.getByRole("link", { name: /join the waitlist/i }).click();
  await page.getByLabel(/your city/i).selectOption("Pune");
  await page.getByLabel(/your number/i).fill("9812345678");
  await page.getByRole("button", { name: "Hold my spot" }).click();
  await expect(page.getByText(/in the queue/i)).toBeVisible();
  await expect(page.getByText(/opens Pune/i)).toBeVisible();
});

test("duplicate waitlist signup gets the patience line", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel(/your city/i).selectOption("Jaipur");
  await page.getByLabel(/your number/i).fill("9812345679");
  await page.getByRole("button", { name: "Hold my spot" }).click();
  await expect(page.getByText(/in the queue/i)).toBeVisible();

  // Full reload so the form resets — a same-URL hash goto would not re-render.
  await page.reload();
  await page.getByLabel(/your city/i).selectOption("Jaipur");
  await page.getByLabel(/your number/i).fill("98123 45679");
  await page.getByRole("button", { name: "Hold my spot" }).click();
  await expect(page.getByText(/already in the queue/i)).toBeVisible();
  await expect(page.getByText(/forgets nothing/i)).toBeVisible();
});

test("wrong OTP gets Aunty's correction", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel(/your number/i).fill("9876543211");
  await page.getByRole("button", { name: "Send OTP" }).click();
  await page.getByLabel(/six digits/i).fill("123456");
  await page.getByRole("button", { name: "Verify" }).click();
  await expect(page.getByText(/wrong code, beta/i)).toBeVisible();
  await expect(page).toHaveURL(/\/login\/verify$/);
});
