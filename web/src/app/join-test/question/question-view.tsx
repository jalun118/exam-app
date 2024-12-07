import MarkdownView from "../../../components/regular/MarkdownView";

export default function QuestionView({ question }: { question?: string }) {
  return (
    <div className="prose prose-base select-none md:prose-lg">
      <MarkdownView>{question ?? "No Question"}</MarkdownView>
    </div>
  );
}
