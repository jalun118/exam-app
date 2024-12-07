"uce client";

import { ChangeEvent, FocusEvent, useState } from "react";

export default function InputTextArea({
  onTyping,
  className,
  valueEmpty,
  disabled,
  value,
  name,
  title,
}: {
  onTyping?: (value: string) => void;
  className?: string;
  valueEmpty?: string;
  disabled?: boolean;
  title?: string;
  value?: string;
  name?: string;
}) {
  const [val, SetVal] = useState(value ?? valueEmpty ?? "");

  function checkScroll(e: ChangeEvent<HTMLTextAreaElement>) {
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
      onTyping(e.target.value);
    }
    SetVal(e.target.value);
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
      name={name}
      onChange={(e) => checkScroll(e)}
    ></textarea>
  );
}
