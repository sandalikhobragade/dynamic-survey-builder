import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { submitResponse } from '../features/responses/responsesSlice';
import { Box, Button, Card, CardContent, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const SurveyDisplay = () => {
  const { surveyId } = useParams();
  const surveys = useSelector(state => state.builder.surveys);
  const survey = surveys[surveyId];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});

  if (!survey) {
    return <Typography sx={{ p: 4 }}>Survey not found.</Typography>;
  }

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    dispatch(submitResponse({ surveyId, answers }));
    navigate(`/analyze/${surveyId}`);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 3
    }}>
      <Card sx={{ width: { xs: '90%', sm: 600 }, bgcolor: 'white', borderRadius: 5, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', p: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            {survey.title}
          </Typography>

          {survey.questions.map((q) => (
            <Box key={q.id} sx={{ mb: 2 }}>
              <Typography variant="h6">{q.title}</Typography>

              {q.type === 'text' && (
                <TextField
                  fullWidth
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  sx={{ mt: 1 }}
                />
              )}

              {q.type === 'multiple' && (
                <RadioGroup value={answers[q.id] || ''} onChange={(e) => handleChange(q.id, e.target.value)}>
                  {q.options.map((opt, idx) => (
                    <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
                  ))}
                </RadioGroup>
              )}

              {q.type === 'rating' && (
                <RadioGroup value={answers[q.id] || ''} onChange={(e) => handleChange(q.id, e.target.value)}>
                  {['Excellent', 'Very Good', 'Good', 'Neutral', 'Bad'].map((label, idx) => (
                    <FormControlLabel key={idx} value={label} control={<Radio />} label={label} />
                  ))}
                </RadioGroup>
              )}
            </Box>
          ))}

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SurveyDisplay;
