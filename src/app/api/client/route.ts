import { CURRENT_VERSION } from '@/lib/version'
import { createJsonPost, OSInformation } from "@/lib/api"
import { ErrorResponse } from "@/lib/res"

export const dynamic = 'force-dynamic'

export const POST = createJsonPost(async (body) => {
  const parse = OSInformation.safeParse(body)
  if (parse.success) {
    const { platform, arch } = parse.data

    const version = CURRENT_VERSION.version;

    if (platform === 'win32') {
      if (arch === 'x64') {
        return Response.json({
          'exists': true,
          'filename': `client-${version}-win.zip`,
          'name': 'client'
        })
      }
    }
    return Response.json({
      'exists': false
    })
  } else {
    return ErrorResponse.create(400, 'Incorrect body');
  }
})