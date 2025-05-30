'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { login } from '@/service/auth.service'; 

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(identifier, password); 

      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      router.push('/dashboard');
    } catch (error: any) {
      setErrorMessage(error.message || 'Login failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: isMobile ? '90vw' : 400,
          mx: 'auto',
        }}
      >
        <TextField
          label="Username or Email"
          type="string"
          required
          fullWidth
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="email"
        />

        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={3}
          color="text.secondary"
        >
          Don't have an account?{' '}
          <a
            href="#"
            style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
          >
            Sign Up
          </a>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
