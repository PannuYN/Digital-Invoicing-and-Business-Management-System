import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './css/Products.css';
import Navigation from './Navigation';
import './css/Home.css';
import PaginationComponent from './PaginationComponent';
import "./css/Main.css";

function Clients() {

    //fetching clients from the database
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
  //console.log(clients);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Function to slice the data array based on the current page
  const getPageData = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, clients.length);
      return clients.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  return (
    <div>
            <Navigation />
            <Container>
            <div className="upper-half">
                <Row className="mt-5">
                    <Col xs={12} lg={9}>
                        <div>
                            {/* Content for the upper half */}
                            <h1 className="text-start mb-4">Clients</h1>
                            <p className="text-start mt-4">Welcome to clients page!<br />
                                Here, you can find a list of all clients you registered.<br />
                                You can easily access to specific client by using search and filtering functions below.<br />
                                Registering a new client and modifying existing clients can be also done in this page.</p>
                        </div>
                    </Col>
                    <Col xs={12} lg={3}>
                        <div className="d-flex flex-column align-items-start" style={{ height: '100%' }}>
                            <Button variant="dark" className="mx-2 regularGreenBtn mt-auto">Add Client</Button>
                            <div className="mt-2"></div> {/* Spacer */}
                            <Button variant="dark" className="mx-2 regularGreenBtn mb-3">Delete Client</Button>
                        </div>
                    </Col>

                </Row>
                </div></Container> 

                <div className="mt-3"></div> {/* Spacer */}

                <div className="lower-half">
                    {/* Content for the lower half */}
                    <div style={{ padding: '20px 10px', width: '900px', margin: '15px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',  }}>
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
                            totalPages={Math.ceil(clients.length / itemsPerPage)}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    {/* Products Container */}
                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px', margin: '0 auto', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}>
                        {clients.length > 0 ? (
                            getPageData().map(client => (
                                <div key={client.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{client.name}</div>
                                    
                                        <div>Email: {client.email}</div>
                                        <div>Address: {client.address}</div>
                                    <Button className="regularGreenBtn" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Edit</Button>
                                </div>
                            ))
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </div>
                </div>
                </div>
            

        </div>
  )
}

export default Clients;