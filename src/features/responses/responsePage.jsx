import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';

const ResponsePage = () => {
  const responses = useSelector(state => state.responses.data);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Responses</h2>
      {responses.map((res, idx) => (
        <Card key={idx} className="mb-4">
          <CardContent>
            <Typography>{JSON.stringify(res)}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResponsePage;
