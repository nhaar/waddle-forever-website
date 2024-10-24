import { z } from "zod"
import { CURRENT_VERSION } from '@/lib/version'
import { createJsonPost } from '@/lib/api'

const Settings = z.object({
  clothing: z.boolean().optional()
})

type Settings = z.infer<typeof Settings>

export const dynamic = 'force-dynamic'

export const POST = createJsonPost(async (body) => {
  const parse = Settings.safeParse(body)
  if (parse.success) {
    const version = CURRENT_VERSION.version
    const files = [
      { filename: `static-${version}.zip`, name: 'static', type: 'media' },
      { filename: `special-${version}.zip`, name: 'special', type: 'media' }
    ]

    if (parse.data.clothing === true) {
      files.push({ filename: `clothing-${version}.zip`, name: 'clothing', type: 'media' })
    }

    return Response.json({
      'exists': true,
      'filenames': files,
    })
  } else {
    return Response.json({ 'error': 'Incorrect body' }, { status: 400 });
  }
})
