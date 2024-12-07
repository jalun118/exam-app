import { ExtraProps } from "react-markdown";

export function ScriptCode({
  children,
  ...props
}: React.ClassAttributes<HTMLScriptElement> &
  React.ScriptHTMLAttributes<HTMLScriptElement> &
  ExtraProps) {
  return (
    <pre>
      <code {...props}>{children}</code>
    </pre>
  );
}

export function Anchor({
  children,
  ...props
}: React.ClassAttributes<HTMLAnchorElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ExtraProps) {
  return <span {...props}>{children}</span>;
}
