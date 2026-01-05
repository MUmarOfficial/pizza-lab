import { test, expect } from "@playwright/test";

test.describe("Pizza Lab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should render the initial UI on home page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Feeling hungry?" })
    ).toBeVisible();
    await expect(page.getByText("Order your favorite Pizza in")).toBeVisible();
    await expect(page.getByTestId("hero-img")).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: /^Pizza Lab$/ })
    ).toBeVisible();
  });

  test("should render menu on menu page and add item correctly", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Get Started" }).click();
    await page.goto("http://localhost:5173/menu");
    await expect(
      page.locator("div").filter({ hasText: "MargheritaTomato Sauce," }).nth(4)
    ).toBeVisible();
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await expect(page.getByRole("link", { name: "€8.99" })).toBeVisible();
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.getByRole("button").nth(1).click();
    await page.getByRole("button").nth(4).click();
    await page.getByRole("button").nth(4).click();
    await expect(page.getByRole("link", { name: "€47.95" })).toBeVisible();
  });

  test("should render empty cart msg if cart empty", async ({ page }) => {
    await expect(
      page.getByRole("link").filter({ hasText: /^$/ })
    ).toBeVisible();
    await page.getByRole("link").filter({ hasText: /^$/ }).click();
    await page.goto("http://localhost:5173/cart");
    await expect(
      page.getByRole("heading", { name: "Cart", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "No items in the cart" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to menu" })
    ).toBeVisible();
    await page.goto("http://localhost:5173/menu");
  });

  test("should render cart items", async ({ page }) => {
    await page.getByRole("link", { name: "Get Started" }).click();
    await page.goto("http://localhost:5173/menu");
    await expect(
      page.locator("div").filter({ hasText: "MargheritaTomato Sauce," }).nth(4)
    ).toBeVisible();
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await expect(page.getByRole("link", { name: "€8.99" })).toBeVisible();
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.getByRole("button").nth(1).click();
    await page.getByRole("button").nth(4).click();
    await page.getByRole("button").nth(4).click();
    await expect(page.getByRole("link", { name: "€47.95" })).toBeVisible();
    await page.getByRole("link", { name: "€47.95" }).click();
    await page.goto("http://localhost:5173/cart");
    await expect(page.getByRole("heading", { name: "Cart" })).toBeVisible();
    await expect(
      page.locator("div").filter({ hasText: "MargheritaTomato Sauce," }).nth(5)
    ).toBeVisible();
    await page
      .locator("div")
      .filter({ hasText: "PepperoniTomato Sauce," })
      .nth(5)
      .click();
    await expect(page.getByText("Total price")).toBeVisible();
    await expect(page.getByRole("main").getByText("€47.95")).toBeVisible();
    await expect(page.getByRole("link", { name: "Checkout" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to menu" })
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to menu" }).click();
    expect(page.goto("http://localhost:5173/menu"));
  });

  test("should render correct info at checkout  and order successful", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/menu");
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.getByRole("button").nth(1).click();
    await page.getByRole("button").nth(4).click();
    await page.getByRole("button").nth(4).click();
    await page.getByRole("link", { name: "€47.95" }).click();
    await page.goto("http://localhost:5173/cart");
    await page.getByRole("link", { name: "Checkout" }).click();
    await page.goto("http://localhost:5173/checkout");
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to cart" })
    ).toBeVisible();
    await expect(
      page.getByText(
        "Order SummaryNameQuantityPriceMargherita2€17.98Pepperoni3€29.97Subtotal: €"
      )
    ).toBeVisible();
    await expect(
      page.getByText(
        "Payment Details•••• •••• •••• ••••YOUR NAME HEREvalid thru••/••Eg: XXXX XXXX"
      )
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Card Number" })
      .fill("2222 2222 2222 2222");
    await page.getByRole("textbox", { name: "Cardholder Name" }).fill("Test");
    await page.getByRole("textbox", { name: "MM/YY" }).fill("12/27");
    await page.getByRole("textbox", { name: "CVC" }).fill("123");
    await expect(page.getByText("Payment Details1232222 2222")).toBeVisible();
    await page.getByRole("button", { name: "PAY" }).click();
    await expect(
      page.getByRole("link", { name: "Back to menu" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Order #" })).toBeVisible();
    await expect(page.getByText("Items")).toBeVisible();
    await expect(page.getByText("Total: €")).toBeVisible();
    await expect(page.getByText("Paid with: **** **** ****")).toBeVisible();
  });
});
