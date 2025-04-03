/** Route used for checking if two versions of a media share the same file or not */

import { createJsonPost, isValidMediaName } from "@/lib/api"
import { getLastEquivalentVersion } from "@/lib/media-versions"
import { ErrorResponse } from "@/lib/res"
import { VersionLabel } from "@/lib/version"
import { z } from "zod"

const VersionCheckRequest = z.object({
  media: z.string(),
  oldVersion: z.string(),
  newVersion: z.string()
})

type VersionCheckRequest = z.infer<typeof VersionCheckRequest>

export const POST = createJsonPost(async (body) => {
  const parse = VersionCheckRequest.safeParse(body);
  if (parse.success) {
    const { oldVersion, newVersion, media } = parse.data;
    if (!isValidMediaName(media)) {
      return ErrorResponse.invalidMediaName();
    }

    let oldVersionLabel: VersionLabel;
    let newVersionLabel: VersionLabel;
    try {
      oldVersionLabel = new VersionLabel(oldVersion);
      newVersionLabel = new VersionLabel(newVersion);
    } catch {
      return ErrorResponse.invalidVersion();
    }

    const lastEquivalentVersion = getLastEquivalentVersion(media, newVersionLabel);

    // if they are equivalent, then lastEquiv <= old <= new
    // old <= new should be true if the data is correct
    const isEquivalent = lastEquivalentVersion.isBeforeOrEqual(oldVersionLabel) && oldVersionLabel.isBeforeOrEqual(newVersionLabel);

    return Response.json({ isEquivalent }, { status: 200 });
  } else {
    return ErrorResponse.create(400, 'Invalid body');
  }
})