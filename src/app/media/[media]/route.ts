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
import { getLastEquivalentVersion } from '@/lib/media-versions';
import { ErrorResponse } from '@/lib/res';
import { isValidMediaName } from '@/lib/api';

/** Gets the file name that will be downloaded for a media and version */
function getFileName(media: string, version: VersionLabel) {
  const equivalentVersionString = getLastEquivalentVersion(media, version);
  return `${media}-${equivalentVersionString.version}.zip`;
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
  if (!isValidMediaName(mediaName)) {
    return ErrorResponse.invalidMediaName();
  }

  let version: VersionLabel;
  try {
    version = new VersionLabel(mediaMatch[2]);
  } catch {
    return ErrorResponse.invalidVersion();
  }

  const fileName = getFileName(mediaName, version);
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