import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import CustomModal from "../CustomModal";
import AbsenceDetail from "../AbsenceDetail";

const mockStore = configureStore([]);

afterEach(cleanup);

describe("CustomModal component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      absences: {
        absences: [],
      },
    });
  });

  it("should display data", () => {
    const data = {
      _id: "608c98be476b18964bfd8849",
      admitterI: null,
      admitterNote: "my text",
      confirmedAt: "2021-01-09T17:43:29.000Z",
      createdAt: "2021-01-09T16:45:47.000Z",
      crewId: 352,
      endDate: "2021-01-11T00:00:00.000Z",
      id: 2634,
      memberNote: "Nachmittag 0,5 Tage. Danke.",
      rejectedAt: null,
      startDate: "2021-01-11T00:00:00.000Z",
      type: "vacation",
      userId: 649,
      user: {
        _id: "608c958b69e35395c08190bc",
        crewId: 352,
        id: 713,
        image: "https://loremflickr.com/300/400",
        name: "Ines",
        userId: 649,
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <CustomModal
          showModal={true}
          toggleModal={() => {}}
          title="Details of absence"
        >
          <AbsenceDetail {...data} />
        </CustomModal>
      </Provider>
    );

    expect(getByText(/Details of absence/i)).toBeInTheDocument();
    expect(getByText(/Ines/i)).toBeInTheDocument();
    expect(getByText(/Vacation/i)).toBeInTheDocument();
    expect(getByText(/1 day/i)).toBeInTheDocument();
    expect(getByText(/Nachmittag 0,5 Tage. Danke./i)).toBeInTheDocument();
    expect(getByText(/Confirmed/i)).toBeInTheDocument();
    expect(getByText(/my text/i)).toBeInTheDocument();
  });
});
