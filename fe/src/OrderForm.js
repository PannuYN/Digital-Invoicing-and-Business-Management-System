import React, { useEffect, useState } from 'react'
import Preview from './Preview';
import 'bootstrap/dist/css/bootstrap.min.css';
import InvoiceForm from './InvoiceForm';
import './css/OrderForm.css';
import './css/InvoiceForm.css';
import { Button, FormSelect } from 'react-bootstrap';
import PreviewForm from './PreviewForm';
import "./css/Main.css";

function OrderForm() {

    //fetching products from the database for combo box
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/readAllProducts'); // Replace '/api/products' with your actual endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    //console.log(products);

    //adding products in the order
    //selecting product from the combo box
    const [selectedProduct, setSelectedProduct] = useState('');
    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };
    const selectedProductId = parseInt(selectedProduct, 10);
    const selectedProductDetails = products.find(product => product.id === selectedProductId);
    const name = selectedProductDetails ? selectedProductDetails.name : '';
    const price = selectedProductDetails ? selectedProductDetails.price : '';

    //add the selected product to the order
    const [grandTotal, setGrandTotal] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [orders, setOrders] = useState([]);
    async function addProduct() {
        if (name && price && quantity && quantity !== 0) {
            const product_id = selectedProductId;
            //console.log(id);
            const total_price = parseInt(quantity, 10) * parseInt(price, 10);
            setGrandTotal(prevGrandTotal => prevGrandTotal + total_price);
            //console.log(parseInt(quantity, 10) * parseInt(price, 10));
            const newOrder = { product_id, name, price, quantity, total_price };
            setOrders(prevOrders => [...prevOrders, newOrder]);
        }
    }

    //deleting selected product from the order
    function handleDelete(index) {
        const deletedOrder = orders[index];
        const deletedTotal = deletedOrder.total;
        setGrandTotal(prevGrandTotal => prevGrandTotal - deletedTotal);
        setOrders(prevOrders => {
            const newOrders = [...prevOrders];
            newOrders.splice(index, 1); // Remove the order at the specified index
            return newOrders;
        });
    }

    //fetching clients from the database for combo box
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/readAllClients'); // Replace '/api/products' with your actual endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const [selectedClient, setSelectedClient] = useState('');
    const selectedClientId = parseInt(selectedClient, 10);
    const selectedClientDetails = clients.find(client => client.id === selectedClientId);
    const customerName = selectedClientDetails ? selectedClientDetails.name : '';
    const customerEmail = selectedClientDetails ? selectedClientDetails.email : '';
    const customerAddress = selectedClientDetails ? selectedClientDetails.address : '';
    const [shippingFee, setShippingFee] = useState('');

    //const [customerName, setCustomerName] = useState('');
    //const [customerEmail, setCustomerEmail] = useState('');
    //const [customerAddress, setCustomerAddress] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [showInvoice, setShowInvoice] = useState(false);
    function showPreview() {
        setShowInvoice(true);
    }

    return (
        <div>
            <h2 style={{ marginTop: '20px' }}>Generate Invoice</h2>
            <p>Fill in the order form to generate an order confirmation or an invoice</p>
            <div style={{ height: '30px' }} />
            <div className="main-container">
                <div className="left-div" style={{ display: 'flex', flexFlow: 'column', alignItems: 'left' }}>
                    <h3 style={{ textAlign: 'center' }}>Order Form</h3>
                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '90%', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                        <div style={{ marginTop: '20px' }}>
                            <label style={{ padding: '10px', fontWeight: 'bold' }}>Choose Client</label>
                            <FormSelect id="client-select" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                                <option value="">The mail will be sent to</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name} - {client.email}
                                    </option>
                                ))}
                            </FormSelect><br /><br />
                            <label style={{ padding: '10px', fontWeight: 'bold' }}>Issue Date - Due Date</label>
                            <input
                                type="date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                                placeholder='Issue Date'
                            /> - <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                placeholder='Due Date'
                            /><br /><br />
                            <FormSelect id="product-select" value={selectedProduct} onChange={handleProductChange}>
                                <option value="">Choose product to add</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </FormSelect>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                                <input type="text" value={name} readOnly></input>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder='quantity' style={{ width: '100px', marginRight: '10px' }}></input>
                                <Button className="regularGreenBtn" onClick={addProduct}>Add this product to order</Button>
                            </div>
                            
                            <label style={{marginRight: '10px'}}>Shipping Fee: </label>
                                <input type="text" style={{marginBottom: '10px'}} value={shippingFee} onChange={(e) => setShippingFee(e.target.value)}></input>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {<div className="invoice-details">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders && orders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.name}</td>
                                                    <td>{order.price}</td>
                                                    <td>{order.quantity}</td>
                                                    
                                                    <td>
                                                        <Button className='deleteBtn' onClick={() => handleDelete(index)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>}
                            
                            </div>

                            <Button className='regularGreenBtn' onClick={showPreview}>Show Preview</Button>
                        </div>
                    </div>
                </div>
                <div className="right-div">
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Preview</h3>
                        {showInvoice ? (
                            <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '90%', maxWidth: '800px', margin: '0 auto', marginBottom: '20px' }}>
                                <PreviewForm type="no" invoice_no={null} date={issueDate} due_date={dueDate}
                                    client_id={selectedClientId} client_name={customerName} client_add={customerAddress} client_email={customerEmail}
                                    orders={orders} shipping_fee={shippingFee} />
                                {/* <Preview customerId={selectedClientId} customerName={customerName}
                            customerEmail={customerEmail} customerAddress={customerAddress}
                            dueDate={dueDate} orders={orders} grandTotal={grandTotal}
                            /> */}
                            </div>
                        ) :
                            <div></div>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderForm