import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  IconButton,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const categories = [
  'Business',
  'Marketing',
  'Research',
  'News',
  'Sales',
  'Devops',
  'Other',
];

const MessageBubble = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '24px',
  border: '1px solid #E4E7EB',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& img': {
    width: '24px',
    height: '24px',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F9FA',
  borderRadius: '16px',
  padding: '16px',
  marginTop: '24px',
  border: '1px solid #E4E7EB',
}));

const InputField = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '16px',
  marginTop: '12px',
  border: '1px solid #E4E7EB',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '& textarea': {
    flex: 1,
    border: 'none',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: '1rem',
    '&::placeholder': {
      color: theme.palette.text.secondary,
    },
  },
}));

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  borderRadius: '16px',
  padding: '4px 8px',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
}));

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  border: '1px solid #E4E7EB',
  backgroundColor: '#fff',
  '&:hover': {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('Business');

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 2 }}>
      <MessageBubble>
        <img src="/proxy-icon.png" alt="Proxy" />
        <Typography variant="body1" color="text.secondary">
          Proxy is seeing lots of love right now! Things might take a moment, but we're scaling up. Thanks for being part of the journey! 🚀
        </Typography>
      </MessageBubble>

      <Typography variant="h1" sx={{ 
        fontSize: '2.5rem',
        color: '#00A783',
        textAlign: 'center',
        mb: 4,
      }}>
        Greetings, Sanket
      </Typography>

      <InputContainer>
        <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
          What online tasks or research would you like Proxy to do for you?
        </Typography>
        
        <InputField>
          <textarea
            placeholder="Type your request here..."
            rows={1}
          />
          <IconButton sx={{ 
            backgroundColor: 'primary.light',
            '&:hover': { backgroundColor: 'primary.main' },
          }}>
            <AutorenewIcon />
          </IconButton>
          <IconButton sx={{ 
            backgroundColor: 'primary.light',
            '&:hover': { backgroundColor: 'primary.main' },
          }}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </InputField>
      </InputContainer>

      <Box sx={{ 
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        my: 3,
        justifyContent: 'center',
      }}>
        {categories.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            selected={category === selectedCategory}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
        <Chip
          icon={<img src="/marketplace-icon.png" alt="" style={{ width: 16, height: 16 }} />}
          label="Template Marketplace"
          sx={{ ml: 'auto' }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <TaskCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <img src="/analysis-icon.png" alt="" style={{ width: 24, height: 24 }} />
            <Typography variant="h6">Company Sentiment Analysis</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">Convergence</Typography>
            <Typography variant="body2" color="text.secondary">503</Typography>
            <Chip
              label="Business"
              size="small"
              sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
            />
          </Box>
        </TaskCard>

        <TaskCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <img src="/shopify-icon.png" alt="" style={{ width: 24, height: 24 }} />
            <Typography variant="h6">Review my Shopify store</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">Convergence</Typography>
            <Typography variant="body2" color="text.secondary">355</Typography>
            <Chip
              label="Business"
              size="small"
              sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
            />
          </Box>
        </TaskCard>
      </Box>

      <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
        <Typography variant="body2">
          By messaging Proxy, you agree to our{' '}
          <Link href="#" color="primary">Terms</Link>
          {' '}and{' '}
          <Link href="#" color="primary">AI Policy</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
