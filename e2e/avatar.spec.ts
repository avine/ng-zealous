import { test } from '@playwright/test';
import { takeScreenshot } from './test-utils';

test('should match avatar with default icon', async ({ page }) => {
  await takeScreenshot(page, 'avatar');
});

test('should match avatar with custom icon', async ({ page }) => {
  await takeScreenshot(page, 'avatar', { icon: 'face' });
});

test('should match avatar with initials', async ({ page }) => {
  await takeScreenshot(page, 'avatar', { name: 'John Doe' });
});

test('should match avatar with photoUrl', async ({ page }) => {
  await takeScreenshot(page, 'avatar', { photoUrl: '<photoUrl>' });
});

test('should match avatar with custom font-size', async ({ page }) => {
  await takeScreenshot(page, 'avatar', { fontSize: '2.5rem' });
});
