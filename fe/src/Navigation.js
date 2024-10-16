import React, { useEffect, useState } from 'react'
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Navigation() {

    const navigate = useNavigate();

    async function Logout() {
        //localStorage.clear();
        //navigate('/login');
        let result = await fetch("http://localhost:8000/api/logout", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.removeItem("authenticated");
        localStorage.removeItem("user");
        window.location.reload();
    }

    const [role, setRole] = useState();
    useEffect(() => {
        const fetchRole = localStorage.getItem('authenticated');
        setRole(fetchRole);
    }, []);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ background: "#027265" }} variant="light" >
                <Container>
                    <Navbar.Brand href="/">
                        <Image src="/img/logo.png" alt="React Bootstrap Logo" height="30" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            role === null ? (
                                <Nav className="me-auto">
                                    <Nav.Link style={{color: "white"}} href="/login">Clients</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/login">Products</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/login">Sales</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/login">Invoices</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/login">Profile</Nav.Link>
                                </Nav>
                            ) : (
                                <Nav className="me-auto">
                                    <Nav.Link style={{color: "white"}} href="/clients">Clients</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/products">Products</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/sales">Sales</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/invoices">Invoices</Nav.Link>
                                    <Nav.Link style={{color: "white"}} href="/profile">Profile</Nav.Link>
                                </Nav>
                            )
                        }


                        {
                            localStorage.getItem('authenticated') &&
                                localStorage.getItem('authenticated') !== "undefined" ?
                                <>
                                    <Nav>
                                        <div className="d-flex align-items-center">
                                            <Button className="navBtn" variant="light" onClick={Logout} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', marginRight: '50px' }} >Log out</Button>
                                        </div>
                                    </Nav>
                                </>
                                : <>
                                    <Nav>
                                        <div className="d-flex align-items-center">
                                            <Button className="navBtn" variant="light" href="/login" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem',  marginRight: '50px' }} >Login</Button>
                                        </div>
                                    </Nav>
                                </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </div >
    )
}

export default Navigation