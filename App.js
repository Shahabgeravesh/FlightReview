import React from "react";
import { NativeBaseProvider } from "native-base";

import Navigation from "./src/Navigation";

import store from "./src/Redux/store";
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
}