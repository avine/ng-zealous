import { resolve } from 'node:path';

import rootPackageData from '../../package.json' with { type: 'json' };
import libPackageData from '../../projects/ng-zealous/package.json' with { type: 'json' };

const LIB_PACKAGE_PATH = '../../projects/ng-zealous/package.json';

// ----- "root" package.json -----

export type DependencyName = keyof typeof rootPackageData.dependencies;
export type DependencyVersion = string;
export type Dependencies = Partial<Record<DependencyName, DependencyVersion>>;

export const getRootDependencyVersion = (dependencyName: DependencyName): DependencyVersion =>
  rootPackageData.dependencies[dependencyName];

// ----- "ng-zealous" package.json -----

import { writeFile } from 'node:fs/promises';

export class UpdatePeerDependencies {
  protected packageData = libPackageData;

  filePath = resolve(import.meta.dirname, LIB_PACKAGE_PATH);

  constructor(dependencyNames: DependencyName[]) {
    const peerDependencies = dependencyNames.reduce((dependencies, dependencyName) => {
      dependencies[dependencyName] = getRootDependencyVersion(dependencyName);
      return dependencies;
    }, {} as Dependencies);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.packageData.peerDependencies = peerDependencies as any;
  }

  async run() {
    const fileContent = JSON.stringify(this.packageData, undefined, 2);

    await writeFile(this.filePath, fileContent + '\n', 'utf8');

    console.log(`
Updating ${this.filePath}

${fileContent}
`);
  }
}
