import React from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const processor = unified()
  // @ts-ignore
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeHighlight)
  // @ts-ignore
  .use(rehypeReact, { createElement: React.createElement });
