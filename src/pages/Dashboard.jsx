import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import AudienceIcon from '@mui/icons-material/Group';
import CreateIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

const Dashboard = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleGetStarted = () => {
    navigate('/builder'); // Navigate to SurveyBuilder.jsx (URL: /builder)
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 1,
          textAlign: 'center',
          color: '#fff'
        }}
      >
        Powerful features to help you succeed
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: '#f0f0f0'
        }}
      >
        Survey Central gives you the tools you need to create, distribute, and analyze surveys.
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mb: 6, maxWidth: 960 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AnalyticsIcon sx={{ fontSize: 40, color: '#4A00E0', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Analyze results
              </Typography>
              <Typography variant="body2" sx={{ color: '#5c748a' }}>
                Get real-time insights with powerful analytics and reporting.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AudienceIcon sx={{ fontSize: 40, color: '#4A00E0', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Reach your audience
              </Typography>
              <Typography variant="body2" sx={{ color: '#5c748a' }}>
                Distribute surveys via email, social media, or your website.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CreateIcon sx={{ fontSize: 40, color: '#4A00E0', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Create surveys
              </Typography>
              <Typography variant="body2" sx={{ color: '#5c748a' }}>
                Choose from a variety of templates or create your own custom survey.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
          color: '#fff'
        }}
      >
        Ready to get started?
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#fff',
          color: '#4A00E0',
          borderRadius: 2,
          paddingX: 4,
          paddingY: 1,
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
        onClick={handleGetStarted} // 🚀 Navigate to /builder
      >
        Get started
      </Button>
    </Box>
  );
};

export default Dashboard;
