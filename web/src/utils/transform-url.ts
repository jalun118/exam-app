"use client";

import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

export function useCurrentUrl(): string {
  const pathname = usePathname();
  const searchParam = useSearchParams();
  if (searchParam.size === 0) {
    return pathname;
  }
  return pathname + "?" + searchParam;
}

export function transformAsUrl(
  pathname: string,
  searchParam: ReadonlyURLSearchParams,
): string {
  if (searchParam.size === 0) {
    return pathname;
  }
  return pathname + "?" + searchParam;
}
