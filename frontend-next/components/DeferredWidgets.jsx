"use client";
import dynamic from "next/dynamic";

/*
 * Below-the-fold, position:fixed overlay widgets. They are not needed for the
 * initial render, so we load their JS client-side only (ssr:false) to keep it
 * off the critical path — lowers TBT / main-thread work at load. Being
 * position:fixed, deferring them causes no layout shift (CLS).
 */
const ScrollToTop = dynamic(() => import("./ScrollToTop"), { ssr: false });
const Chatbot = dynamic(() => import("./Chatbot/index"), { ssr: false });

export default function DeferredWidgets() {
  return (
    <>
      <ScrollToTop />
      <Chatbot />
    </>
  );
}
