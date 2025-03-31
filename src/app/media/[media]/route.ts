/**
 * This API route is meant to serve the proper media zip file.
 * 
 * The reason why it is an API and not just static serving (like it used to be prior to 0.2.3)
 * is because sometimes there will be media packages that don't change at all between versions,
 * and they are very large (eg. the clothing package),
 * so it would be a waste to keep including duplicate files like that, so here we redirect
 * the file names as is it necessary
 */

import fs from 'fs';
import path from 'path';

import { notFound } from 'next/navigation';

import { VersionLabel } from '@/lib/version';

/** This array of version strings is used to define all versions in which a media was updated */
type MediaUpdateVersions = Array<string>;

/** Maps the name of a media, and then all the versions in which it was updated */
type MediaAndVersions = Record<string, MediaUpdateVersions>;

/** Class handles obtaining the correct file name for the medias */
class MediaFileName {
  /**
   * File that links each media to valid versions
   * 
   * If the media always updates, then you need not write it here, but
   * if the media doesn't always update, you must include it linked to
   * an array of all the versions where it updated
   * 
   * Must not include versions earlier than the "last non clever version"
   * */
  static MEDIA_INFO: MediaAndVersions = {
    'clothing': ['0.2.3']
  };

  /** Last version in which this system was not supported */
  static LAST_NON_CLEVER_VERSION = '0.2.3';

  private name: string
  private version: VersionLabel
  
  /**
   * @param mediaName Name of the media
   * @param version Version of Waddle Forever being used
   */
  constructor(mediaName: string, version: string) {
    this.name = mediaName;
    this.version = new VersionLabel(version);
  }

  /**
   * Finds the last immediate version that there was an update in this media relative to the current one,
   * if the current version corresponds to one in which there was an update, then it
   * returns the current version
   * */
  private processMediaUpdateVersions(versions: MediaUpdateVersions): string {
    const reversedLabels = versions.map((v) => new VersionLabel(v)).reverse();
    for (const label of reversedLabels) {
      if (label.isBeforeOrEqual(this.version)) {
        return label.version;
      }
    }
  
    // this should never happen if the versions code is maintained properly
    throw new Error(`Error processing media update versions, versions:${versions}, current version: ${this.version}`);
  }

  get fileName(): string {
    let versionString = this.version.version;
    if (this.version.isAfter(new VersionLabel(MediaFileName.LAST_NON_CLEVER_VERSION))) {
      const versions = MediaFileName.MEDIA_INFO[this.name];
      if (versions !== undefined) {
        versionString = this.processMediaUpdateVersions(versions);
      }
    }
  
    return `${this.name}-${versionString}.zip`;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ media: string }> }
) {
  const { media } = await params

  const mediaMatch = media.match(/^(\w+)-(\d+\.\d+\.\d+)\.zip$/);
  
  if (mediaMatch === null) {
    return notFound();
  }

  const mediaName = mediaMatch[1];
  const version = mediaMatch[2];

  const fileName = (new MediaFileName(mediaName, version)).fileName;
  const filePath = path.join(process.cwd(), 'public', fileName);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });

  return new Response(fileBuffer, { headers: {
    'content-type': 'application/zip',
    'content-length': String(fileBuffer.byteLength)
  } });
}