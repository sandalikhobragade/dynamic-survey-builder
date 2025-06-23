import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, reorderQuestions, addSurvey, resetBuilder } from './builderSlice';
import { Button, TextField, MenuItem, Card, CardContent, Typography, Box, IconButton, Checkbox } from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SortableItem = ({ id, question, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '16px'
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">{question.title}</Typography>
          <Box>
            <IconButton onClick={() => onDelete(id)}><Delete /></IconButton>
            <IconButton {...attributes} {...listeners}><DragHandle /></IconButton>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    type: 'text',
    options: ['', '', '', ''],
    correctOption: null
  });
  const [previewMode, setPreviewMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const surveyId = useSelector(state => state.builder.currentSurveyId);
  const survey = useSelector(state => surveyId ? state.builder.surveys[surveyId] : null);
  const questions = survey ? survey.questions : [];

  const handleAdd = () => {
    if (!surveyId) {
      const newSurveyId = Date.now().toString();
      dispatch(addSurvey({ id: newSurveyId, title: surveyTitle || 'Your Survey Title', questions: [] }));
    }
    dispatch(addQuestion({ ...newQuestion, id: Date.now() }));
    setNewQuestion({
      title: '',
      type: 'text',
      options: ['', '', '', ''],
      correctOption: null
    });
  };

  const handleDelete = (id) => {
    // Remove question with matching id
    const updatedQuestions = questions.filter(q => q.id !== id);
    dispatch(reorderQuestions(updatedQuestions));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex(q => q.id === active.id);
      const newIndex = questions.findIndex(q => q.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(questions, oldIndex, newIndex);
      dispatch(reorderQuestions(reordered));
    }
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[idx] = value;
    setNewQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const handleCorrectOption = (idx) => {
    setNewQuestion(prev => ({ ...prev, correctOption: idx }));
  };

  const handleShare = () => {
    let newSurveyId = surveyId;
    newSurveyId = Date.now().toString();
    dispatch(addSurvey({ id: newSurveyId, title: surveyTitle || 'Your Survey Title', questions }));
    navigate(`/take-survey/${newSurveyId}`);
  };

  const handleClear = () => {
    dispatch(resetBuilder());
    setSurveyTitle('');
    setNewQuestion({
      title: '',
      type: 'text',
      options: ['', '', '', ''],
      correctOption: null
    });
    setPreviewMode(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 4
    }}>
      <Card sx={{
        width: { xs: '90%', sm: 600 },
        bgcolor: 'white',
        borderRadius: 5,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        p: 3
      }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Survey Builder
          </Typography>

          <TextField
            label="Survey Title"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Question Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Type"
            value={newQuestion.type}
            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="rating">Rating (1-5)</MenuItem>
          </TextField>

          {newQuestion.type === 'multiple' && newQuestion.options.map((opt, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                sx={{ flex: 1 }}
              />
              <Checkbox
                checked={newQuestion.correctOption === idx}
                onChange={() => handleCorrectOption(idx)}
              />
            </Box>
          ))}

          {newQuestion.type === 'rating' && ['Excellent', 'Very Good', 'Good', 'Neutral', 'Bad'].map((label, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ width: '100px' }}>{label}</Typography>
              <Checkbox
                checked={newQuestion.correctOption === idx}
                onChange={() => handleCorrectOption(idx)}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={handleAdd}
          >
            Add Question
          </Button>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={questions.map(q => q.id)}
              strategy={verticalListSortingStrategy}
            >
              {questions.map((q) => (
                <SortableItem key={q.id} id={q.id} question={q} onDelete={handleDelete} />
              ))}
            </SortableContext>
          </DndContext>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 4 }}>
            <Button variant="contained" onClick={() => setPreviewMode(true)}>Preview</Button>
            <Button variant="contained" onClick={() => alert('Survey Saved!')}>Save</Button>
            <Button variant="contained" onClick={handleShare}>Share</Button>
            <Button
              variant="contained"
              onClick={handleClear}
              sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
            >
              Clear
            </Button>
          </Box>

          {previewMode && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">Preview:</Typography>
              {questions.map((q, idx) => (
                <Card key={q.id} sx={{ my: 2, p: 2 }}>
                  <Typography variant="h6">{idx + 1}. {q.title}</Typography>
                  {q.type === 'text' && <TextField label="Your Answer" fullWidth sx={{ mt: 1 }} />}
                  {q.type === 'multiple' && q.options.map((opt, idx2) => (
                    <Box key={idx2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox disabled />
                      <Typography>{opt}</Typography>
                    </Box>
                  ))}
                  {q.type === 'rating' && ['Excellent', 'Very Good', 'Good', 'Neutral', 'Bad'].map((label, idx2) => (
                    <Box key={idx2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox disabled />
                      <Typography>{label}</Typography>
                    </Box>
                  ))}
                </Card>
              ))}
              <Button variant="outlined" onClick={() => setPreviewMode(false)}>Back</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SurveyBuilder;
