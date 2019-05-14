import React, { useEffect, useState } from 'react'
import './App.css'

import { API } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

function App() {
  const [crypto, updateCrypto] = useState([])
  async function callApi() {
    try {
      const cryptoData = await API.get('peopleapitwitch', '/crypto')
      updateCrypto(cryptoData.crypto.data)
      console.log('cryptoData: ', cryptoData)
      
      const jobData = await API.get('peopleapitwitch', '/jobs')
      console.log('jobData: ', jobData)
    } catch (err) { console.log({ err })}
  }
  useEffect(() => {
    callApi()
  }, [])

  return (
    <div className="App">
      {
        crypto.map((c, i) => <h1 key={isNaN}>{c.symbol} {c.price_usd}</h1>)
      }
     
    </div>
  );
}

// export default App

export default withAuthenticator(App, {
  includeGreetings: true
});
