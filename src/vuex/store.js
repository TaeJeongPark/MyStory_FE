// Vuex store
// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        userId : null,
        growthData : null,
        reasonData : null,
        meritFaultData : null,
        aspirationData : null,
        imgUrl: null,
        imgBlob : null,
        imgByte : null,
        imgType : null,
        desireJob : null,
        name : null,
        birthday : null,
        email : null,
        phone : null,
        address : null,
        military : null,
        introduction : null,
        school : null,
        certificate : null,
        education : null,
        award : null,
        career : null,
        activity : null,
        languages : null,
        frameworkLibrary : null,
        server : null,
        toolDevops : null,
        environment : null,
        etc : null,
    },
    mutations: {
        setUserId(state, data) {
            state.userId = data;          // 사용자 정보
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
        },
        setImgUrl(state, data) {
            state.imgUrl = data;            // 이미지 URL
        },
        setImgBlob(state, data) {
            state.imgBlob = data;           // 이미지 Blob
        },
        setImgByte(state, data) {
            state.imgByte = data;           // 이미지 Byte
        },
        setImgType(state, data) {
            state.imgType = data;           // 이미지 Type
        },
        setDesireJob(state, data) {
            state.desireJob = data;         // 희망 직무
        },
        setName(state, data) {
            state.name = data;              // 이름
        },
        setBirthday(state, data) {
            state.birthday = data;          // 생년월일
        },
        setEmail(state, data) {
            state.email = data;             // 이메일
        },
        setPhone(state, data) {
            state.phone = data;             // 휴대폰 번호
        },
        setAddress(state, data) {
            state.address = data;           // 주소
        },
        setMilitary(state, data) {
            state.military = data;          // 병역사항
        },
        setIntroduction(state, data) {
            state.introduction = data;      // 자기소개
        },
        setSchool(state, data) {
            state.school = data;            // 학력
        },
        setCertificate(state, data) {
            state.certificate = data;       // 자격증
        },
        setEducation(state, data) {
            state.education = data;         // 교육
        },
        setAward(state, data) {
            state.award = data;             // 수상
        },
        setCareer(state, data) {
            state.career = data;            // 경력
        },
        setActivity(state, data) {
            state.activity = data;          // 활동
        },
        setLanguages(state, data) {
            state.languages = data;         // 사용 언어
        },
        setFrameworkLibrary(state, data) {
            state.frameworkLibrary = data;  // 프레임워크/라이브러리
        },
        setServer(state, data) {
            state.server = data;            // 서버
        },
        setToolDevops(state, data) {
            state.toolDevops = data;        // 도구/DevOps
        },
        setEnvironment(state, data) {
            state.environment = data;       // 개발 환경
        },
        setEtc(state, data) {
            state.etc = data;               // 기타
        },
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        getGrowthData(state) {
            return state.growthData;
        },
        getReasonData(state) {
            return state.reasonData;
        },
        getMeritFaultData(state) {
            return state.meritFaultData;
        },
        getAspirationData(state) {
            return state.aspirationData;
        },
        getImgUrl(state) {
            return state.imgUrl;
        },
        getImgBlob(state) {
            return state.imgBlob;
        },
        getImgByte(state) {
            return state.imgByte;
        },
        getImgType(state) {
            return state.imgType;
        },
        getDesireJob(state) {
            return state.desireJob;
        },
        getName(state) {
            return state.name;
        },
        getBirthday(state) {
            return state.birthday;
        },
        getEmail(state) {
            return state.email;
        },
        getPhone(state) {
            return state.phone;
        },
        getAddress(state) {
            return state.address;
        },
        getMilitary(state) {
            return state.military;
        },
        getIntroduction(state) {
            return state.introduction;
        },
        getSchool(state) {
            return state.school;
        },
        getCertificate(state) {
            return state.certificate;
        },
        getEducation(state) {
            return state.education;
        },
        getAward(state) {
            return state.award;
        },
        getCareer(state) {
            return state.career;
        },
        getActivity(state) {
            return state.activity;
        },
        getLanguages(state) {
            return state.languages;
        },
        getFrameworkLibrary(state) {
            return state.frameworkLibrary;
        },
        getServer(state) {
            return state.server;
        },
        getToolDevops(state) {
            return state.toolDevops;
        },
        getEnvironment(state) {
            return state.environment;
        },
        getEtc(state) {
            return state.etc;
        },
    },
});