import { createContext, useContext, useReducer, useState } from 'react';

const TransactionsContext = createContext(null);
const TransactionsDispatchContext = createContext(null);
const BalanceContext = createContext(null);
const SetBalanceContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, dispatch] = useReducer(transactionReducer, transactionList);

    return (
      <TransactionsContext value={transactions}>
        <TransactionsDispatchContext value={dispatch}>
          {children}
        </TransactionsDispatchContext>
      </TransactionsContext>
    )
}

export function BalanceProvider({ children }) {
  const transactions = useContext(TransactionsContext);
  const initialBalance = transactions.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      return balance + transaction.amount;
    } else {
      return balance - transaction.amount;
    }
  }, 0)

  const [balance, setBalance] = useState(initialBalance);

  return (
    <BalanceContext value={balance}>
      <SetBalanceContext value={setBalance}>
        { children }
      </SetBalanceContext>
    </BalanceContext>
  )
}

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function useTransactionsDispatch() {
  return useContext(TransactionsDispatchContext);
}

export function useBalance() {
  return useContext(BalanceContext);
}

export function useSetBalance() {
  return useContext(SetBalanceContext);
}

export function transactionReducer(transactions, action) {
  switch (action.type) {
    case "added_transaction" : {
      return [
        ...transactions,
        {
          id: action.id,
          date: action.date,
          amount: action.amount,
          type: action.transactionType,
          description: action.description,
        }
      ]
    }
    case "deleted_transaction" : {
      return transactions.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const transactionList = [
];