import TransactionItem from './TransactionItem.jsx';
import { useTransactions } from '../context/BudgetContext.jsx';
import '../App.css';

function TransactionTable({ transactionType }) {
  const transactions = useTransactions();
  let transactionTable;
  const heading = (
    <div className="heading">
      { `${transactionType.toUpperCase()}S` }
    </div>
  )

  const transactionsPerType = transactions.filter((transaction) => transaction.type === transactionType);

  if (transactionsPerType.length === 0) {
    transactionTable = (
      <div className={transactionType}>
        {heading}
        <div className="transaction-area empty">
          <div className="empty">
           <span>No transactions yet</span>
          </div>
        </div>
      </div>
    )
  } else {
    transactionTable = (
      <div className={transactionType}>
        {heading}
        <div className="transaction-area">
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Remove</th>
              </tr>
              {
                transactions.map((transaction) => {
                if (transaction.type === transactionType) {
                  return (
                    <tr key={transaction.id}>
                      <TransactionItem 
                        transaction={transaction}
                      />
                    </tr>
                  )
                }
              })
            }
            </tbody>
          </table>
          <div className="total">
            Total: {
              transactionsPerType.reduce((sum, transaction) => {
                return sum + transaction.amount;
              }, 0)
            } AMD
          </div>
        </div>
      </div>
    )
  }

  return transactionTable;
}

export default function TransactionLists() {
  return (
    <section className="transaction-tables">
      <TransactionTable transactionType="income" />
      <TransactionTable transactionType="expense" />
    </section>
  )
}