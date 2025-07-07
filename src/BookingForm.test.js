import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './components/BookingForm';

// Mock availableTimes and dispatch function
const mockTimes = ['17:00', '18:00', '19:00'];
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

test('Renders all form fields', () => {
    render(
        <BookingForm
            availableTimes={mockTimes}
            dispatch={mockDispatch}
            submitForm={mockSubmitForm}
        />
    );

    // Check for all labels
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
});


test('Submit button is disabled with invalid form', () => {
    render(
        <BookingForm
            availableTimes={mockTimes}
            dispatch={mockDispatch}
            submitForm={mockSubmitForm}
        />
    );

    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    expect(submitButton).toBeDisabled();

    // Fill in only the date
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-10-10' } });
    expect(submitButton).toBeDisabled();
});

test('Submit button is enabled with valid form and submission works', () => {
    render(
        <BookingForm
            availableTimes={mockTimes}
            dispatch={mockDispatch}
            submitForm={mockSubmitForm}
        />
    );

    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    // Fill in form with valid data
    fireEvent.change(dateInput, { target: { value: '2025-10-10' } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '2' } });

    expect(submitButton).toBeEnabled();

    // Submit the form
    fireEvent.click(submitButton);
    expect(mockSubmitForm).toHaveBeenCalledWith({
        date: '2025-10-10',
        time: '17:00',
        guests: '2',
        occasion: 'Birthday'
    });
});