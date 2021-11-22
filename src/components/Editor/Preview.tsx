import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkToc from "remark-toc";
import slug from "rehype-slug";
import autoLink from "rehype-autolink-headings";
import remarkEmoji from "remark-emoji";

interface PreviewProps {
  value: string;
}

const Preview: React.FC<PreviewProps> = ({ value }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkToc, remarkEmoji]}
      rehypePlugins={[
        slug,
        [
          autoLink,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ]}
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
