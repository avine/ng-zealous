import { expect, Page } from '@playwright/test';

export const buildModuleUrlWithCommand = (module: string, command: Record<string, unknown>) =>
  `/${module}?demoState=${encodeURIComponent(JSON.stringify(command))}`;

export const buildScreenshotName = (module: string, command: Record<string, unknown>) => {
  const commandStr = Object.entries(command)
    .map(([prop, value]) => `${prop} ${value}`)
    .join(' ');

  const fileName = `${module} ${commandStr}`
    .replaceAll(/[^0-9a-z]/gi, ' ')
    .trim()
    .replaceAll(/\s+/g, '-');

  return `${fileName}.png`;
};

export const takeScreenshot = async (
  page: Page,
  module: string,
  command: Record<string, unknown> = {},
) => {
  await page.goto(buildModuleUrlWithCommand(module, command));
  await page.waitForSelector('#z-demo-container');

  const demoContainer = page.locator('#z-demo-container').first();
  await expect(demoContainer).toHaveScreenshot(buildScreenshotName(module, command));
};
