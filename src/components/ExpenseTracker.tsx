import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  userId: string;
}

const ExpenseTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const transactionsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Transaction[];
    setTransactions(transactionsData);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !auth.currentUser) return;

    const newTransaction = {
      type,
      amount: Number(amount),
      description,
      date: new Date().toISOString(),
      userId: auth.currentUser.uid
    };

    try {
      await addDoc(collection(db, 'transactions'), newTransaction);
      setAmount('');
      setDescription('');
      fetchTransactions();
    } catch (error) {
      console.error('Lỗi thêm giao dịch:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      fetchTransactions();
    } catch (error) {
      console.error('Lỗi xóa giao dịch:', error);
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý thu chi
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tổng số dư: {balance.toLocaleString('vi-VN')} VNĐ
        </Typography>
        <Typography variant="subtitle1" color="success.main">
          Tổng thu: {totalIncome.toLocaleString('vi-VN')} VNĐ
        </Typography>
        <Typography variant="subtitle1" color="error.main">
          Tổng chi: {totalExpense.toLocaleString('vi-VN')} VNĐ
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleAddTransaction}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Số tiền"
              type="number"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              required
            />
            <TextField
              label="Mô tả"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              required
            />
            <Button
              variant={type === 'income' ? 'contained' : 'outlined'}
              color="success"
              onClick={() => setType('income')}
            >
              Thu
            </Button>
            <Button
              variant={type === 'expense' ? 'contained' : 'outlined'}
              color="error"
              onClick={() => setType('expense')}
            >
              Chi
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Thêm
            </Button>
          </Box>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="right">Số tiền</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>
                  {transaction.type === 'income' ? 'Thu' : 'Chi'}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align="right">
                  {transaction.amount.toLocaleString('vi-VN')} VNĐ
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExpenseTracker; 