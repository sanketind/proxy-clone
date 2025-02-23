import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Alert,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { supabase } from '../../config/supabase';

const AuthContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)', // Adjust based on your navbar height
  padding: theme.spacing(3),
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const FormField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  textTransform: 'none',
}));

function Auth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = isSignUp
        ? await supabase.auth.signUp({
            email,
            password,
          })
        : await supabase.auth.signInWithPassword({
            email,
            password,
          });

      if (error) throw error;

      if (isSignUp && data?.user) {
        // Show success message for sign up
        setError({
          type: 'success',
          message: 'Registration successful! Please check your email for verification.',
        });
      } else {
        // Redirect on successful sign in
        navigate('/dashboard');
      }
    } catch (error) {
      setError({
        type: 'error',
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthPaper elevation={2}>
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={isSignUp ? 1 : 0}
            onChange={(_, value) => {
              setIsSignUp(value === 1);
              setError(null);
            }}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>

        {error && (
          <Alert
            severity={error.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setError(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleAuth}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <AuthButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading
                ? 'Processing...'
                : isSignUp
                ? 'Create Account'
                : 'Sign In'}
            </AuthButton>
          </Box>
        </form>

        <Typography variant="body2" color="text.secondary" align="center">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <Button
            color="primary"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            sx={{ textTransform: 'none' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </Typography>
      </AuthPaper>
    </AuthContainer>
  );
}

export default Auth;
