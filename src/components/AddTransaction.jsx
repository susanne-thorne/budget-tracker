import { useTransactionsDispatch, useSetBalance } from '../context/BudgetContext.jsx';
import { useState } from 'react';

export default function AddTransaction({ value, balance }) {
  const dispatch = useTransactionsDispatch();
  const setBalance = useSetBalance();
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!amount) {
      setError("Amount is required");
    } else if (isNaN(+amount)) {
      setError("Amount must be a number");
    } else if (value === "expense" && balance - +amount < 0) {
      setError("You don't have enough funds");
    } else if (!date) {
      setError("Please select a date");
    } else {
      dispatch({
        type: "added_transaction",
        id: nextId++,
        date: date,
        amount: +amount,
        description: description,
        transactionType: value,
    })
      setBalance(value === "income" ? balance + +amount : balance - +amount);
      setError("");
      setDate("");
      setShowPopup(false);
    }
  };

  return (
    <>
      <button onClick={() => {
        setShowPopup(true);
      }}>
        {value === "income" ? "+" : "-"}
      </button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add an {value}</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input 
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input 
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
             {error && <p className="error-text">{error}</p>}
            <button onClick={() => {
              handleSubmit(amount);
            }}>
              Add
            </button>
            <button onClick={() => {
              setShowPopup(false);
              setError("");
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

let nextId = 0;