import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { PluggableList } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import autoLink from "rehype-autolink-headings";
import slug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

interface PreviewProps {
  value: string;
  disableAutoLink?: boolean;
}

const Preview: React.FC<PreviewProps> = ({ value, disableAutoLink }) => {
  const rehypePlugins = useMemo(() => {
    if (disableAutoLink) {
      return [slug] as PluggableList;
    } else {
      return [
        slug,
        [
          autoLink,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ] as PluggableList;
    }
  }, [disableAutoLink]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkToc, remarkEmoji]}
      rehypePlugins={rehypePlugins}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            // @ts-ignore
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <span className="code-span">
              <code className={className} {...props}>
                {children}
              </code>
            </span>
          );
        },
      }}
    >
      {value}
    </ReactMarkdown>
  );
};

export default Preview;
