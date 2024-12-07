import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import { ExtraProps } from "react-markdown";

export const CodeTag = ({
  className,
  children,
  ...props
}: React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  ExtraProps) => {
  const match: Array<string> | null = /language-(\w+)/.exec(className || "");

  if (match) {
    const language: string =
      match !== null ? (match.length > 0 ? match[1] : "") : "";

    const resultHighlight = hljs.highlight(
      String(children).replace(/\n$/, ""),
      { language: language },
    );

    return (
      <code
        className={`language-${resultHighlight.language}`}
        dangerouslySetInnerHTML={{ __html: resultHighlight.value }}
      ></code>
    );
  }

  return (
    <code {...props} className={className}>
      {children}
    </code>
  );
};
