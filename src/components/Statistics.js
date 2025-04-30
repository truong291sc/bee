import React from 'react';

function Statistics({ transactions }) {
  // Tính tổng thu và chi theo danh mục
  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = { income: 0, expense: 0 };
    }
    acc[t.category][t.type] += t.amount;
    return acc;
  }, {});

  // Tính tổng thu và chi theo tháng
  const monthlyTotals = transactions.reduce((acc, t) => {
    const month = t.date.split('/')[1];
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    acc[month][t.type] += t.amount;
    return acc;
  }, {});

  // Tính tổng thu, chi và số dư
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Thống kê</h2>
      
      <div className="space-y-6">
        {/* Tổng thu chi */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Tổng thu</h3>
            <p className="mt-1 text-2xl font-semibold text-green-600">
              +{totalIncome.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800">Tổng chi</h3>
            <p className="mt-1 text-2xl font-semibold text-red-600">
              -{totalExpenses.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className={`p-4 rounded-lg ${
            balance >= 0 ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <h3 className={`text-sm font-medium ${
              balance >= 0 ? 'text-green-800' : 'text-red-800'
            }`}>Số dư</h3>
            <p className={`mt-1 text-2xl font-semibold ${
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {balance >= 0 ? '+' : ''}{balance.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>

        {/* Chi tiêu theo danh mục */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Chi tiêu theo danh mục</h3>
          <div className="space-y-2">
            {Object.entries(categoryTotals).map(([category, totals]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category}</span>
                <div className="flex space-x-4">
                  {totals.income > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      +{totals.income.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                  {totals.expense > 0 && (
                    <span className="text-sm font-medium text-red-600">
                      -{totals.expense.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chi tiêu theo tháng */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Chi tiêu theo tháng</h3>
          <div className="space-y-2">
            {Object.entries(monthlyTotals).map(([month, totals]) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tháng {month}</span>
                <div className="flex space-x-4">
                  {totals.income > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      +{totals.income.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                  {totals.expense > 0 && (
                    <span className="text-sm font-medium text-red-600">
                      -{totals.expense.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics; 