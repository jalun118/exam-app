"use client";
import { AppProgressBar } from "next-nprogress-bar";

export default function LoadingTopBar() {
  return (
    <AppProgressBar
      height="2px"
      options={{
        showSpinner: false,
        trickle: false,
      }}
      color="#2563eb"
    />
  );
}
