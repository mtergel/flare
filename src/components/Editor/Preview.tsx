import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkToc from "remark-toc";
import slug from "rehype-slug";
import sanitize from "rehype-sanitize";
import autoLink from "rehype-autolink-headings";

interface PreviewProps {
  value: string;
}

const Preview: React.FC<PreviewProps> = ({ value }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkToc]}
      rehypePlugins={[
        sanitize,
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
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <div className="code-block">
              <code className={className} {...props}>
                {children}
              </code>
            </div>
          );
        },
      }}
    >
      {value}
    </ReactMarkdown>
  );
};

export default Preview;
