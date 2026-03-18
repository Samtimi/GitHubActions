// tests/accessibility.spec.js
const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const playwright = require('playwright');

test.describe('Accessibility Testing Demo', () => {
  
  // Basic accessibility scan
  test('should not have automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://example.com');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Testing specific components
  test('should check navigation menu accessibility', async ({ page }) => {
    await page.goto('https://example.com');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.navigation') // Target specific element
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Excluding certain elements from scan
  test('should scan page excluding third-party widgets', async ({ page }) => {
    await page.goto('https://example.com');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('#third-party-chat') // Exclude elements you don't control
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Testing specific WCAG standards
  test('should comply with WCAG 2.1 Level AA standards', async ({ page }) => {
    await page.goto('https://example.com');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']) // Specify standards
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Testing after user interactions
  test('should maintain accessibility after opening modal', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Perform user action
    await page.click('button[aria-label="Open menu"]');
    await page.waitForSelector('[role="dialog"]');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Detailed violation reporting
  test('should provide detailed violation report if issues found', async ({ page }) => {
    await page.goto('https://example.com');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();
    
    // Custom assertion with detailed reporting
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility Violations Found:');
      accessibilityScanResults.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id} - ${violation.help}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Description: ${violation.description}`);
        console.log(`   Help URL: ${violation.helpUrl}`);
        console.log(`   Elements affected: ${violation.nodes.length}`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Testing keyboard navigation
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const firstFocusedElement = await page.locator(':focus').getAttribute('aria-label');
    expect(firstFocusedElement).toBeTruthy();
    
    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'best-practice'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Testing different viewport sizes
  test('should be accessible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://example.com');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});