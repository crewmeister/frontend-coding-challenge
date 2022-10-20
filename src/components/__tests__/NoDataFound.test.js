import { render, screen, cleanup } from '@testing-library/react'
import NoDataFound from '../shared/NoDataFound'

afterEach(() => {
    cleanup();
})

test('Should render NoDataFound component with title', () => {
    render(<NoDataFound title="No Data" />);
    const absencesListElement = screen.getByTestId('no_data');
    expect(absencesListElement).toBeInTheDocument();
    expect(absencesListElement).toHaveTextContent("No Data");
})