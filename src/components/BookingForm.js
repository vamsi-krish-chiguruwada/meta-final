import React, { useState } from 'react';

const BookingForm = (props) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("Birthday");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date && time && guests >= 1) {
            props.submitForm({ date, time, guests, occasion });
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        props.dispatch({ type: 'UPDATE_TIMES', payload: new Date(selectedDate) });
    };

    const isFormValid = date && time && guests >= 1;

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <label htmlFor="res-date">Choose date</label>
            <input
                type="date"
                id="res-date"
                value={date}
                onChange={handleDateChange}
                required
            />

            <label htmlFor="res-time">Choose time</label>
            <select
                id="res-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            >
                <option value="" disabled>Select a time</option>
                {props.availableTimes.map(t => <option key={t}>{t}</option>)}
            </select>

            <label htmlFor="guests">Number of guests</label>
            <input
                type="number"
                placeholder="1"
                min="1"
                max="10"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
            />

            <label htmlFor="occasion">Occasion</label>
            <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
            >
                <option>Birthday</option>
                <option>Anniversary</option>
            </select>

            <input
                type="submit"
                value="Make Your reservation"
                disabled={!isFormValid}
                aria-label="On Click"
            />
        </form>
    );
};

export default BookingForm;