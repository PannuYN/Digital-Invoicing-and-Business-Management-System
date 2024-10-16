import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './css/Products.css';
import "./css/Main.css";

function WalletApp() {
    const [balance, setBalance] = useState(0);
    const [passcode, setPasscode] = useState('');
    const [showPasscodeInput, setShowPasscodeInput] = useState(false);
    const [filledId, setFilledId] = useState(0);
    const [filledAmount, setFilledAmount] = useState(0.0);
    const location = useLocation();
    //const amount = new URLSearchParams(location.search).get('amount');
    const { amount } = useParams();
    const { id } = useParams();
    console.log(amount);
    const navigate = useNavigate();

    // Function to fetch balance from the backend
    const fetchBalance = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/balance');
            if (!response.ok) {
                throw new Error('Failed to fetch balance');
            }
            const data = await response.json();
            setBalance(data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    // Fetch initial balance on component mount
    useEffect(() => {
        fetchBalance();
    }, []);

    // Toggle passcode input display
    const togglePasscodeInput = () => {
        setShowPasscodeInput(!showPasscodeInput);
    };

    // Function to handle payment
    const handlePay = async () => {
        if (passcode.length !== 6) {
            alert('Please enter a six-digit passcode');
            return;
        }
        //const otherAccountId = '123456789'; // Replace with the other account ID
        //const amount = 50; // Replace with the amount to transfer
        try {
            // Perform payment only if passcode is correct
            // Replace '123456' with the correct passcode
            if (passcode === '123456') {
                const response = await fetch('http://localhost:8000/api/pay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: filledId,
                        amount: filledAmount,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Payment failed');
                }
                const data = await response.json();
                console.log(data.message);
                setBalance(data.new_balance);
            } else {
                alert('Incorrect passcode. Payment failed.');
            }
        } catch (error) {
            console.error('Error paying:', error);
        }
        setShowPasscodeInput(false); // Hide passcode input after payment
        setPasscode(''); // Clear passcode
    };

    const handlePasscodeInput = (digit) => {
        if (passcode.length < 6) {
            setPasscode(passcode + digit);
        }
    };

    const clearPasscode = () => {
        setPasscode('');
    };

    const handleSubmit = () => {
        if (passcode === '123456') {
            // Send payment request with the amount and passcode
            fetch('http://localhost:8000/api/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    id: parseInt(id),
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Payment failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    alert(data.message);
                    // Redirect back to the home page after successful payment
                    navigate(`/wallet`);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error paying:', error);
                });
        }
        else {
            alert('Incorrect passcode. Payment failed.');
        }
    };

    return (
        <div>
            <h1>Wallet App</h1>
            <h2>Balance: ${balance}</h2>
            {amount ? (<div>
                <p>Enter passcode to complete payment of ${amount}</p>

                <div>
                    <input type="password" value={passcode} disabled />
                    <br />
                    <button className='regularGreenBtn' onClick={() => handlePasscodeInput('1')}>1</button>
                    <button className='regularGreenBtn' onClick={() => handlePasscodeInput('2')}>2</button>
                    <button className='regularGreenBtn' onClick={() => handlePasscodeInput('3')}>3</button>
                    <br />
                    <button className='regularGreenBtn' onClick={() => handlePasscodeInput('4')}>4</button>
                    <button className='regularGreenBtn' onClick={() => handlePasscodeInput('5')}>5</button>
                    <button className='regularGreenBtn' onClick={() => handlePasscodeInput('6')}>6</button>
                    <br />
                    <button className='regularGreenBtn' onClick={clearPasscode}>Clear</button>
                    <button className='regularGreenBtn' onClick={handleSubmit}>Submit</button>
                </div></div>)
                : (
                    <div>
                        <label>
                            Amount:
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setFilledAmount(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Invoice Id:
                            <input
                                type="number"
                                value={id}
                                onChange={(e) => setFilledId(e.target.value)}
                            />
                        </label>
                        {showPasscodeInput ? (
                            <div>
                                <input type="password" value={passcode} disabled />
                                <br />
                                <button onClick={() => handlePasscodeInput('1')}>1</button>
                                <button onClick={() => handlePasscodeInput('2')}>2</button>
                                <button onClick={() => handlePasscodeInput('3')}>3</button>
                                <br />
                                <button onClick={() => handlePasscodeInput('4')}>4</button>
                                <button onClick={() => handlePasscodeInput('5')}>5</button>
                                <button onClick={() => handlePasscodeInput('6')}>6</button>
                                <br />
                                <button onClick={clearPasscode}>Clear</button>
                                <button onClick={togglePasscodeInput}>Cancel</button>
                                <button onClick={handlePay}>Submit</button>
                            </div>
                        )
                            : (
                                <button onClick={togglePasscodeInput}>Pay</button>
                            )}
                    </div>
                )}
        </div>
    );
}

export default WalletApp;
