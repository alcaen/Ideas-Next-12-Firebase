// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  description: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    description:
      'Why I create this project ? Well... I forgot the good ideas that I had while taking a shower every single time. In this way I keep them in a database as well the status, description and last time I update that idea. I can use this webapp in my phone and see what I wrote in my pc later.',
  });
}
