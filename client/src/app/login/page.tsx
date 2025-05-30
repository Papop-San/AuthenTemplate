'use client';

import React from 'react';
import { Container, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          component="h1"
          variant={isMobile ? 'h5' : 'h4'}
          textAlign="center"
          gutterBottom
          fontWeight="bold"
          color="primary.main"
        >
          Welcome Back
        </Typography>

        <LoginForm />
      </Paper>
    </Container>
  );
}
