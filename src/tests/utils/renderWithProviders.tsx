import React, { type PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { rootReducer, type RootState } from "@/stores/index";

// RenderOptionsの型をRootStateに合わせる
type RenderOptions = {
  preloadedState?: Partial<RootState>; // Partialを使うことで一部のStateだけ上書き可能にする
  route?: string;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, route = "/" }: RenderOptions = {}
) {
  // combineReducersを使ったrootReducerに対してpreloadedStateを適用する
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  };
}
