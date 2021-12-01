import _ from "lodash";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// const markdownProcessor = unified()

const previewProcessor = unified()
  // @ts-ignore
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkEmoji)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeSanitize)
  // @ts-ignore
  .use(rehypeStringify)
  .use(rehypeHighlight);

const markdownProcessor = unified()
  // @ts-ignore
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkEmoji)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeSanitize)
  // @ts-ignore
  .use(rehypeStringify)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    properties: {
      className: ["anchor"],
    },
  })
  .use(rehypeHighlight);

export { previewProcessor, markdownProcessor };
