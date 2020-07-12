import React, { useState } from "react";

import api from './services/api'
import "./styles.css";
import { useEffect } from "react";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(item => (
        setRepos(item.data)
      ))

  }, [])

  useEffect(() => {

  },
    [repos])

  async function handleAddRepository() {
    const data = {
      title: "Abel",
      url: "No lo sé",
      techs: "[node, java, c#]"
    }

    const response =await api.post('/repositories', data)

    setRepos([...repos, response.data])
  }

  async function handleRemoveRepository(id) {

    const repoIndex = repos.findIndex(item => item.id === id)

    if (repoIndex < 0)
      return console.log("Repo not found")
    else {

      await api.delete(`/repositories/${id}`)
       
      repos.splice(repoIndex, 1)

      setRepos([...repos])

    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repo => (
            <div key={repo.id}>
              <li >
                {repo.title}
              </li>

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
            </button>
            </div>
          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
