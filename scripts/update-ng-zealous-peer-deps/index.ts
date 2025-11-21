import { UpdatePeerDependencies } from './update-peer-dependencies.ts';

// This script updates the `peerDependencies` object in the `projects/ng-zealous/package.json` file,
// based on the `dependencies` object in the root `package.json` file.

new UpdatePeerDependencies([
  '@angular/common',
  '@angular/core',
  '@angular/material',
  '@angular/material-date-fns-adapter',
  'axe-core',
  'date-fns',
  'highlight.js',
  'marked',
]).run();
