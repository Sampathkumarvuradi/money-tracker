import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  const getTransactions = async () => {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  };
  const addNewTransaction = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    }).then((res) => {
      res.json().then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        console.log("result", json);
      });
    });
  };

  return (
    <main>
      <h1>
        $400 <span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='+200 new samsung tv'
          />
          <input
            type='datetime-local'
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className='description'>
          <input
            type='text'
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className='transaction'>
              <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='description'>{transaction.description}</div>
              </div>
              <div className='right'>
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className='datetime'>12:48 09-08-2023</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
