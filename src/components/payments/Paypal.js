import React from 'react'
import './Payment.css'
import { FaCcPaypal } from 'react-icons/fa'

const Paypal = () => {
  const paypalDetailsList = [
    {
      "account_name": "sdfghj@outlook.com",
      "created_at": "2022-08-31T08:05:32.279Z",
      "_id": "630f16e79509e1407342b2af"
    },
    {
      "account_name": "sdfghj@outlook.com",
      "created_at": "2022-09-01T20:58:25.540Z",
      "_id": "63111d7543cf550baff50309"
    },
    {
      "account_name": "sdfghj@outlook.com",
      "created_at": "2022-09-01T20:58:25.540Z",
      "_id": "63111e4043cf550baff5035a"
    },
    {
      "account_name": "sdfghj@outlook.com",
      "created_at": "2022-09-02T23:31:58.025Z",
      "_id": "631292900cb7dbbc5df57f9f"
    }
  ];

  return (
    <div >
      {paypalDetailsList.map((paypalDetails => {
        return (
          <div key={paypalDetails._id}>
            <div id='paypal-details' >
              <div className='row' style={{marginRight: '15px'}}>
                <div className="col-md-12" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span><b>Account:</b> {paypalDetails.account_name}</span>
                  <span> <FaCcPaypal /> </span>
                </div>
              </div>
            </div>
            <br></br>
          </div>

        )
      }))}
    </div>
  )
}

export default Paypal