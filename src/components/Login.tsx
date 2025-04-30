import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (secretCode === '0978242911') {
      try {
        const userCredential = await signInAnonymously(auth);
        console.log('Đăng nhập thành công:', userCredential.user);
      } catch (error: any) {
        console.error('Lỗi đăng nhập:', error);
        setError('Đăng nhập thất bại: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Mã số bí mật không đúng');
      setLoading(false);
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
            disabled={loading}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 