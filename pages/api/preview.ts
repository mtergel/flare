import { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";
import { supabase } from "@/utils/supabaseClient";
import { definitions } from "@/utils/generated";
import { PostsJoins } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: "Authorization missing",
    });
  } else if (!req.query.slug || !req.query.preview) {
    return res.status(401).json({
      message: "Invalid token",
    });
  } else {
    supabase.auth.setAuth(req.headers.authorization.replace("Bearer ", ""));

    const slug =
      typeof req.query.slug === "string" ? req.query.slug : req.query.slug[0];

    const postRes = await supabase
      .from<definitions["posts"]>("posts")
      .select(
        `
          slug,
          user:user_id (username)
        `
      )
      .eq("slug", slug)
      .single();

    if (postRes.data) {
      const hashValue = md5(postRes.data.slug + process.env.NEXT_PUBLIC_SALT);
      if (hashValue === req.query.preview) {
        // enable preview mode
        res.setPreviewData(postRes.data.slug);
        res.writeHead(307, {
          Location: `/${(postRes.data as PostsJoins).user.username!}/articles/${
            postRes.data.slug
          }`,
        });
        res.end("ok");
      } else {
        res.status(403).json({ message: "Invalid key" });
      }
    } else {
      res.status(500).json({
        message: postRes.error.message ?? "Error occured",
      });
    }
  }
};

export default handler;
