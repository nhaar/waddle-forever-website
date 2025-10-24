import { VersionLabel } from "./version";

/** This array of version strings is used to define all versions in which a media was updated */
type MediaUpdateVersions = Array<string>;

/** Maps the name of a media, and then all the versions in which it was updated */
type MediaAndVersions = Record<string, MediaUpdateVersions>;

/**
 * File that links each media to valid versions
 * 
 * If the media always updates, then you need not write it here, but
 * if the media doesn't always update, you must include it linked to
 * an array of all the versions where it updated
 * 
 * Must not include versions earlier than the "last non clever version"
 * */
const MEDIA_INFO: MediaAndVersions = {
  'clothing': ['0.2.3', '1.0.0', '1.1.0', '1.2.0']
};

/** Last version in which this system was not supported */
const LAST_NON_CLEVER_VERSION = '0.2.3';

export function getLastEquivalentVersion(media: string, version: VersionLabel): VersionLabel {
  let lastEquivalentVersion = version;

  // we check for after because  if it is before the system is set up,
  // then there is no equivalence system
  if (version.isAfter(new VersionLabel(LAST_NON_CLEVER_VERSION))) {
    const versions = MEDIA_INFO[media];
    // undefined means there's no equivalence system either
    if (versions !== undefined) {
      const reversedLabels = versions.map((v) => new VersionLabel(v)).reverse();
      for (const label of reversedLabels) {
        if (label.isBeforeOrEqual(version)) {
          lastEquivalentVersion = label;
          break;
        }
      }
    }
  }

  return lastEquivalentVersion;
}