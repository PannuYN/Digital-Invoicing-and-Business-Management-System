import React from 'react'

function Save() {
  return (
    <div>
        {isModalOpen && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="modal" style={{ display: 'flex', flexDirection: 'column', maxWidth: '700px', width: '100%', margin: 'auto' }}> {/* Check the display style */}
                        <div className="modal-content" >
                            <div>
                                <InvoiceForm type={sentStatus} invoice_no={selectedInvoiceId} date="12.4.2024" due_date="12.8.2024"
                                    client_name={clients.find(client => client.id === selectedClientId)?.name}
                                    client_add={clients.find(client => client.id === selectedClientId)?.address}
                                    client_email={clients.find(client => client.id === selectedClientId)?.email}
                                    orders={ordersByInvoice} shipping_fee="2500" />
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <Button className="regularGreenBtn" onClick={toggleModal}>Close</Button>
                            <Button className="regularGreenBtn" onClick={toggleModal}>Close</Button>
                            </div>
                        </div>
                    </div>
                    </div>
                )}
    </div>
  )
}

export default Save