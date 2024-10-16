import React, { useEffect, useState } from 'react';
import './css/Home.css';
import { Button } from 'react-bootstrap';

function ProductEditForm({ productName, productPrice, productId }) {
    // Initialize state with old values
    const [name, setName] = useState(productName);
    const [price, setPrice] = useState(productPrice);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);

    async function editProduct() {
        let item = { name, price, id: productId };
        let result = await fetch("http://localhost:8000/api/editProduct", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        setMessage(result.message || "");
        setErrors(result.errors || []);
    }
    console.log(message);

    return (
        <div>
            <h2>Product Edit Form</h2>
            {errors.length > 0 ? (
                <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key} style={{ color: "red" }}>{errors[key][0]}</p>
                    ))}
                </div>
            ) : (
                <div>
                    <p>{message}</p>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                <div style={{ width: "400px" }}>
                    <input
                        type="text"
                        value={name}
                        className='form-control'
                        onChange={(e) => setName(e.target.value)}
                    /><br />
                    <input
                        type="number"
                        value={price}
                        className='form-control'
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    /><br />
                    <Button onClick={editProduct} className="regularGreenBtn">Edit Product</Button>
                </div>
            </div>
        </div>
    );
}

export default ProductEditForm;
