import { z } from "zod"
import { getCurrentVersion } from '@/lib/version'
import { createJsonPost } from '@/lib/api'

const Settings = z.object({
  clothing: z.boolean().optional()
})

type Settings = z.infer<typeof Settings>

export const dynamic = 'force-dynamic'

export const POST = createJsonPost(async (body) => {
  const parse = Settings.safeParse(body)
  if (parse.success) {
    const version = (await getCurrentVersion()).version
    const files = [
      { filename: `static-${version}.zip`, name: 'static', type: 'media' },
      { filename: `special-${version}.zip`, name: 'special', type: 'media' },
      { filename: `furniture-${version}.zip`, name: 'furniture', type: 'media' },
      { filename: `music-${version}.zip`, name: 'music', type: 'media' },
      { filename: `newspapers-${version}.zip`, name: 'newspapers', type: 'media' },
      { filename: `versions-${version}.zip`, name: 'versions', type: 'media' }
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
