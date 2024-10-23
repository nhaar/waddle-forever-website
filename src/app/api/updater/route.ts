import { createJsonPost, OSInformation } from "@/lib/api"
import { ErrorResponse } from "@/lib/res"

export const dynamic = 'force-dynamic'

export const POST = createJsonPost(async (body) => {
  const parse = OSInformation.safeParse(body)
  if (parse.success) {
    const { platform, arch } = parse.data

    if (platform === 'win32') {
      if (arch === 'x64') {
        return Response.json({
          'exists': true,
          'filename': `updater-win.exe`,
          'name': 'updater',
          'type': 'updater'
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
