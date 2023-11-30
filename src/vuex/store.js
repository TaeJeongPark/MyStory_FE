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
            state.userData = data;          // 사용자 정보
        },
        setRecordData(state, data) {
            state.recordData = data;        // 이력서 정보
        },
        setGrowthData(state, data) {
            state.growthData = data;        // 성장 과정 정보
        },
        setReasonData(state, data) {
            state.reasonData = data;        // 지원 동기 정보
        },
        setMeritFaultData(state, data) {
            state.meritFaultData = data;    // 성격의 장단점 정보
        },
        setAspirationData(state, data) {
            state.aspirationData = data;    // 입사 후 포부 정보
        }
    },
});