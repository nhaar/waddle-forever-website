import { z } from "zod"
import { createJsonPost } from "@/lib/api"
import { ErrorResponse } from "@/lib/res"

const VersionObject = z.object({
  version: z.string()
})

type VersionObject = z.infer<typeof VersionObject>

export const dynamic = 'force-dynamic'

class VersionLabel {
  major: number
  minor: number
  patch: number

  constructor (version: string) {
    const match = version.match(/(\d+)\.(\d+)\.(\d+)/)
    if (match === null) {
      throw new Error('Incorrect version string')
    }

    this.major = Number(match[1])
    this.minor = Number(match[2])
    this.patch = Number(match[3])
  }

  isAfter (other: VersionLabel) {
    if (this.major < other.major) {
      return false;
    } else if (this.major > other.major) {
      return true;
    }

    if (this.minor < other.minor) {
      return false;
    } else if (this.minor > other.minor) {
      return true;
    }

    if (this.patch < other.patch) {
      return false;
    } else if (this.patch > other.patch) {
      return true;
    }

    return false;
  }

  isEqual (other: VersionLabel) {
    return other.major === this.major && other.minor === this.minor && other.patch === this.patch
  }

  isBefore (other: VersionLabel) {
    return !(this.isAfterOrEqual(other))
  }

  isAfterOrEqual (other: VersionLabel) {
    return this.isAfter(other) || this.isEqual(other)
  }

  get version () {
    return [this.major, this.minor, this.patch].join('.');
  }
}

const LAST_SUPPORTED_AUTO_VERSION = new VersionLabel('0.1.2');

export const CURRENT_VERSION = new VersionLabel('0.2.0');

export const POST = createJsonPost(async (body) => {
  const parse = VersionObject.safeParse(body)
  if (parse.success) {
    const { version } = parse.data
    let versionLabel: VersionLabel

    try {
      versionLabel = new VersionLabel(version)
    } catch (error) {
      return ErrorResponse.create(400, 'Incorrect version')
    }

    if (versionLabel.isBefore(LAST_SUPPORTED_AUTO_VERSION)) {
      return Response.json({ 'status': 'unsupported' })
    } else if (versionLabel.isEqual(CURRENT_VERSION)) {
      return Response.json({ 'status': 'current' })
    } else {
      return Response.json({ 'status': 'old' })
    }
  } else {
    return ErrorResponse.create(400, 'Incorrect body');
  }
})
