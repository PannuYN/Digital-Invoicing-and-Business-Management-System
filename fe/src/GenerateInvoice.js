import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import OrderForm from './OrderForm'
import "./css/Main.css";

function GenerateInvoice() {

  const [role, setRole] = useState();
  useEffect(() => {
    const fetchRole = localStorage.getItem('authenticated');
    setRole(fetchRole);
  }, []);

  return (
    < div >
    <Navigation />
      {
          role !== "InvoiceManager" ?
          <>
            <h1>Unauthorized Access!!!</h1>
          </>
          : <>
            <OrderForm />
          </>
      }

    </div >
  )
}

export default GenerateInvoice