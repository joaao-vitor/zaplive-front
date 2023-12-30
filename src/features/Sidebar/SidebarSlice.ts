import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
    collapsed: boolean;
}
const initialState: SidebarState = {
    collapsed: false,
};
export const sideBarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleCollapse: (state) => {
            state.collapsed = !state.collapsed;
        },
        collapse: (state) => {
            state.collapsed = true;
        },
        expand: (state) => {
            state.collapsed = false;
        },
    },
});

export const { toggleCollapse, collapse, expand } = sideBarSlice.actions;

export default sideBarSlice.reducer;
