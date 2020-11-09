import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'
function App() {
  const [product, setProduct] = useState({
    name:"Telefriend Video Chat Minutes",
    price: 10,
    productBy:"Telefriend"
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type":"application/json"
    }

    return fetch("http://localhost:3001/payment", {
      method:"POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      console.log('RESPONSE',res)
      const {status} = res
      console.log("STATUS", status)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
        <StripeCheckout 
          stripeKey="pk_test_51HFVOJIfXEGU7Vl4erUxgFtp1L2emkiIqSC5shYrdyHxOS0GOvlBYpEB1tUybgIAeEEiGwEzWBs9m2HlmgEYEsd300Zv3svbQs"
          token={makePayment}
          name="Buy $10 Video Chat"
          amount={product.price *  100}>
            <button className="btn-large pink">Buy 10 Minute Video Chat For ${product.price}</button>
          </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
