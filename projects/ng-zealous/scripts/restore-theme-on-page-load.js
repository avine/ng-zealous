/*

1) Add the following script configuration in your "angular.json" build's options.

  {
    "projects": {
      "<PROJECT_NAME>": {
        "projectType": "application",
        "architect": {
          "build": {
            "builder": "@angular/build:application",
            "options": {
              "scripts": [
                {
                  "input": "ng-zealous/scripts/restore-theme-on-page-load.js",
                  "inject": false
                }
              ]
            }
          }
        }
      }
    }
  }

2) Insert the script manually in your "index.html" right after the opening `body` tag.

  <!doctype html>
  <html lang="en">
    <head>
      <base href="/" />
      ...
    </head>
    <body>
      <script src="restore-theme-on-page-load.js"></script>

      <app-root></app-root>
    </body>
  </html>

*/

const Z_THEME_COOKIE_KEY = 'z-theme';
const zThemeDarkCookieValue = 'dark';
const Z_THEME_DARK_CLASS_NAME = 'z-theme-dark';

const isDarkTheme = window.document.cookie.includes(
  `${Z_THEME_COOKIE_KEY}=${zThemeDarkCookieValue}`,
);
if (isDarkTheme) {
  window.document.body.classList.add(Z_THEME_DARK_CLASS_NAME);
}
