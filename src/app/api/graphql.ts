// pages/api/graphql.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ensureIndex } from '../../lib/graphql-service';
const proxy = createProxyMiddleware({
  target: 'http://localhost:4000', // Your Apollo Server URL
  changeOrigin: true,
  pathRewrite: {
    '^/api/graphql': '/', // Optional: rewrite path if necessary
  },
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Proxying request to Apollo Server');
  console.log(req.body);
  console.log(res);
  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }

    return res.status(404).end();
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to let the proxy handle it
  },
};
