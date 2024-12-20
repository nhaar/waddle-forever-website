import { z } from "zod"
import { ErrorResponse } from "./res"

export function createJsonPost(callback: (body: any) => Promise<Response>) {
  return async (request: Request) => {
    let body
    try {
      body = await request.json()
    } catch {
      return ErrorResponse.create(400, 'Body must be JSON')
    }

    return await callback(body)
  }
}

export const OSInformation = z.object({
  platform: z.string(),
  arch: z.string()
})