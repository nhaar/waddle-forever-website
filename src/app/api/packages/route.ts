export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({ 
    packages: [
      {
        setting: 'clothing',
        name: 'Clothing',
        size: 640
      }
    ]
  }, { status: 200 })
}
