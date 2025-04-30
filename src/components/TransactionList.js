import React from 'react';

function TransactionList({ transactions, onDeleteTransaction }) {
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Danh sách giao dịch</h2>
      </div>
      <div className="border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          {transactions.length === 0 ? (
            <div className="px-4 py-5 sm:px-6 text-center text-gray-500">
              Chưa có giao dịch nào
            </div>
          ) : (
            transactions.map(transaction => (
              <div key={transaction.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                      <span className="text-sm text-gray-500">•</span>
                      <p className="text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'expense' ? '-' : '+'}
                      {transaction.amount.toLocaleString('vi-VN')}đ
                    </p>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Tổng thu</p>
            <p className="text-lg font-bold text-green-600">
              +{totalIncome.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Tổng chi</p>
            <p className="text-lg font-bold text-red-600">
              -{totalExpenses.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-2">
            <p className="text-sm font-medium text-gray-900">Số dư</p>
            <p className={`text-lg font-bold ${
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {balance >= 0 ? '+' : ''}{balance.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionList; 