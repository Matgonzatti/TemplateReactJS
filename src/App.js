import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: title,
      url: url,
      techs: [techs.split(',')]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204){ 
      const newRepositories = repositories.filter(repo => repo.id !== id);
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>{repository.title}<button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>Remover</button> </li>
        )}
      </ul>

      <br />
      Title: <input type="text" id="inputTitle" onChange={event => setTitle(event.target.value)} placeholder="Title of the repository."></input><br />
      URL: <input type="text" id="inputUrl" onChange={event => setUrl(event.target.value)} placeholder="URL of the repository."></input><br />
      Techs: <input type="text" id="inpuTechs" onChange={event => setTechs(event.target.value)} placeholder="Split the techs with comma."></input><br />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
