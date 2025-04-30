import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (secretCode === '0978242911') {
      try {
        await signInWithEmailAndPassword(auth, 'admin@example.com', 'admin123');
      } catch (error) {
        setError('Đăng nhập thất bại');
      }
    } else {
      setError('Mã số bí mật không đúng');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Đăng nhập
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Mã số bí mật"
            variant="outlined"
            margin="normal"
            value={secretCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecretCode(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 