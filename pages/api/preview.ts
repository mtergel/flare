import { NextApiRequest, NextApiResponse } from "next";
import { initUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql";
import {
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
} from "graphql/generated/graphql";
import md5 from "md5";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.slug || !req.query.preview) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const slug = req.query.slug;
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "https://flare.hasura.app/v1/graphql",
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
      suspense: false,
    },
    false
  );

  const post = await client!
    .query<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
      GetPostBySlugDocument,
      {
        _eq: slug as string,
      }
    )
    .toPromise();

  if (post.data && post.data.posts && post.data.posts.length > 0) {
    const postObj = post.data.posts[0];
    const hashValue = md5(postObj.slug + process.env.NEXT_PUBLIC_SALT);

    if (hashValue === req.query.preview) {
      // enable preview mode
      res.setPreviewData({});

      res.writeHead(307, {
        Location: `/${postObj.user.username}/articles/${postObj.slug}`,
      });

      res.end();
    } else {
      res.status(403).json({ message: "Invalid key" });
    }
  } else {
    res.status(401).json({ message: "Invalid slug" });
  }
};

export default handler;
