import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Preview({ customerId, customerName, customerEmail, customerAddress, dueDate, orders, grandTotal }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const [loader, setLoader] = useState(false);
    const downloadPDF = () => {
        const capture = document.querySelector('.receipt');
        setLoader(true);
        html2canvas(capture, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Adjust as necessary
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const marginLeft = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
            const marginTop = 10; // Adjust as necessary

            doc.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
            setLoader(false);
            doc.save('invoice.pdf');
        })
    };
    const downloadImage = () => {
        const capture = document.querySelector('.receipt');
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

    //sending mail
    const [mailErrors, setMailErrors] = useState();
    const [mailMessage, setMailMessage] = useState();
    async function sendMail() {
        const client_id = customerId;
        const items = orders;
        const sampleMail = { client_id, items };
        console.log(sampleMail);
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
            setMailErrors(result["errors"]);
            setMailMessage(result["message"]);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }
    }

    return (
        <div>
        <div className="invoice-container receipt">
            
                <div className="invoice-header">
                    <h2>Invoice</h2>
                    <div className="invoice-info">
                        <p>Invoice Number: 00<br />
                        Date: {formattedDate}</p>
                    </div>
                </div>
                <div> 
                    <p className='invoice-info'>billed to:</p>
                    <p style={{ color: 'green'}}>
                        {customerName}<br />
                        {customerEmail}<br />
                        {customerAddress}
                    </p>
                    <p className='invoice-info'>Due Date: {dueDate}</p>
                </div>
                <div className="invoice-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.name}</td>
                                    <td>{order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.total}</td>
                                </tr>
                            ))}
                            <tr><td></td><td></td>
                                <td style={{ backgroundColor: 'green', color: 'white' }}>Grand Total:</td>
                                <td style={{ backgroundColor: 'green', color: 'white' }}>{grandTotal}</td></tr>
                        </tbody>
                    </table>
                </div></div>
            <div className='download-btn'>
                <DropdownButton id="dropdown-basic-button" title="Download">
                    <Dropdown.Item onClick={downloadPDF}>Download PDF</Dropdown.Item>
                    <Dropdown.Item onClick={downloadImage}>Download Image</Dropdown.Item>
                </DropdownButton>
                {loader ? (
                    <span>Downloading...</span>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    )
}

export default Preview