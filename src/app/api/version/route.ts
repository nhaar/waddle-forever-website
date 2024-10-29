import { z } from "zod"
import { createJsonPost } from "@/lib/api"
import { VersionLabel, CURRENT_VERSION } from "@/lib/version"
import { ErrorResponse } from "@/lib/res"

const VersionObject = z.object({
  version: z.string()
})

type VersionObject = z.infer<typeof VersionObject>

export const dynamic = 'force-dynamic'

const LAST_SUPPORTED_AUTO_VERSION = new VersionLabel('0.2.1');

export const POST = createJsonPost(async (body) => {
  const parse = VersionObject.safeParse(body)
  if (parse.success) {
    const { version } = parse.data
    let versionLabel: VersionLabel

    try {
      versionLabel = new VersionLabel(version)
    } catch {
      return ErrorResponse.create(400, 'Incorrect version')
    }

    if (versionLabel.isBefore(LAST_SUPPORTED_AUTO_VERSION)) {
      return Response.json({ 'status': 'unsupported' })
    } else if (versionLabel.isEqual(CURRENT_VERSION)) {
      return Response.json({ 'status': 'current' })
    } else {
      return Response.json({ 'status': 'unsupported' })
    }
  } else {
    return ErrorResponse.create(400, 'Incorrect body');
  }
})
