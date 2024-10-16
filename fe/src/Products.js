import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './css/Products.css';
import Navigation from './Navigation';
import PaginationComponent from './PaginationComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProductForm from './ProductForm';
import "./css/Main.css";
import ProductEditForm from './ProductEditForm';

function Products() {

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
    console.log(products);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    // Function to slice the data array based on the current page
    const getPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);
        return products.slice(startIndex, endIndex);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //adding products
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    //Delete
    const [showDelete, setShowDelete] = useState(false); // State to control checkbox visibility
    const showDeletes = () => {
        setShowDelete(!showDelete);
    }
    const [productId, setProductId] = useState("");   
        const deleteProduct = async(productId) => {
            try {
                let result = await fetch(`http://localhost:8000/api/deleteProductById/${productId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                result = await result.json()
                //setMultipleMailsErrors(result["error"]);
                //setMultipleMailsMessage(result["message"]);
            } catch (error) {
                console.error('Error:', error);
                // Handle any network-related errors here
            }
        }

        const [editModalOpen, setEditModalOpen] = useState(false);
        const [updatedName, setUpdatedName] = useState('');
        const [updatedPrice, setUpdatedPrice] = useState('');
        const [id, setId] = useState('');
        const toggleEditModal = (name, price, id) => {
            setUpdatedName(name);
            setUpdatedPrice(price);
            setId(id);
            setEditModalOpen(!editModalOpen);
        };
        

    return (
        <div>
        <div>
            <Navigation />
            <Container>
                <div className="upper-half">
                    <Row className="mt-5">
                        <Col xs={12} lg={9}>
                            <div>
                                {/* Content for the upper half */}
                                <h1 className="text-start mb-4">Products</h1>
                                <p className="text-start mt-4">Welcome to products page!<br />
                                    Here, you can find a list of all products you registered.<br />
                                    You can easily access to your preferred product by using search and filtering functions below.<br />
                                    Registering a new product and modifying existing products can be also done in this page.</p>
                            </div>
                        </Col>
                        <Col xs={12} lg={3}>
                            <div className="d-flex flex-column align-items-start" style={{ height: '100%' }}>
                                <Button variant="light" className="mx-2 regularGreenBtn mt-auto" onClick={toggleModal}>Add Product</Button>
                                <div className="mt-2"></div> {/* Spacer */}
                                <Button variant="light" className="mx-2 regularGreenBtn mb-3" onClick={showDeletes}>Delete Product</Button>
                            </div>
                        </Col>

                    </Row>
                </div></Container>

            <div className="mt-3"></div> {/* Spacer */}

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
                            totalPages={Math.ceil(products.length / itemsPerPage)}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    {/* Products Container */}
                    <div className="product-container" style={{ backgroundColor: 'white', padding: '10px', width: '900px', margin: '0 auto', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}>
                        {products.length > 0 ? (
                            getPageData().map(product => (
                                <div key={product.id} style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px', position: 'relative', textAlign: 'left' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{product.id} - {product.name}</div>
                                    <div>Price: {product.price}</div>
                                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                        {showDelete && <Button className="deleteBtn" style={{ marginRight: '20px' }} onClick={() => deleteProduct(product.id)} id={product.id}>Delete</Button>}
                                        <Button className="regularGreenBtn" onClick={() => toggleEditModal(product.name, product.price, product.id)} >Edit</Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </div>
                </div>

                <div style={{ position: 'relative', minHeight: '100vh' }}>
                    {isModalOpen && (
                        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}></div>
                    )}
                    <div>
                        {isModalOpen && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', width: '500px', height: 'auto', maxHeight: '700px', textAlign: 'center', display: 'block', marginTop: '10px', borderRadius: '10px', maxHeight: '100%', overflow: 'auto', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }} > {/* Check the display style */}
                                    <div className="modal-content" style={{ textAlign: 'center' }} >
                                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px', marginRight: '20px' }}>
                                            <Button style={{ border: 'none', backgroundColor: 'white', color: 'black' }} onClick={toggleModal}><FontAwesomeIcon icon={faXmark} /></Button>
                                        </div>
                                        <div>
                                            <ProductForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ position: 'relative', minHeight: '100vh' }}>
                    {editModalOpen && (
                        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}></div>
                    )}
                    <div>
                        {editModalOpen && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', width: '500px', height: 'auto', maxHeight: '700px', textAlign: 'center', display: 'block', marginTop: '10px', borderRadius: '10px', maxHeight: '100%', overflow: 'auto', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }} > {/* Check the display style */}
                                    <div className="modal-content" style={{ textAlign: 'center' }} >
                                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px', marginRight: '20px' }}>
                                            <Button style={{ border: 'none', backgroundColor: 'white', color: 'black' }} onClick={toggleEditModal}><FontAwesomeIcon icon={faXmark} /></Button>
                                        </div>
                                        <div>
                                            <ProductEditForm productName={updatedName} productPrice={updatedPrice} productId={id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>


        </div>
        </div>
    )
}

export default Products