// PaymentPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const [amount, setAmount] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setId(e.target.value);
    };

    const handleSubmit = () => {
        // Redirect to WalletPage with payment amount as parameter
        navigate(`/wallet/${amount}/${id}`);
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <form>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Invoice Id:
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleSubmit}>
                    Pay
                </button>
            </form>
        </div>
    );
}

export default PaymentPage;
