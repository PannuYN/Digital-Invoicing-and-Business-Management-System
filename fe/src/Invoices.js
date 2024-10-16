import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './css/Products.css';
import Navigation from './Navigation';
import PaginationComponent from './PaginationComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCoffee, faXmark } from '@fortawesome/free-solid-svg-icons';
import InvoiceForm from './InvoiceForm';
import MyComponent from './T';
import './css/Tabs.css'
import UpperInvoice from './UpperInvoice';
import "./css/Main.css";
import Login from './Login';
import Filter from './Filter';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./css/Home.css"


function Invoices() {

    const [role, setRole] = useState();
    useEffect(() => {
        const fetchRole = localStorage.getItem('authenticated');
        setRole(fetchRole);
    }, []);

    //Filter
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('sent'); // Assuming 'sent' as default
    const [filteredInv, setFilteredInv] = useState([]);
    const [filtered, setFiltered] = useState(false);
    async function handleFilter() {
        const dateRange = {startDate, endDate};
        try {
            let result = await fetch('http://localhost:8000/api/getInvoicesByDateRange', {
                method: 'POST',
                body: JSON.stringify(dateRange),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setFilteredInv(result);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }
        setFiltered(true);
    }
    console.log(filteredInv);
    console.log(filtered);


    //Checkbox
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false); // State to control checkbox visibility
    const handleCheckboxChange = (event, invoiceId) => {
        if (event.target.checked) {
            setSelectedInvoices([...selectedInvoices, invoiceId]);
        } else {
            setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
        }
    };
    console.log(selectedInvoices);

    //handling each invoice
    const [multipleMailsErrors, setMultipleMailsErrors] = useState();
    const [multipleMailsMessage, setMultipleMailsMessage] = useState();
    //quotation
    async function processSelectedInvoices() {
        try {
            let result = await fetch('http://localhost:8000/api/sendMultipleMails', {
                method: 'POST',
                body: JSON.stringify(selectedInvoices),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setMultipleMailsErrors(result["error"]);
            setMultipleMailsMessage(result["message"]);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }

    }
    //alert
    async function mailAlert() {
        try {
            let result = await fetch('http://localhost:8000/api/sendMultipleRealInvoices', {
                method: 'POST',
                body: JSON.stringify(selectedInvoices),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setMultipleMailsErrors(result["error"]);
            setMultipleMailsMessage(result["message"]);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }

    }
    //real invoice
    async function sendRealInvoices() {
        try {
            let result = await fetch('http://localhost:8000/api/sendMultipleRealInvoices', {
                method: 'POST',
                body: JSON.stringify(selectedInvoices),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setMultipleMailsErrors(result["error"]);
            setMultipleMailsMessage(result["message"]);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }

    }
    //deleting selected invoices
    async function deleteInvoices() {
        try {
            let result = await fetch('http://localhost:8000/api/deleteInvoices', {
                method: 'POST',
                body: JSON.stringify(selectedInvoices),
                headers: { //type of data for request and response
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            result = await result.json() //7 turing the result promise into json format
            setMultipleMailsErrors(result["error"]);
            setMultipleMailsMessage(result["message"]);
        } catch (error) {
            console.error('Error sending mail:', error);
            // Handle error appropriately, e.g., set error state
        }

    }


    const [activeTab, setActiveTab] = useState('tab1');
    //for tabs
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const [invoices, setInvoices] = useState([]);
    //fetching invoices from the database
    useEffect(() => {
        const fetchAllInvoices = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/readAllInvoices'); // Replace '/api/invoices' with your actual endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch invoices');
                }
                const data = await response.json();
                setInvoices(data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchAllInvoices();
    }, []);
    //console.log(invoices);

    //fetching sent and unsent invoices
    const [sentInvoices, setSentInvoices] = useState([]);
    const [unsentInvoices, setUnsentInvoices] = useState([]);
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                // Fetch sent invoices from the backend API
                const sentResponse = await fetch('http://localhost:8000/api/readAllSentInvoices');
                const sentData = await sentResponse.json();

                // Set state with invoices
                setSentInvoices(sentData);

                // Fetch sent invoices from the backend API
                const unSentResponse = await fetch('http://localhost:8000/api/readAllUnsentInvoices');
                const unSentData = await unSentResponse.json();

                // Set state with invoices
                setUnsentInvoices(unSentData);
            } catch (error) {
                // Log and handle errors
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchInvoices function when component mounts
        fetchInvoices();
    }, [])

    const [clients, setClients] = useState([]);
    //fetching clients from the database
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
    //console.log(clients);

    const [orders, setOrders] = useState([]);
    //fetching orders from the database
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/readAllOrders'); // Replace '/api/products' with your actual endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);
    //console.log(orders);

    //orders modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [ordersByInvoice, setOrdersByInvoice] = useState([]);
    const [sentStatus, setSentStatus] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [invoiceStatus, setInvoiceStatus] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const toggleModal = (invoiceId, clientId, sent_status, invoice_status, created_by, issue_date, due_date) => {
        setIsModalOpen(!isModalOpen);
        setSelectedInvoiceId(invoiceId);
        setSelectedClientId(clientId);
        setSentStatus(sent_status);
        setIssueDate(issue_date);
        setDueDate(due_date);
        setInvoiceStatus(invoice_status);
        setCreatedBy(created_by);

        //order list
        const filteredItems = orders.filter(order => order.invoice_id === invoiceId);
        setOrdersByInvoice(filteredItems);
    };
    //console.log(selectedClientId);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    // Functions to slice the data array based on the current page
    const getAllPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, invoices.length);
        return invoices.slice(startIndex, endIndex);
    };
    const getUnsentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, invoices.length);
        return unsentInvoices.slice(startIndex, endIndex);
    };
    const getSentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, invoices.length);
        return sentInvoices.slice(startIndex, endIndex);
    };
    const getFilteredPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, invoices.length);
        return filteredInv.slice(startIndex, endIndex);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Navigation />
            {
                role === null ? (
                    <h1>Unauthorized Access!!! Login First.</h1>
                ) : (
                    <div>
                        <UpperInvoice />

                        <div className="mt-3"></div> {/* Spacer */}

                        <div className="tabs-container">
                            <div className="tab-buttons">
                                <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>All</button>
                                <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>Quotations</button>
                                <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>Invoices</button>
                            </div>
                            <div className="tab-content">
                                {activeTab === 'tab1' &&
                                    <div>
                                        <div className="lower-half">
                                            {/* Content for the lower half */}
                                            <div style={{ padding: '10px 10px', width: '900px', margin: '15px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <div style={{ marginRight: 'auto' }}>
                                                    {/* <Button variant="light" className='regularGreenBtn' >Filter</Button> */}
                                                    {/* <p>Filter area</p> */}

                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Form.Control type="text" placeholder="Search" className="search-bar" />
                                                    <Button className='search-button'>Search</Button>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                                                {/* Pagination */}
                                                <div style={{ marginTop: '5px', width: '900px' }}>
                                                    <PaginationComponent
                                                        totalPages={Math.ceil(invoices.length / itemsPerPage)}
                                                        currentPage={currentPage}
                                                        onPageChange={handlePageChange}
                                                    />
                                                </div>
                                                {/* invoices Container */}
                                                <div className="invoice-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px' }}>
                                                    {invoices.length > 0 ? (
                                                        getAllPageData().map(invoice => (
                                                            <div key={invoice.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Orders and Details</Button>
                                                                {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>Loading invoices...</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {activeTab === 'tab2' &&
                                    <div>
                                        <div className="lower-half">
                                            {/* Content for the lower half */}
                                            <div style={{ padding: '10px 10px', width: '900px', margin: '15px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <div style={{ marginRight: 'auto' }}>
                                                    {/* <Button variant="light" className='regularGreenBtn' >Filter</Button> */}
                                                    
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Form.Control type="text" placeholder="Search" className="search-bar" />
                                                    <Button className='search-button'>Search</Button>
                                                </div>
                                            </div>

                                            {
                                                role === "InvoiceManager" &&
                                                <div className="d-flex flex-row align-items-center justify-content-end">
                                                    <Button variant="light" className="regularGreenBtn" onClick={() => setShowCheckboxes(!showCheckboxes)}>Select Mails</Button>
                                                    <Button variant="light" className="regularGreenBtn" onClick={processSelectedInvoices} style={{ marginRight: '10px', marginLeft: '10px' }}>Send Quotation</Button>
                                                    <Button variant="light" className="deleteBtn" onClick={deleteInvoices} >Delete</Button>
                                                </div>
                                            }




                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                                                {/* Pagination */}
                                                <div style={{ marginTop: '5px', width: '900px' }}>
                                                    <PaginationComponent
                                                        totalPages={Math.ceil(unsentInvoices.length / itemsPerPage)}
                                                        currentPage={currentPage}
                                                        onPageChange={handlePageChange}
                                                    />
                                                </div>

                                                {
                                                    multipleMailsErrors ? (<div className='alert'>

                                                        <p style={{ color: 'red' }}> {multipleMailsErrors} </p>

                                                    </div>)
                                                        :
                                                        (
                                                            multipleMailsMessage && <div>
                                                                <p style={{ color: 'green' }}>{multipleMailsMessage}</p>
                                                            </div>
                                                        )
                                                }

                                                {showCheckboxes ? (
                                                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px' }}>
                                                        {unsentInvoices.length > 0 ? (
                                                            getUnsentPageData().map(invoice => (
                                                                <div key={invoice.id} style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`mail_${invoice.id}`}
                                                                        onChange={(event) => handleCheckboxChange(event, invoice.id)}
                                                                    />
                                                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                    <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                    <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                    <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Orders and Details</Button>
                                                                    {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>Loading invoices...</p>
                                                        )}
                                                    </div>) : (
                                                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px' }}>
                                                        {unsentInvoices.length > 0 ? (
                                                            getUnsentPageData().map(invoice => (
                                                                <div key={invoice.id} style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>

                                                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                    <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                    <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                    <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Orders and Details</Button>
                                                                    {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>Loading invoices...</p>
                                                        )}
                                                    </div>)}
                                            </div>
                                        </div>
                                    </div>
                                }
                                {activeTab === 'tab3' &&
                                    <div>
                                        <div className="lower-half">
                                            {/* Content for the lower half */}
                                            <div style={{ padding: '10px 10px', width: '900px', margin: '15px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <div style={{ marginRight: 'auto', justifyContent: 'left' }}>
                                                    {/* <Button variant="light" className='regularGreenBtn' >Filter</Button> */}
                                                    <div className="align-items-left justify-content-left" style={{ display: 'flex', flexFlow: 'row', width: '300px', marginLeft: '0px' }}>
                                                        {/* Start Date */}

                                                        <input
                                                            type = 'date'
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                            className="form-control"
                                                            placeholder="Start Date" />

                                                        {/* End Date */}

                                                        <input
                                                            type='date'
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                            className="form-control"
                                                            placeholder="End Date" />


                                                        <Button className='regularGreenBtn' type="submit" onClick={handleFilter} >Filter</Button>
                                                        <Button className='regularGreenBtn' type="submit" onClick={(e) => setFiltered(false)} >Clear</Button>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Form.Control type="text" placeholder="Search" className="search-bar" />
                                                    <Button className='search-button'>Search</Button>
                                                </div>
                                            </div>

                                            {
                                                role === "InvoiceManager" &&
                                                <div className="d-flex flex-row align-items-center justify-content-end">
                                                    <Button variant="light" className="regularGreenBtn" onClick={() => setShowCheckboxes(!showCheckboxes)}>Select Mails</Button>
                                                    <Button variant="light" className="regularGreenBtn" style={{ marginRight: '10px', marginLeft: '10px' }} onClick={sendRealInvoices}>Mail Invoice</Button>
                                                    <Button variant="light" className="regularGreenBtn" onClick={mailAlert} style={{ marginRight: '10px' }} >Mail Alert</Button>
                                                    <Button variant="light" className="deleteBtn" onClick={deleteInvoices} >Delete</Button>
                                                </div>
                                            }


                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                                                {/* Pagination */}
                                                <div style={{ marginTop: '5px', width: '900px' }}>
                                                    <PaginationComponent
                                                        totalPages={Math.ceil(sentInvoices.length / itemsPerPage)}
                                                        currentPage={currentPage}
                                                        onPageChange={handlePageChange}
                                                    />
                                                </div>

                                                {
                                                    multipleMailsErrors ? (<div className='alert'>

                                                        <p style={{ color: 'red' }}> {multipleMailsErrors} </p>

                                                    </div>)
                                                        :
                                                        (
                                                            multipleMailsMessage && <div>
                                                                <p style={{ color: 'green' }}>{multipleMailsMessage}</p>
                                                            </div>
                                                        )
                                                }

                                                {showCheckboxes ? (
                                                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px' }}>
                                                        
                                                        {filtered ? (
                                                            filteredInv.length > 0 ?(
                                                                getFilteredPageData().map(invoice => (
                                                                    <div key={invoice.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name={`mail_${invoice.id}`}
                                                                            onChange={(event) => handleCheckboxChange(event, invoice.id)}
                                                                        />
                                                                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                        <div style={{ height: '10px' }}></div>
                                                                        <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} >Orders and Details</Button>
                                                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                                            {invoice.invoice_status === 'sent' ? (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Sent</Button>
                                                                            ) : (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Unsent</Button>
    
                                                                            )}
                                                                            {invoice.status === 'paid' ? (
                                                                                <Button className='unclickable-btn' style={{ backgroundColor: '#28a745', border: 'none', color: 'white' }}>Paid</Button>
                                                                            ) : (
                                                                                new Date(invoice.due_date) > new Date() ? (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#36454F', border: 'none', color: 'white' }}>Unpaid</Button>
                                                                                ) : (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white' }}>Overdue</Button>
                                                                                )
    
                                                                            )}
                                                                        </div>
    
                                                                        {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>No invoices during this period</p>
                                                            )
                                                        ):(
                                                            sentInvoices.length > 0 ? (
                                                                getSentPageData().map(invoice => (
                                                                    <div key={invoice.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name={`mail_${invoice.id}`}
                                                                            onChange={(event) => handleCheckboxChange(event, invoice.id)}
                                                                        />
                                                                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                        <div style={{ height: '10px' }}></div>
                                                                        <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} >Orders and Details</Button>
                                                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                                            {invoice.invoice_status === 'sent' ? (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Sent</Button>
                                                                            ) : (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Unsent</Button>
    
                                                                            )}
                                                                            {invoice.status === 'paid' ? (
                                                                                <Button className='unclickable-btn' style={{ backgroundColor: '#28a745', border: 'none', color: 'white' }}>Paid</Button>
                                                                            ) : (
                                                                                new Date(invoice.due_date) > new Date() ? (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#36454F', border: 'none', color: 'white' }}>Unpaid</Button>
                                                                                ) : (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white' }}>Overdue</Button>
                                                                                )
    
                                                                            )}
                                                                        </div>
    
                                                                        {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Loading invoices...</p>
                                                            )
                                                        )}
                                                        
                                                    </div>) : (
                                                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px' }}>
                                                        {filtered ? (
                                                            filteredInv.length > 0 ? (
                                                                getFilteredPageData().map(invoice => (
                                                                    <div key={invoice.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                                                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                        <div style={{ height: '10px' }}></div>
                                                                        <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} >Orders and Details</Button>
                                                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                                            {invoice.invoice_status === 'sent' ? (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Sent</Button>
                                                                            ) : (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Unsent</Button>
    
                                                                            )}
                                                                            {invoice.status === 'paid' ? (
                                                                                <Button className='unclickable-btn' style={{ backgroundColor: '#28a745', border: 'none', color: 'white' }}>Paid</Button>
                                                                            ) : (
                                                                                new Date(invoice.due_date) > new Date() ? (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#36454F', border: 'none', color: 'white' }}>Unpaid</Button>
                                                                                ) : (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white' }}>Overdue</Button>
                                                                                )
    
                                                                            )}
                                                                        </div>
    
                                                                        {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>No invoices during this period...</p>
                                                            )
                                                        ):(
                                                            sentInvoices.length > 0 ? (
                                                                getSentPageData().map(invoice => (
                                                                    <div key={invoice.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                                                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Code: {invoice.id}</div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>{clients.find(client => client.id === invoice.client_id)?.name}</span> </div>
                                                                        <div><span style={{ fontWeight: 'bold' }}>Due:</span> {invoice.due_date} </div>
                                                                        <div style={{ height: '10px' }}></div>
                                                                        <Button className="regularGreenBtn" variant="light" onClick={() => toggleModal(invoice.id, invoice.client_id, invoice.sent, invoice.invoice_status, invoice.created_by, invoice.issue_date, invoice.due_date)} >Orders and Details</Button>
                                                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                                                            {invoice.invoice_status === 'sent' ? (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Sent</Button>
                                                                            ) : (
                                                                                <Button className='unclickable-btn' style={{ border: '1.5px solid #28a745' }}>Unsent</Button>
    
                                                                            )}
                                                                            {invoice.status === 'paid' ? (
                                                                                <Button className='unclickable-btn' style={{ backgroundColor: '#28a745', border: 'none', color: 'white' }}>Paid</Button>
                                                                            ) : (
                                                                                new Date(invoice.due_date) > new Date() ? (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#36454F', border: 'none', color: 'white' }}>Unpaid</Button>
                                                                                ) : (
                                                                                    <Button className='unclickable-btn' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white' }}>Overdue</Button>
                                                                                )
    
                                                                            )}
                                                                        </div>
    
                                                                        {/* <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button> */}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Loading invoices...</p>
                                                            )
                                                        )}
                                                        
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>


                        <div style={{ position: 'relative', minHeight: '100vh' }}>
                            {isModalOpen && (
                                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}></div>
                            )}
                            <div>
                                {isModalOpen && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', width: '700px', height: 'auto', maxHeight: '700px', textAlign: 'center', display: 'block', marginTop: '10px', borderRadius: '10px', maxHeight: '100%', overflow: 'auto', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }} > {/* Check the display style */}
                                            <div className="modal-content" style={{ textAlign: 'center' }} >
                                                <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px', marginRight: '20px' }}>
                                                    <Button style={{ border: 'none', backgroundColor: 'white', color: 'black' }} onClick={toggleModal}><FontAwesomeIcon icon={faXmark} /></Button>
                                                </div>
                                                <div>
                                                    <InvoiceForm type={sentStatus} invoice_no={selectedInvoiceId} date={issueDate} due_date={dueDate}
                                                        client_id={selectedClientId}
                                                        client_name={clients.find(client => client.id === selectedClientId)?.name}
                                                        client_add={clients.find(client => client.id === selectedClientId)?.address}
                                                        client_email={clients.find(client => client.id === selectedClientId)?.email}
                                                        orders={ordersByInvoice} shipping_fee="2500" created_by={createdBy} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Invoices

