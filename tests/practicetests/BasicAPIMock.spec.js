import { test, expect, Page } from '@playwright/test';

/**
 * SCENARIO 1: Basic API Mocking - User Profile
 * Intercepts user profile API and mocks the response
 */
test('should display mocked user profile data', async ({ page }) => {
  // Mock data
  const mockUserData = {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    avatar: 'https://via.placeholder.com/150'
  };

  // Intercept and mock the API call
  await page.route('**/api/user/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUserData)
    });
  });

  // Navigate to page that triggers the API call
  await page.goto('https://example.com/profile');

  // Verify UI updates with mocked data
  await expect(page.locator('[data-testid="user-name"]')).toHaveText('John Doe');
  await expect(page.locator('[data-testid="user-email"]')).toHaveText('john.doe@example.com');
  await expect(page.locator('[data-testid="user-role"]')).toHaveText('Admin');
  await expect(page.locator('[data-testid="user-avatar"]')).toHaveAttribute('src', mockUserData.avatar);
});