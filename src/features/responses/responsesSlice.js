import { createSlice } from '@reduxjs/toolkit';

const responsesSlice = createSlice({
  name: 'responses',
  initialState: {
    bySurvey: {}, 
  },
  reducers: {
    submitResponse: (state, action) => {
      const { surveyId, answers } = action.payload;
      if (!state.bySurvey[surveyId]) {
        state.bySurvey[surveyId] = [];
      }
      state.bySurvey[surveyId].push(answers);
    }
  }
});

export const { submitResponse } = responsesSlice.actions;
export default responsesSlice.reducer;
