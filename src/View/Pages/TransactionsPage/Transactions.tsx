import React, { useEffect } from 'react'
import { fetchMyTranactions } from '../../../Model/Local/TransactionSlice'
import { useDispatch, useSelector } from 'react-redux'
import BarHolder from '../../Components/Navigation/BarHolder'
import EachTransaction from './EachTransaction'
function Transactions() {
  const dispatch = useDispatch()
  const { myTransactions } = useSelector((state: any) => state.transactionSlice)
  // fetching all my purchase transaction
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMyTranactions())
  },[])
  return ( 
    <div className='transaction_page'>
      <BarHolder />
      <main className='transaction_page_main' >
        <h3 className='page_for'>my transaction (Purchased) </h3>
        {myTransactions === null || myTransactions.length === 0 ? <h3 className='empty_transaction_note'>You have no transaction</h3> :
          <section className="transaction_listing">
            {myTransactions.map((item: any, index: number) => <EachTransaction {...item} key={index} />
            )}
          </section>
        }
      </main>
    </div>
  )
}

export default Transactions