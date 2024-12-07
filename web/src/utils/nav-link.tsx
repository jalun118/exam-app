"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react";

interface PropsButton extends ButtonHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isActiveClassName?: string;
  sensitivePath?: boolean;
}

export default function NavLink({
  href,
  children,
  onClick,
  isActiveClassName,
  sensitivePath,
  ...props
}: PropsButton) {
  const { push } = useRouter();
  const pathname = usePathname();
  let isActive = false;

  if (sensitivePath) {
    isActive = pathname === href;
  } else {
    const pathLow = pathname.toLowerCase();
    const hrefPath = href.toLowerCase();
    isActive =
      pathLow === hrefPath ||
      (pathLow.startsWith(hrefPath) && pathLow.charAt(hrefPath.length) === "/");
  }

  const classNameState = isActive
    ? (isActiveClassName ?? props.className)
    : props.className;

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
    push(href, { scroll: true });
  };

  return (
    <a
      {...props}
      onClick={(e) => handleClick(e)}
      className={classNameState}
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}
