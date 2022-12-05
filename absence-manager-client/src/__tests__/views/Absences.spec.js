import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import Absences from '../../views/Absences';
import { populatedAbsences } from "../../__data__/absences.data";

describe('renders Absences View', () => {
  it('when there is no absence data, No data text should be shown', async () => {
    render(<Absences           
      absences={[]}
      isLoading={false}
      isError={false}
      error={''}
    />);
    const totalAbsences = await screen.findByText(/Total Absences:/i);
    expect(totalAbsences).toBeInTheDocument();

    const noDataText = await screen.findByText(/No data/i);
    expect(noDataText).toBeInTheDocument();
  });

  it('when there are absence data, Data should be shown', async () => {
    render(<Absences           
      absences={populatedAbsences}
      isLoading={false}
      isError={false}
      error={''}
    />);
    const memberNote = await screen.findByText(populatedAbsences[0].memberNote);
    expect(memberNote).toBeInTheDocument();

    const vacations = await screen.findAllByText(/vacation/i);
    expect(vacations.length).toBe(1);
  });

  it('when date picker is clicked, Date Picker should be opened', async () => {
    render(<Absences           
      absences={populatedAbsences}
      isLoading={false}
      isError={false}
      error={''}
    />);
    const datePicker = await screen.findByPlaceholderText(/Select date/i);
    expect(datePicker).toBeInTheDocument();
    user.click(datePicker);

    const todayText = await screen.findByText(/Today/i);
    expect(todayText).toBeInTheDocument();
  });

  it('when there is an error, Error message should be shown', async () => {
    render(<Absences           
      absences={[]}
      isLoading={false}
      isError={true}
      error={'Test Error'}
    />);

    const errorText = await screen.findByText(/Test Error/i);
    expect(errorText).toBeInTheDocument();
  });
});
