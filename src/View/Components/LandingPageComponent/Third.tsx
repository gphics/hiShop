import React from 'react'
import { GiCardExchange } from 'react-icons/gi'
import { BiSupport } from 'react-icons/bi'
import {RiSecurePaymentFill} from 'react-icons/ri'
function Third() {
  return (
    <div className='third_landing_page_component'>
      <header>
        <h3>Our Services</h3>
      </header>

      <section className="card_holder">
        <div className="service_card">
          <GiCardExchange className='icon' />
          <h4> Buy and Sell </h4>
        </div>
        <div className="service_card">
          <BiSupport className='icon' />
          <h4> Customer Support </h4>
        </div>
        <div className="service_card">
          <RiSecurePaymentFill className='icon'/>
          <h4>Secure Cashless Payment</h4>
        </div>
      </section>
    </div>
  )
}

export default Third