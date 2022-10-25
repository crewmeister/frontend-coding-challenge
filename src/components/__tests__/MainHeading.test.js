import { render, screen, cleanup } from '@testing-library/react'
import MainHeading from '../shared/MainHeading'

afterEach(() => {
    cleanup();
})

test('Should render Heading component with title', () => {
    render(<MainHeading title="Search Here" />);
    const absencesListElement = screen.getByTestId('heading');
    expect(absencesListElement).toBeInTheDocument();
    expect(absencesListElement).toHaveTextContent("Search Here");
})