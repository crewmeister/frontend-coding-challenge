import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Home from "../Home";

const mockStore = configureStore([]);

describe("Home component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      absences: [],
    });
  });

  it("should have a title", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText(/Employee Attendance/i)).toBeInTheDocument();
  });

  it("should have absences component rendered", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const el = getByTestId("absences");
    expect(el).toBeInTheDocument();
  });
});
