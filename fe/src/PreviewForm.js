import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/InvoiceForm.css'; // Import CSS file for styling
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./css/Main.css";

const PreviewForm = ({ type, invoice_no, date, due_date, client_id, client_name, client_add, client_email, orders, shipping_fee }) => {

    const [products, setProducts] = useState([]);
    //fetching products from the database
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

    //total
    const [allTotal, setAllTotal] = useState(0);

    useEffect(() => {
        // Calculate the total order amount
        const total = orders.reduce((acc, order) => {
            return acc + order.total_price;
        }, 0);

        // Set the total order amount to the state variable
        setAllTotal(total);
    }, [orders]);
    const grandTotal = parseFloat(allTotal) + parseFloat(shipping_fee);

    //download function
    const [loader, setLoader] = useState(false);
    const downloadPDF = () => {
        const capture = document.querySelector('.invoice-form');
        setLoader(true);
        html2canvas(capture, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Adjust as necessary
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const marginLeft = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
            const marginTop = 20; // Adjust as necessary

            doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
            setLoader(false);
            doc.save('invoice.pdf');
        })
    };
    const downloadImage = () => {
        const capture = document.querySelector('.invoice-form');
        setLoader(true);
        html2canvas(capture, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'image.png';
            link.click();
            setLoader(false);
        });
    };


    const invoice_status = "unsent";
    const created_by = localStorage.getItem('user');
    const cli_id = parseInt(client_id, 10);
    //sending mail
    const [mailErrors, setMailErrors] = useState();
    const [mailMessage, setMailMessage] = useState();
    async function sendMail() {
        const client_id = cli_id;
        const items = orders;
        const sampleMail = { client_id, items, date, due_date, shipping_fee, invoice_status, created_by };
        console.log(sampleMail)
        try {
            let result = await fetch('http://localhost:8000/api/sendMail', {
                method: 'POST',
                body: JSON.stringify(sampleMail),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setMailErrors(result["error"]);
            setMailMessage(result["message"]);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }
    } console.log(mailErrors);
    console.log(mailMessage);

    //saving order
    //const [selectedClient, setSelectedClient] = useState('');
    const [orderErrors, setOrderErrors] = useState();
    const [orderMessage, setOrderMessage] = useState();
    async function saveOrder() {
        const client_id = cli_id;
        const items = orders;
        const sampleMail = { client_id, items, date, due_date, shipping_fee, invoice_status, created_by };
        console.log(sampleMail)
        try {
            let result = await fetch('http://localhost:8000/api/addOrder', {
                method: 'POST',
                body: JSON.stringify(sampleMail),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setOrderErrors(result["error"]);
            setOrderMessage(result["message"]);
        } catch (error) {
            console.error('Error saving order:', error);
            // Handle error appropriately, e.g., set error state
        }
    }

    return (
        <div>
            <div className="invoice-form flex-column">
                <div className='information'>
                    {type === "no" ? (
                        <h1 style={{ fontWeight: 'bold', marginTop: '20px' }}>Order Confirmation</h1>
                    ) : (
                        <h1 style={{ fontWeight: 'bold', marginTop: '20px' }}>Invoice</h1>
                    )}
                    <div style={{ height: '20px' }}></div>

                    <div className="first-right">
                        <div style={{ fontWeight: 'bold' }}>Savannah. Clothing</div>
                        <div style={{ fontSize: 'small' }}>Yangon, Myanmar</div>
                        <div style={{ fontSize: 'small', fontStyle: 'underline' }}>09-837253889</div>
                        <a href="#" style={{ fontSize: 'small', fontStyle: 'underline' }}>savannahclothing.mm@hotmail.com</a>

                    </div>

                    <div className="second-left">
                        <h5>Billed to:</h5>
                        <div>{client_name}</div>
                        <div>{client_add}</div>
                        <div>{client_email}</div>

                    </div>

                    <div className="second-right">
                        <div style={{ height: '50px' }}></div>
                        <div className="invoice-info">
                            <span className="label">Invoice No:</span>
                            <span className="value">{invoice_no}</span>
                        </div>
                        <div className="invoice-info">
                            <span className="label">Date:</span>
                            <span className="value">{date}</span>
                        </div>
                        <div className="invoice-info">
                            <span className="label">Due:</span>
                            <span className="value">{due_date}</span>
                        </div>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#a4dcd5' }}>No</th>
                            <th style={{ backgroundColor: '#a4dcd5' }}>Product</th>
                            <th style={{ backgroundColor: '#a4dcd5' }}>Price</th>
                            <th style={{ backgroundColor: '#a4dcd5' }}>Quantity</th>
                            <th style={{ backgroundColor: '#a4dcd5' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{products.find(product => product.id === order.product_id)?.name}</td>
                                <td>{products.find(product => product.id === order.product_id)?.price}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total_price}</td>
                            </tr>
                        ))}
                        <tr >
                            <td colSpan={3} style={{ borderBottom: 'none' }}></td>
                            <td style={{ fontWeight: 'bold', backgroundColor: '#a4dcd5' }}>Total</td>
                            <td style={{ backgroundColor: '#a4dcd5' }}>{allTotal}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{ borderBottom: 'none' }}></td>
                            <td style={{ fontWeight: 'bold', backgroundColor: '#a4dcd5' }}>Shipping Fee</td>
                            <td style={{ backgroundColor: '#a4dcd5' }}>{shipping_fee}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="total-section">
                    <hr className="divider" />
                    <div className="grand-total" style={{ display: 'inline-block' }}>
                        <h4 style={{ display: 'inline', fontWeight: 'bold' }}>Grand Total:  </h4>
                        <h5 style={{ display: 'inline' }}>{grandTotal}</h5>
                        <h5 style={{ display: 'inline' }}> Ks</h5>
                    </div>
                </div>
            </div>


            <div style={{ marginBottom: '20px', marginRight: '20px', textAlign: 'right', display: 'flex', flexFlow: 'row', alignItems: 'right', justifyContent: "flex-end" }}>
                <Button onClick={saveOrder} className='regularGreenBtn' style={{ width: '110px', marginRight: '10px' }}>Save Order</Button>
                <Button onClick={sendMail} className='regularGreenBtn' style={{ width: '100px', marginRight: '10px' }}>Send Mail</Button>
                <DropdownButton variant='success' title="Download" >
                    <Dropdown.Item onClick={downloadPDF}>Download PDF</Dropdown.Item>
                    <Dropdown.Item onClick={downloadImage}>Download Image</Dropdown.Item>
                </DropdownButton>
                {loader ? (
                    <span>Downloading...</span>
                ) : (
                    <span></span>
                )}
            </div>

            {
                mailErrors ? (<div className='alert'>

                    <p style={{ color: 'red' }}> {mailErrors} </p>

                </div>)
                    :
                    (
                        mailMessage && <div>
                            <p style={{ color: 'green' }}>{mailMessage}</p>
                        </div>
                    )
            }
            {
                orderErrors ? (<div className='alert'>

                    <p style={{ color: 'red' }}> {orderErrors} </p>

                </div>)
                    :
                    (
                        orderMessage && <div>
                            <p style={{ color: 'green' }}>{orderMessage}</p>
                        </div>
                    )
            }

        </div>
    );
};

export default PreviewForm;
