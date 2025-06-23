import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';

const TakeSurvey = () => {
  const { surveyId } = useParams(); // Unique survey ID from URL
  const [surveyData, setSurveyData] = useState(null);
  const [responses, setResponses] = useState({});
  const [surveyLink, setSurveyLink] = useState('');

  // Simulate fetching survey by ID
  useEffect(() => {
    const dummySurvey = {
      title: 'Customer Satisfaction Survey',
      questions: [
        { id: 1, text: 'How satisfied are you with our service?', type: 'text' },
        { id: 2, text: 'Rate our product:', type: 'rating', options: ['Excellent', 'Very Good', 'Good', 'Neutral', 'Bad'] },
        { id: 3, text: 'What features do you like?', type: 'multiple', options: ['Ease of Use', 'Customer Support', 'Pricing'] }
      ]
    };
    setSurveyData(dummySurvey);
  }, [surveyId]);

  const handleChange = (qId, value) => {
    setResponses(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    console.log('Survey responses:', responses);
    alert('Thank you for submitting the survey!');
  };

  const generateLink = () => {
  const link = `${window.location.origin}/survey/${surveyId}`; // strictly points to SurveyDisplay.jsx route
  setSurveyLink(link);
};

  const copyLink = () => {
    if (surveyLink) {
      navigator.clipboard.writeText(surveyLink);
      alert('Survey link copied to clipboard!');
    } else {
      alert('Please generate a link first!');
    }
  };

  const shareLink = () => {
    if (!surveyLink) {
      alert('Please generate a link first!');
      return;
    }
    if (navigator.share) {
      navigator.share({
        title: 'Survey Link',
        text: 'Please take this survey:',
        url: surveyLink,
      });
    } else {
      alert('Share feature not supported on this browser.');
    }
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
      <Card sx={{
        width: { xs: '90%', sm: 600 },
        bgcolor: 'white',
        borderRadius: 5,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        p: 3
      }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
            {surveyData ? surveyData.title : 'Loading Survey...'}
          </Typography>

          {/* Survey Link Section */}
          <Typography variant="h6" sx={{ mb: 1, color: '#333' }}>Collect Responses</Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={generateLink}
            sx={{
              mb: 2,
              py: 1.2,
              borderRadius: 3,
              background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { background: 'linear-gradient(to right, #4A00E0, #8E2DE2)' },
            }}
          >
            Generate Survey Link
          </Button>

          <TextField
            fullWidth
            label="Survey Link"
            value={surveyLink}
            placeholder="Your survey link will appear here"
            InputProps={{ readOnly: true }}
            sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Copy this link and share it with your respondents.
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            onClick={copyLink}
            sx={{
              mb: 1,
              py: 1,
              borderRadius: 3,
              borderColor: '#8E2DE2',
              color: '#8E2DE2',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#f3e5f5' },
            }}
          >
            Copy Link
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={shareLink}
            sx={{
              mb: 3,
              py: 1,
              borderRadius: 3,
              borderColor: '#ff5e62',
              color: '#ff5e62',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#ffe5e5' },
            }}
          >
            Share Link
          </Button>

          {/* Survey Question Section */}
          {surveyData ? (
            <>
              {surveyData.questions.map((q) => (
                <Box key={q.id} sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 1 }}>{q.text}</Typography>
                  {q.type === 'text' && (
                    <TextField
                      fullWidth
                      placeholder="Your answer"
                      value={responses[q.id] || ''}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}
                  {q.type === 'rating' && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {q.options.map((opt, idx) => (
                        <Button
                          key={idx}
                          variant={responses[q.id] === opt ? 'contained' : 'outlined'}
                          onClick={() => handleChange(q.id, opt)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </Box>
                  )}
                  {q.type === 'multiple' && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {q.options.map((opt, idx) => (
                        <Button
                          key={idx}
                          variant={(responses[q.id] || []).includes(opt) ? 'contained' : 'outlined'}
                          onClick={() => {
                            const prev = responses[q.id] || [];
                            const newSelection = prev.includes(opt)
                              ? prev.filter(item => item !== opt)
                              : [...prev, opt];
                            handleChange(q.id, newSelection);
                          }}
                        >
                          {opt}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  background: 'linear-gradient(to right, #43cea2, #185a9d)',
                  fontWeight: 'bold',
                  '&:hover': { background: 'linear-gradient(to right, #185a9d, #43cea2)' }
                }}
                onClick={handleSubmit}
              >
                Submit Survey
              </Button>
            </>
          ) : (
            <Typography>Loading survey...</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TakeSurvey;
