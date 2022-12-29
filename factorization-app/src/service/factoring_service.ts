import { useState, useEffect } from 'react';
import { Factor } from '../model/domain_model';
  
const FactoringService = {
  Factor(modSize: string, success: (factor: Factor[]) => void, failure: (msg: string) => void) {
    const [data, setData] = useState<Factor[]>([]);

    useEffect(() => {
      fetch('http://localhost:5000/factor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          content: modSize
        })
      }).then(response => { return response.json() })
      .then(data => setData(data))
      .catch(error => console.log(error));
    }, []);
    
    return success(data);
  }
};

export { FactoringService };