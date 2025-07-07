import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { fetchAPI, submitAPI } from '../api';

export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return fetchAPI(action.payload);
        default:
            return state;
    }
};

export const initializeTimes = () => {
    return fetchAPI(new Date());
};

const BookingPage = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    const navigate = useNavigate();

    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate('/confirmed');
        }
    };

    return (
        <div>
            <h1>Book a Table</h1>
            <BookingForm
                availableTimes={availableTimes}
                dispatch={dispatch}
                submitForm={submitForm}
            />
        </div>
    );
};

export default BookingPage;