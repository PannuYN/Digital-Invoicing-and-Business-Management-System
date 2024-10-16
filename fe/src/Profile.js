import React from 'react'
import './css/Profile.css'
import Navigation from './Navigation'
import "./css/Main.css";

function Profile() {



    return (
        <div>
            <Navigation />
            <h2 style={{marginTop: '20px'}}>User Profile</h2>
            <div class="profile-box">
                
                <div class="profile-info">
                    <label for="name">Name</label>
                    <p>{localStorage.getItem('user')}</p>
                </div>
                <div class="profile-info">
                    <label for="email">Email</label>
                    <p>{localStorage.getItem('email')}</p>
                </div>
                <div class="profile-info">
                    <label for="role">Role</label>
                    <p>{localStorage.getItem('authenticated')}</p>
                </div>
                <div class="profile-info">
                    <label for="accessible-services">Accessible Services:</label>
                    {localStorage.getItem('authenticate') === "ProductAndClientManager" ? (
                        <ul>
                            <li>View invoices and quotations</li>
                            <li>Check sales and analysis</li>
                            <li>Manage products and clients</li>
                            <li>Check invoice history</li>
                        </ul>
                        
                    ) : (
                        <ul>
                            <li>View invoices and quotations</li>
                            <li>Check sales and analysis</li>
                            <li>Manage products and clients</li>
                            <li>Check invoice history</li>
                            <li>Generate invoice and quotation</li>
                            <li>Manage invoices and quotations</li> 
                            <li>Send alert mail</li>

                        </ul>
                    )

                    }

                </div>
            </div></div>
    )
}

export default Profile