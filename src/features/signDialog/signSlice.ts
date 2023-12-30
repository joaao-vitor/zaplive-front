import { createSlice } from '@reduxjs/toolkit';

interface SignState {
    open: boolean;
    form: string;
}
const initialState: SignState = {
    open: false,
    form: 'signIn',
};
export const signSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {
        toggleOpen: (state) => {
            if(state.open)
                state.form = 'signIn';
            state.open = !state.open;
        },
        toggleForm: (state) => {
            state.form = state.form === 'signIn' ? 'signUp' : 'signIn';
        },
    },
});

export const { toggleForm, toggleOpen } = signSlice.actions;

export default signSlice.reducer;
