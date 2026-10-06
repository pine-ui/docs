import React from "react";
import Head from "@docusaurus/Head";
import SearchPage from "@theme-original/SearchPage";

export default function PineSearchPage(props) {
  return (
    <>
      <SearchPage {...props} />
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
    </>
  );
}
