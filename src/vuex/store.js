// Vuex store
// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        userData: null,
        storyPageData: null,
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data;
        },
        setStoryPageData(state, data) {
            state.storyPageData = data;
        },
    },
});