import { render, screen, cleanup } from '@testing-library/react'
import Loader from '../shared/Loader'

afterEach(() => {
    cleanup();
})

test('Should render Loader component with title', () => {
    render(<Loader title="Loading Data" />);
    const absencesListElement = screen.getByTestId('loader');
    expect(absencesListElement).toBeInTheDocument();
    expect(absencesListElement).toHaveTextContent("Loading Data");
})