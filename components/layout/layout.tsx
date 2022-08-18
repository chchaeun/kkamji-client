import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useEffect } from "react";
import Header from "./header";
interface IProps {
  children: ReactNode;
}
function Layout(props: IProps) {
  return (
    <Fragment>
      <Header />
      <main className="h-screen">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
