import { z } from "zod"
import { createJsonPost } from "@/lib/api"
import { ErrorResponse } from "@/lib/res"

const InstallerVersion = z.object({
  version: z.string()
})

export const dynamic = 'force-dynamic'

const SUPPORTED_VERSION = '1'

export const POST = createJsonPost(async (body) => {
  const parse = InstallerVersion.safeParse(body)
  if (parse.success) {
    const { version } = parse.data
    const status = version === SUPPORTED_VERSION ? 'current' : 'old'
    return Response.json({ status }, { status: 200 })
  } else {
    return ErrorResponse.create(400, 'Incorrect body');
  }
})