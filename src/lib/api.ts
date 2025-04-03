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

/** Check if a string can be used as a media's name */
export function isValidMediaName(name: string): boolean {
  const match = name.match(/^\w+$/);
  return match !== null;
}