import AddTransaction from './AddTransaction.jsx';
import { useBalance } from '../context/BudgetContext.jsx';

export default function BalanceDisplay() {
  const balance = useBalance();

  return (
    <section className="display-balance">
      <h2>
        Balance: {balance} AMD
      </h2>
      <div className="add-transaction">
        <AddTransaction 
          value="income"
          balance={balance}
        />
        <AddTransaction 
          value="expense"
          balance={balance}
        />
      </div>
    </section>
  )
}