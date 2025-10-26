import { getCurrentVersion } from '@/lib/version'
import { createJsonPost, OSInformation } from "@/lib/api"
import { ErrorResponse } from "@/lib/res"

export const dynamic = 'force-dynamic'

export const POST = createJsonPost(async (body) => {
  const parse = OSInformation.safeParse(body)
  if (parse.success) {
    const { platform, arch } = parse.data

    const version = (await getCurrentVersion()).version;

    if (platform === 'win32') {
      if (arch === 'x64') {
        return Response.json({
          'exists': true,
          'filename': `server-${version}-win.exe`,
          'name': 'server',
          'type': 'server'
        })
      }
    } else if (platform === 'linux') {
      if (arch === 'x64') {
        return Response.json({
          'exists': true,
          'filename': `server-${version}-linux.zip`,
          'name': 'server',
          'type': 'server'
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