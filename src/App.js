import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");

  const addNewTransaction = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, description, datetime }),
    }).then((res) => {
      res.json().then((json) => {
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
            onChange={(e) => e.target.value}
          />
        </div>
        <div className='description'>
          <input
            type='text'
            placeholder='description'
            value={description}
            onChange={(e) => e.target.value}
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>New Samsung TV</div>
            <div className='description'>it was time for new tv</div>
          </div>
          <div className='right'>
            <div className='price red'>-$500</div>
            <div className='datetime'>12:48 09-08-2023</div>
          </div>
        </div>

        <div className='transaction'>
          <div className='left'>
            <div className='name'>Gig Job new website</div>
            <div className='description'>it was time for new tv</div>
          </div>
          <div className='right'>
            <div className='price green'>+$400</div>
            <div className='datetime'>12:48 09-08-2023</div>
          </div>
        </div>

        <div className='transaction'>
          <div className='left'>
            <div className='name'>Iphone</div>
            <div className='description'>it was time for new tv</div>
          </div>
          <div className='right'>
            <div className='price red'>-$900</div>
            <div className='datetime'>12:48 09-08-2023</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
