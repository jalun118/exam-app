import "katex/dist/katex.min.css";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeTag } from "./Code";

export default function MarkdownView({
  children,
}: {
  children: string | null | undefined;
}) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        a: ({ ...props }) => {
          return <span {...props}>{props.children}</span>;
        },
        code: CodeTag,
        script: ({ ...props }) => {
          return (
            <pre>
              <code {...props}>{props.children}</code>
            </pre>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
