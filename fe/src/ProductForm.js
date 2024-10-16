import React, { useState } from 'react'
import './css/Home.css';
import { Button } from 'react-bootstrap';

function ProductForm() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

    async function addProduct() {
        let item = { name, price };
        let result = await fetch("http://localhost:8000/api/addProduct", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        setMessage(result.message);
        setErrors(result.errors);
    }

  return (
    <div>
        <h2>Product Form</h2>
      {errors ? (
        <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key} style={{color: "red"}}> {errors[key][0]} </p>
          ))}
        </div>
      ) : (
        <div>
            <p>{message}</p>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <div style={{ width: "400px"}}>
          <input
            type="text"
            placeholder='product'
            className='form-control'
            onChange={(e) => setName(e.target.value)}
          /><br />
          <input
            type="float"
            placeholder='price'
            className='form-control'
            onChange={(e) => setPrice(e.target.value)}
          /><br />
          <Button onClick={addProduct} className="regularGreenBtn">Add Product</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductForm