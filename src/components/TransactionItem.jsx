import { useTransactionsDispatch, useBalance, useSetBalance } from '../context/BudgetContext.jsx';

export default function TransactionItem({ transaction }) {
  const dispatch = useTransactionsDispatch();
  const balance = useBalance();
  const setBalance = useSetBalance();

  return (
    <>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.description}</td>
      <td>
        <button onClick={() => {
          dispatch({
            type: 'deleted_transaction',
            id: transaction.id
          });
          setBalance(transaction.type === "income" ? balance - transaction.amount : balance + transaction.amount)
        }}>
          ❌
        </button>
      </td>
    </>
  )
}