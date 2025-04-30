import React from 'react';

function Statistics({ expenses }) {
  // Tính tổng chi tiêu theo danh mục
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Tính tổng chi tiêu theo tháng
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = expense.date.split('/')[1];
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Tính tổng chi tiêu
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Thống kê</h2>
      
      <div className="space-y-6">
        {/* Tổng chi tiêu */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Tổng chi tiêu</h3>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">
            {totalExpenses.toLocaleString('vi-VN')}đ
          </p>
        </div>

        {/* Chi tiêu theo danh mục */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Chi tiêu theo danh mục</h3>
          <div className="space-y-2">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category}</span>
                <span className="text-sm font-medium text-indigo-600">
                  {amount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chi tiêu theo tháng */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Chi tiêu theo tháng</h3>
          <div className="space-y-2">
            {Object.entries(monthlyTotals).map(([month, amount]) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tháng {month}</span>
                <span className="text-sm font-medium text-indigo-600">
                  {amount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics; 