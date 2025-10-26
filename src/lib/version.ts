import fs from 'fs';

export class VersionLabel {
  major: number
  minor: number
  patch: number

  constructor (version: string) {
    const match = version.match(/(\d+)\.(\d+)\.(\d+)/)
    if (match === null) {
      throw new Error('Incorrect version string')
    }

    this.major = Number(match[1])
    this.minor = Number(match[2])
    this.patch = Number(match[3])
  }

  isAfter (other: VersionLabel) {
    if (this.major < other.major) {
      return false;
    } else if (this.major > other.major) {
      return true;
    }

    if (this.minor < other.minor) {
      return false;
    } else if (this.minor > other.minor) {
      return true;
    }

    if (this.patch < other.patch) {
      return false;
    } else if (this.patch > other.patch) {
      return true;
    }

    return false;
  }

  isEqual (other: VersionLabel) {
    return other.major === this.major && other.minor === this.minor && other.patch === this.patch
  }

  isBefore (other: VersionLabel) {
    return !(this.isAfterOrEqual(other))
  }

  isBeforeOrEqual (other: VersionLabel) {
    return !(this.isAfter(other));
  }

  isAfterOrEqual (other: VersionLabel) {
    return this.isAfter(other) || this.isEqual(other)
  }

  get version () {
    return [this.major, this.minor, this.patch].join('.');
  }
}

const VERSION_FILE = 'version-cache';

function saveVersionCache(version: string): void {
  fs.writeFile(VERSION_FILE, version, (err) => {
    if (err !== null) {
      throw err;
    }
  });
}

async function readVersionCache(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(VERSION_FILE, { encoding: 'utf-8' }, (err, data) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}

export async function getCurrentVersion() {
  const res = await fetch('https://api.github.com/repos/nhaar/Waddle-Forever/releases/latest');
  if (res.status === 200) {
    const json = await res.json();
    const tag = json['tag_name'] as string;
    const version = tag.slice(1);
    saveVersionCache(version);
    return new VersionLabel(version);
  } else {
    const version = await readVersionCache();
    return new VersionLabel(version);
  }
}