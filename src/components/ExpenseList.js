import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
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
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-500">
                        {expense.date}
                      </p>
                      <span className="text-sm text-gray-500">•</span>
                      <p className="text-sm text-gray-500">
                        {expense.category}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                    <p className="text-sm font-medium text-indigo-600">
                      {expense.amount.toLocaleString('vi-VN')}đ
                    </p>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
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
  );
}

export default ExpenseList; 