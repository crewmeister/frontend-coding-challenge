import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import TableHeader from "../TableHeader";

const mockStore = configureStore([]);

describe("TableHeader component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      absences: [],
    });
  });

  it("should display data", () => {
    const tableHeaders = [
      "Sr. No.",
      "Member name",
      "Type of absence",
      "Period",
      "Member note",
      "Status",
      "Admitter note",
      "Actions",
    ];

    const { getByText } = render(
      <Provider store={store}>
        <table>
          <thead>
            <TableHeader data={tableHeaders} />
          </thead>
        </table>
      </Provider>
    );

    expect(getByText(/Sr. No./i)).toBeInTheDocument();
    expect(getByText(/Member name/i)).toBeInTheDocument();
    expect(getByText(/Type of absence/i)).toBeInTheDocument();
    expect(getByText(/Period/i)).toBeInTheDocument();
    expect(getByText(/Member note/i)).toBeInTheDocument();
    expect(getByText(/Status/i)).toBeInTheDocument();
    expect(getByText(/Admitter note/i)).toBeInTheDocument();
    expect(getByText(/Actions/i)).toBeInTheDocument();
  });
});
