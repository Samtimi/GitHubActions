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

/**
 * SCENARIO 2: List/Collection Mocking - Products
 * Mocks a list of products and verifies rendering
 */
test('should display mocked product list', async ({ page }) => {
  const mockProducts = {
    products: [
      { id: 1, name: 'Laptop', price: 999.99, stock: 10 },
      { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
      { id: 3, name: 'Keyboard', price: 79.99, stock: 0 }
    ],
    total: 3
  };

  // Mock the products API
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockProducts)
    });
  });

  await page.goto('https://example.com/products');

  // Wait for products to load
  await page.waitForSelector('[data-testid="product-item"]');

  // Verify correct number of products
  const productItems = page.locator('[data-testid="product-item"]');
  await expect(productItems).toHaveCount(3);

  // Verify individual product details
  await expect(productItems.nth(0).locator('.product-name')).toHaveText('Laptop');
  await expect(productItems.nth(0).locator('.product-price')).toHaveText('$999.99');
  await expect(productItems.nth(2).locator('.out-of-stock')).toBeVisible();
});

/**
 * SCENARIO 3: Error Response Mocking
 * Tests error handling by mocking failed API responses
 */
test('should display error message when API fails', async ({ page }) => {
  // Mock API error
  await page.route('**/api/user/profile', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'Unable to fetch user profile'
      })
    });
  });

  await page.goto('https://example.com/profile');

  // Verify error message is displayed
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="error-message"]')).toContainText('Unable to fetch user profile');
});

/**
 * SCENARIO 4: Conditional Mocking - Different Responses
 * Mocks different responses based on request parameters
 */
test('should mock different responses based on query parameters', async ({ page }) => {
  await page.route('**/api/search**', async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('q');

    let mockResponse;
    if (query === 'laptop') {
      mockResponse = {
        results: [
          { id: 1, name: 'Gaming Laptop', price: 1299 },
          { id: 2, name: 'Business Laptop', price: 899 }
        ]
      };
    } else if (query === 'phone') {
      mockResponse = {
        results: [
          { id: 3, name: 'Smartphone X', price: 799 }
        ]
      };
    } else {
      mockResponse = { results: [] };
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse)
    });
  });

  await page.goto('https://example.com/search');

  // Search for laptop
  await page.fill('[data-testid="search-input"]', 'laptop');
  await page.click('[data-testid="search-button"]');
  await expect(page.locator('[data-testid="search-result"]')).toHaveCount(2);

  // Search for phone
  await page.fill('[data-testid="search-input"]', 'phone');
  await page.click('[data-testid="search-button"]');
  await expect(page.locator('[data-testid="search-result"]')).toHaveCount(1);
});

/**
 * SCENARIO 5: POST Request Mocking - Form Submission
 * Intercepts POST requests and verifies success handling
 */
test('should handle mocked form submission', async ({ page }) => {
  let capturedRequestBody: any;

  await page.route('**/api/contact', async (route) => {
    // Capture the request body for verification
    const request = route.request();
    capturedRequestBody = request.postDataJSON();

    // Mock success response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        id: 'msg_12345'
      })
    });
  });

  await page.goto('https://example.com/contact');

  // Fill and submit form
  await page.fill('[name="name"]', 'Jane Smith');
  await page.fill('[name="email"]', 'jane@example.com');
  await page.fill('[name="message"]', 'Test message');
  await page.click('[data-testid="submit-button"]');

  // Verify success message
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="success-message"]')).toContainText('Form submitted successfully');

  // Verify captured request data
  expect(capturedRequestBody).toEqual({
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Test message'
  });
});

/**
 * SCENARIO 6: Multiple API Mocking - Dashboard
 * Mocks multiple endpoints for complex page
 */
test('should load dashboard with multiple mocked APIs', async ({ page }) => {
  // Mock user info
  await page.route('**/api/user', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ name: 'Alice', role: 'Manager' })
    });
  });

  // Mock statistics
  await page.route('**/api/stats', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ 
        totalSales: 15420,
        totalOrders: 342,
        activeUsers: 1250
      })
    });
  });

  // Mock recent activities
  await page.route('**/api/activities', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        activities: [
          { id: 1, action: 'Order placed', time: '2 mins ago' },
          { id: 2, action: 'User registered', time: '5 mins ago' }
        ]
      })
    });
  });

  await page.goto('https://example.com/dashboard');

  // Verify all data is displayed
  await expect(page.locator('[data-testid="user-name"]')).toHaveText('Alice');
  await expect(page.locator('[data-testid="total-sales"]')).toHaveText('$15,420');
  await expect(page.locator('[data-testid="activity-item"]')).toHaveCount(2);
});

/**
 * SCENARIO 7: Network Delay Simulation
 * Simulates slow API responses to test loading states
 */
test('should show loading state during API call', async ({ page }) => {
  await page.route('**/api/data', async (route) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ data: 'Test data' })
    });
  });

  await page.goto('https://example.com/data');
  
  // Click button to trigger API call
  await page.click('[data-testid="load-button"]');

  // Verify loading spinner appears
  await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible();

  // Verify loading disappears and data appears
  await expect(page.locator('[data-testid="loading-spinner"]')).toBeHidden({ timeout: 5000 });
  await expect(page.locator('[data-testid="data-content"]')).toBeVisible();
});

/**
 * SCENARIO 8: Authentication Token Verification
 * Verifies auth headers are sent correctly
 */
test('should send correct authentication headers', async ({ page }) => {
  let authHeader: string | null = null;

  await page.route('**/api/protected', async (route) => {
    const request = route.request();
    authHeader = request.headers()['authorization'];

    await route.fulfill({
      status: 200,
      body: JSON.stringify({ message: 'Authorized' })
    });
  });

  // Set auth token in localStorage
  await page.goto('https://example.com');
  await page.evaluate(() => {
    localStorage.setItem('authToken', 'Bearer token_12345');
  });

  await page.goto('https://example.com/protected');

  // Verify auth header was sent
  expect(authHeader).toBe('Bearer token_12345');
});

/**
 * SCENARIO 9: Abort Unnecessary Requests
 * Blocks tracking/analytics requests for faster tests
 */
test('should block unnecessary third-party requests', async ({ page }) => {
  // Block analytics and tracking
  await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2}', route => route.abort());
  await page.route('**/google-analytics.com/**', route => route.abort());
  await page.route('**/facebook.com/**', route => route.abort());

  // Mock only the API we care about
  await page.route('**/api/content', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ content: 'Main content' })
    });
  });

  await page.goto('https://example.com');

  // Verify main content loads without external dependencies
  await expect(page.locator('[data-testid="main-content"]')).toHaveText('Main content');
});

/**
 * SCENARIO 10: Pagination Mocking
 * Mocks paginated API responses
 */
test('should handle paginated API responses', async ({ page }) => {
  let currentPage = 1;

  await page.route('**/api/items**', async (route) => {
    const url = new URL(route.request().url());
    const page = parseInt(url.searchParams.get('page') || '1');

    const mockData = {
      items: Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        name: `Item ${(page - 1) * 10 + i + 1}`
      })),
      page: page,
      totalPages: 5,
      hasNext: page < 5
    };

    await route.fulfill({
      status: 200,
      body: JSON.stringify(mockData)
    });
  });

  await page.goto('https://example.com/items');

  // Verify first page
  await expect(page.locator('[data-testid="item"]').first()).toContainText('Item 1');

  // Click next page
  await page.click('[data-testid="next-page"]');
  
  // Verify second page loaded
  await expect(page.locator('[data-testid="item"]').first()).toContainText('Item 11');
});

/**
 * HELPER: Reusable mock setup function
 */
async function setupAPIMocks(page: Page) {
  // Centralized mock configuration
  const mocks = {
    '/api/user': { name: 'Test User', email: 'test@example.com' },
    '/api/config': { theme: 'dark', language: 'en' }
  };

  for (const [endpoint, data] of Object.entries(mocks)) {
    await page.route(`**${endpoint}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(data)
      });
    });
  }
}

test('should use reusable mock setup', async ({ page }) => {
  await setupAPIMocks(page);
  await page.goto('https://example.com/settings');
  
  await expect(page.locator('[data-testid="theme"]')).toHaveText('dark');
});