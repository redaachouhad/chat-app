"use client";

import { store } from "@ext/lib/redux/store";
import { Provider } from "react-redux";

function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
