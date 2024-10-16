import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "./css/Main.css";

function UpperInvoice() {
    return (
        <div>
            <Container>
                <div className="upper-half">
                    <Row className="mt-5">
                        <Col xs={12} lg={9}>
                            <div>
                                {/* Content for the upper half */}
                                <h1 className="text-start mb-4">invoices</h1>
                                <p className="text-start mt-4">Welcome to invoices page!<br />
                                    Here, you can find a list of all invoices you registered.<br />
                                    You can easily access to your preferred invoice by using search and filtering functions below.<br />
                                    Registering a new invoice and modifying existing invoices can be also done in this page.</p>
                            </div>
                        </Col>
                        <Col xs={12} lg={3}>
                            <div className="d-flex flex-column align-items-start" style={{ height: '100%' }}>
                                <Button variant="light" className="mx-2 regularGreenBtn mt-auto" href="/generate">Generate invoice</Button>
                            </div>
                        </Col>

                    </Row>
                </div></Container>
        </div>
    )
}

export default UpperInvoice