import React, { useState, FormEvent } from 'react'
import gitexplorer from "../../assets/gitexplorer.svg"
import api from '../../services/api'
import { Title, Form, Repositories, Error } from './styles'
import { FiChevronRight } from 'react-icons/fi'
import { error } from 'console'

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string,
    avatar_url: string;
  }
}


const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {

    event.preventDefault()

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório')
      return
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('');

    } catch (err) {
      setInputError('erro nabusca por esse repositório')
    }
  }
  return (
    <>
      <img src={gitexplorer} alt="GitHub Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input value={newRepo} onChange={(e) => setNewRepo(e.target.value)}
          type="text" placeholder="digite o repositório aqui" />
        <button>Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (<a key={repository.full_name} href="test">
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20} />
        </a>))}

      </Repositories>
    </>
  )


}

export default Dashboard
