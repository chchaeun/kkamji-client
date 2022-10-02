import React, { Fragment, ReactNode } from "react";
import Header from "./HeaderComponent";
interface IProps {
  children: ReactNode;
}
function Layout(props: IProps) {
  return (
    <Fragment>
      <Header />
      <main className="h-full">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
