import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2'];

const AnalyzePage = () => {
  const { surveyId } = useParams();
  const surveys = useSelector(state => state.builder.surveys);
  const responses = useSelector(state => state.responses.bySurvey[surveyId] || []);

  const survey = surveys[surveyId];
  if (!survey) return <Typography sx={{ p: 4 }}>Survey not found.</Typography>;

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
      <Card sx={{ width: { xs: '90%', sm: 800 }, bgcolor: 'white', borderRadius: 5, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', p: 3, maxHeight: '90vh', overflowY: 'auto' }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
            Survey Analysis: {survey.title}
          </Typography>

          {survey.questions.map((q, index) => {
            const questionResponses = responses.map(r => r[q.id]).filter(Boolean);

            if (q.type === 'multiple') {
              const counts = q.options.map(opt => ({
                name: opt,
                value: questionResponses.filter(ans => ans === opt).length,
              }));

              return (
                <Card sx={{ mb: 4 }} key={q.id}>
                  <CardContent>
                    <Typography variant="h6">{index + 1}. {q.title} (Multiple Choice)</Typography>
                    <BarChart width={500} height={300} data={counts}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </CardContent>
                </Card>
              );
            }

            if (q.type === 'text') {
              return (
                <Card sx={{ mb: 4 }} key={q.id}>
                  <CardContent>
                    <Typography variant="h6">{index + 1}. {q.title} (Text Responses)</Typography>
                    {questionResponses.map((text, idx) => (
                      <Typography key={idx}>- {text}</Typography>
                    ))}
                  </CardContent>
                </Card>
              );
            }

            if (q.type === 'rating') {
              const ratingMap = { 'Excellent': 5, 'Very Good': 4, 'Good': 3, 'Neutral': 2, 'Bad': 1 };
              const ratings = questionResponses.map(r => ratingMap[r]).filter(v => v);
              const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : 'No ratings yet';

              return (
                <Card sx={{ mb: 4 }} key={q.id}>
                  <CardContent>
                    <Typography variant="h6">{index + 1}. {q.title} (Rating)</Typography>
                    <Typography>Average Rating: {avg}</Typography>
                  </CardContent>
                </Card>
              );
            }

            return null;
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyzePage;
