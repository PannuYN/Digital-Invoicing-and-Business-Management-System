import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./css/Home.css"

function Filter() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState('sent'); // Assuming 'sent' as default
  return (
    <div>
         <Container>
            <Form>
                <Row className="align-items-left justify-content-left">
                    {/* Start Date */}
                    <Col md={3}>
                        <ReactDatePicker
                            selected={startDate} 
                            onChange={date => setStartDate(date)} 
                            className="form-control" 
                            placeholderText="Start Date" />
                    </Col>
                    {/* End Date */}
                    <Col md={3}>
                        <ReactDatePicker 
                            selected={endDate} 
                            onChange={date => setEndDate(date)} 
                            className="form-control" 
                            placeholderText="End Date" />
                    </Col>

                    {/* Status Radio Buttons 
                    <Col md={2}>
                        <Form.Check 
                            type="radio" 
                            label="Sent" 
                            name="statusOptions" 
                            id="sent" 
                            checked={status === 'sent'} 
                            onChange={() => setStatus('sent')} 
                            inline />
                        <Form.Check 
                            type="radio" 
                            label="Unsent" 
                            name="statusOptions" 
                            id="unsent" 
                            checked={status === 'unsent'} 
                            onChange={() => setStatus('unsent')} 
                            inline />
                    </Col>*/}

                    {/* Apply Filter Button */}
                    <Col md={2}>
                        <Button className='regularGreenBtn' type="submit">Filter</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    </div>
  )
}

export default Filter