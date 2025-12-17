import { z } from "zod"
import { createJsonPost } from "@/lib/api"
import { VersionLabel, getCurrentVersion } from "@/lib/version"
import { ErrorResponse } from "@/lib/res"

const VersionObject = z.object({
  version: z.string()
})

type VersionObject = z.infer<typeof VersionObject>

export const dynamic = 'force-dynamic'

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

    const currentVersion = await getCurrentVersion();

    if (versionLabel.isEqual(currentVersion)) {
      return Response.json({ 'status': 'current', 'version': currentVersion.version })
    } else {
      // you used to be able to send 'old' here, but it is deprecated
      // for old version support, will keep "unsupported" keyword
      return Response.json({ 'status': 'unsupported', 'version': currentVersion.version })
    }
  } else {
    return ErrorResponse.create(400, 'Incorrect body');
  }
})
