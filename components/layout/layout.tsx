import { useRouter } from "next/router";
import React, { Fragment, ReactNode, useEffect } from "react";
import Header from "./header";
import MobileNav from "./mobile-nav";
interface IProps {
  children: ReactNode;
}
function Layout(props: IProps) {
  return (
    <Fragment>
      <Header />
      <MobileNav />
      <main className="h-full">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
