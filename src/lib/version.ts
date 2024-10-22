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

  isAfterOrEqual (other: VersionLabel) {
    return this.isAfter(other) || this.isEqual(other)
  }

  get version () {
    return [this.major, this.minor, this.patch].join('.');
  }
}

export const CURRENT_VERSION = new VersionLabel('0.2.0');