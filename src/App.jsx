import BalanceDisplay from './components/BalanceDisplay.jsx';
import TransactionLists from './components/TransactionLists.jsx';
import { TransactionsProvider, BalanceProvider } from './context/BudgetContext.jsx';
import './App.css';

export default function App() {
  return (
    <TransactionsProvider>
      <BalanceProvider>
        <h1>Budget Tracker</h1>
        <BalanceDisplay />
        <TransactionLists />
      </BalanceProvider>
    </TransactionsProvider>
  )
}
