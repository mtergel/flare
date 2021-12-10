import _ from "lodash";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const previewProcessor = unified()
  // @ts-ignore
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkEmoji)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      code: [
        ...(defaultSchema.attributes!.code || []),
        // List of all allowed languages:
        [
          "className",
          "hljs",
          "language-bash",
          "language-c",
          "language-cpp",
          "language-csharp",
          "language-css",
          "language-diff",
          "language-go",
          "language-ini",
          "language-java",
          "language-javascript",
          "language-json",
          "language-kotlin",
          "language-less",
          "language-lua",
          "language-makefile",
          "language-markdown",
          "language-objectivec",
          "language-perl",
          "language-php",
          "language-php-template",
          "language-plaintext",
          "language-python",
          "language-python-repl",
          "language-r",
          "language-ruby",
          "language-rust",
          "language-scss",
          "language-shell",
          "language-sql",
          "language-swift",
          "language-typescript",
          "language-vbnet",
          "language-xml",
          "language-yaml",
        ],
      ],
      span: [
        ...(defaultSchema.attributes!.span || []),
        // List of all allowed tokens:
        [
          "className",
          "hljs-addition",
          "hljs-attr",
          "hljs-attribute",
          "hljs-built_in",
          "hljs-bullet",
          "hljs-char",
          "hljs-code",
          "hljs-comment",
          "hljs-deletion",
          "hljs-doctag",
          "hljs-emphasis",
          "hljs-formula",
          "hljs-keyword",
          "hljs-link",
          "hljs-literal",
          "hljs-meta",
          "hljs-name",
          "hljs-number",
          "hljs-operator",
          "hljs-params",
          "hljs-property",
          "hljs-punctuation",
          "hljs-quote",
          "hljs-regexp",
          "hljs-section",
          "hljs-selector-attr",
          "hljs-selector-class",
          "hljs-selector-id",
          "hljs-selector-pseudo",
          "hljs-selector-tag",
          "hljs-string",
          "hljs-strong",
          "hljs-subst",
          "hljs-symbol",
          "hljs-tag",
          "hljs-template-tag",
          "hljs-template-variable",
          "hljs-title",
          "hljs-type",
          "hljs-variable",
        ],
      ],
    },
  })
  // @ts-ignore
  .use(rehypeStringify);
const markdownProcessor = unified()
  // @ts-ignore
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkEmoji)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      code: [
        ...(defaultSchema.attributes!.code || []),
        // List of all allowed languages:
        [
          "className",
          "hljs",
          "language-bash",
          "language-c",
          "language-cpp",
          "language-csharp",
          "language-css",
          "language-diff",
          "language-go",
          "language-ini",
          "language-java",
          "language-javascript",
          "language-json",
          "language-kotlin",
          "language-less",
          "language-lua",
          "language-makefile",
          "language-markdown",
          "language-objectivec",
          "language-perl",
          "language-php",
          "language-php-template",
          "language-plaintext",
          "language-python",
          "language-python-repl",
          "language-r",
          "language-ruby",
          "language-rust",
          "language-scss",
          "language-shell",
          "language-sql",
          "language-swift",
          "language-typescript",
          "language-vbnet",
          "language-xml",
          "language-yaml",
        ],
      ],
      span: [
        ...(defaultSchema.attributes!.span || []),
        // List of all allowed tokens:
        [
          "className",
          "hljs-addition",
          "hljs-attr",
          "hljs-attribute",
          "hljs-built_in",
          "hljs-bullet",
          "hljs-char",
          "hljs-code",
          "hljs-comment",
          "hljs-deletion",
          "hljs-doctag",
          "hljs-emphasis",
          "hljs-formula",
          "hljs-keyword",
          "hljs-link",
          "hljs-literal",
          "hljs-meta",
          "hljs-name",
          "hljs-number",
          "hljs-operator",
          "hljs-params",
          "hljs-property",
          "hljs-punctuation",
          "hljs-quote",
          "hljs-regexp",
          "hljs-section",
          "hljs-selector-attr",
          "hljs-selector-class",
          "hljs-selector-id",
          "hljs-selector-pseudo",
          "hljs-selector-tag",
          "hljs-string",
          "hljs-strong",
          "hljs-subst",
          "hljs-symbol",
          "hljs-tag",
          "hljs-template-tag",
          "hljs-template-variable",
          "hljs-title",
          "hljs-type",
          "hljs-variable",
        ],
      ],
    },
  })
  // @ts-ignore
  .use(rehypeStringify)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    properties: {
      className: ["anchor"],
    },
  });
export { previewProcessor, markdownProcessor };
