import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString('vi-VN')
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý chi tiêu</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Thêm chi tiêu mới</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Nhập mô tả chi tiêu"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Số tiền</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">đ</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Thêm chi tiêu
                  </button>
                </form>
              </div>
            </div>

            {/* Expenses List Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Danh sách chi tiêu</h2>
                </div>
                <div className="border-t border-gray-200">
                  <div className="divide-y divide-gray-200">
                    {expenses.length === 0 ? (
                      <div className="px-4 py-5 sm:px-6 text-center text-gray-500">
                        Chưa có chi tiêu nào
                      </div>
                    ) : (
                      expenses.map(expense => (
                        <div key={expense.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {expense.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {expense.date}
                              </p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <p className="text-sm font-medium text-indigo-600">
                                {expense.amount.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Tổng cộng</p>
                    <p className="text-lg font-bold text-indigo-600">
                      {totalExpenses.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 