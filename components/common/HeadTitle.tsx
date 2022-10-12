import Head from "next/head";
import React from "react";

interface Title {
  name: string;
}
function HeadTitle({ name }: Title) {
  return (
    <Head>
      <title>{name}</title>
    </Head>
  );
}

export default HeadTitle;
