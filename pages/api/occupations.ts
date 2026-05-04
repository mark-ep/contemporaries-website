import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { head } = req.query
  const url = new URL(`${process.env.API_ROOT}occupations/`)
  if (head) url.searchParams.set('head', String(head))
  const response = await fetch(url.toString())
  const data = await response.json()
  res.status(response.status).json(data)
}
