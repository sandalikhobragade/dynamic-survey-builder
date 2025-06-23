import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const QuestionCard = ({ question }) => (
  <Card className="my-2 shadow-xl">
    <CardContent>
      <Typography variant="h6">{question.title}</Typography>
      <Typography variant="caption" color="textSecondary">{question.type}</Typography>
    </CardContent>
  </Card>
);

export default QuestionCard;
