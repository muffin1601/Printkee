import { Suspense } from "react";
import SearchResultsClient from "../../../components/SearchResultsClient";

export const metadata = {
  title: "Search | MF Global Services",
  description:
    "Search across corporate gifting products, branded items, hampers, and custom merchandise.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsClient />
    </Suspense>
  );
}
