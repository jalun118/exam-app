"uce client";

import { ChangeEvent, FocusEvent, useState } from "react";

export default function InputText({
  onTyping,
  className,
  valueEmpty,
  disabled,
  title,
}: {
  onTyping?: (value: string) => void;
  className?: string;
  valueEmpty?: string;
  disabled?: boolean;
  title?: string;
}) {
  const [val, SetVal] = useState(valueEmpty ?? "");

  function checkScroll(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value[e.target.value.length - 1] !== "\n") {
      e.currentTarget.style.height = window.getComputedStyle(
        e.currentTarget,
      ).lineHeight;
      e.currentTarget.style.height =
        e.currentTarget.scrollHeight +
        Math.round(
          parseFloat(
            window
              .getComputedStyle(e.currentTarget)
              .borderBottomWidth.replaceAll("px", ""),
          ),
        ) +
        "px";

      if (onTyping) {
        onTyping(e.target.value.replaceAll("\n", ""));
      }
      SetVal(e.target.value.replaceAll("\n", ""));
    }
  }

  function handlerFocus(e: FocusEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = window.getComputedStyle(
      e.currentTarget,
    ).lineHeight;
    e.currentTarget.style.height =
      e.currentTarget.scrollHeight +
      Math.round(
        parseFloat(
          window
            .getComputedStyle(e.currentTarget)
            .borderBottomWidth.replaceAll("px", ""),
        ),
      ) +
      "px";
  }

  function handlerBlur() {
    if (val === "") {
      if (valueEmpty) {
        SetVal(valueEmpty);
      } else {
        SetVal("");
      }
    }
  }

  return (
    <textarea
      title={title}
      onFocus={(e) => handlerFocus(e)}
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      aria-autocomplete="none"
      onBlur={() => handlerBlur()}
      disabled={disabled}
      className={className}
      value={val}
      onChange={(e) => checkScroll(e)}
    ></textarea>
  );
}
