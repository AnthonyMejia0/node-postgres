import React, { useEffect, useState } from 'react';

function App() {
  const [merchants, setMerchants] = useState(false);

  function getMerchant() {
    fetch('http://localhost:3001').then(response => {
      return response.text();
    }).then(data => {
      setMerchants(data);
    });
  }

  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');

    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    }).then(response => {
      return response.text();
    }).then(data => {
      alert(data);
      getMerchant();
    });
  }

  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    }).then(response => {
      return response.text();
    }).then(data => {
      alert(data);
      getMerchant();
    });
  }

  function updateMerchant() {
    let id = prompt('Enter merchant id');
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    }).then(response => {
      return response.text();
    }).then(data => {
      alert(data);
      getMerchant();
    });
  }

  useEffect(() => {
    getMerchant();
  }, []);

  return (
    <div>
      {merchants ? merchants : 'There is no merchant data available'}
      <br />
      <button onClick={createMerchant}>Add Merchant</button>
      <button onClick={updateMerchant}>Update Merchant</button>
      <button onClick={deleteMerchant}>Delete Merchant</button>
    </div>
  );
}

export default App;