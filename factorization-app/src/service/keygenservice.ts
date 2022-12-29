import { KeyGen } from '../model/domain_model';
import { useState, useEffect } from 'react';
  
const LanguageService = {
  Factor(success: (languages: KeyGen[]) => void, failure: (msg: string) => void) {
  const [languages, setLanguages] = useState<KeyGen[]>([]);

  useEffect(() => {
        // Make an HTTP request to the backend (Python service)
        fetch('http://127.0.0.1:5000/languages') // get data from the api (By default the method is GET so we don't have to add it here)
        .then(response => { return response.json() }) // Resolve the response object to JSON format 
        .then(data => setLanguages(data)) // Update the state data and render the UI
        .catch(error => console.log(error)); // In case the promise rejects - handle the error. 
  }, []);
  
  success(languages);
  }
};

export { LanguageService };