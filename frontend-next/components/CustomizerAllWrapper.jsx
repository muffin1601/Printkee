"use client";
import dynamic from "next/dynamic";

const CustomizerAll = dynamic(
  () => import("./Customize/CustomizerAll"),
  { ssr: false, loading: () => <div>Loading customizer...</div> }
);

export default function CustomizerAllWrapper() {
  return <CustomizerAll />;
}
