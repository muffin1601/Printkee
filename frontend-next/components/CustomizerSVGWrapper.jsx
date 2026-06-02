"use client";
import dynamic from "next/dynamic";

const CustomizerSVG = dynamic(
  () => import("./Customize/CustomizerSVG"),
  { ssr: false, loading: () => <div>Loading customizer...</div> }
);

export default function CustomizerSVGWrapper() {
  return <CustomizerSVG />;
}
