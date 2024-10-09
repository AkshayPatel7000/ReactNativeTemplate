import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authToken: '',
  userData: {},
  userProfile: {},
  departments: [],
  designation: [],
  received_OTP: '',
  isStaff: false,
  registrationFlow: {
    isMember: false,
    mobile: '',
    otp: '',
    name: '',
    email: '',
    building: '',
    flatNo: '',
    FloorNo: '',
    userType: '',
  },
};

const slice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setDesignation: (state, action) => {
      state.designation = action.payload;
    },
    setRegistrationFlow: (state, action) => {
      state.registrationFlow = {...state.registrationFlow, ...action.payload};
    },
    setReceivedOtp: (state, action) => {
      state.received_OTP = action.payload;
    },
    setIsStaff: (state, action) => {
      state.isStaff = action.payload;
    },
  },
});

export const {
  setAuthToken,
  setUserProfile,
  setDepartments,
  setDesignation,
  setRegistrationFlow,
  setReceivedOtp,
  setIsStaff,
} = slice.actions;

export default slice.reducer;

export const selectAuthToken = state => state.AuthSlice.authToken;
export const selectUserData = state => state.AuthSlice.userData;
export const selectUserProfile = state => state.AuthSlice.userProfile;
export const selectDepartments = state => state.AuthSlice.departments;
export const selectDesignation = state => state.AuthSlice.designation;
export const selectRegistrationFlow = state => state.AuthSlice.registrationFlow;
export const selectRECEIVED_OTP = state => state.AuthSlice.received_OTP;
export const selectIsStaff = state => state.AuthSlice.isStaff;
