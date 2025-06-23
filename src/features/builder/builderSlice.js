import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  surveys: {},
  currentSurveyId: null,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addSurvey: (state, action) => {
      const { id, title, questions } = action.payload;
      state.surveys[id] = { id, title, questions };
      state.currentSurveyId = id;
    },
    addQuestion: (state, action) => {
      const question = action.payload;
      const surveyId = state.currentSurveyId;
      if (surveyId) {
        state.surveys[surveyId].questions.push(question);
      }
    },
    reorderQuestions: (state, action) => {
      const surveyId = state.currentSurveyId;
      if (surveyId) {
        state.surveys[surveyId].questions = action.payload;
      }
    },
    resetBuilder: () => initialState,
  },
});

export const { addSurvey, addQuestion, reorderQuestions, resetBuilder } = builderSlice.actions;
export default builderSlice.reducer;
