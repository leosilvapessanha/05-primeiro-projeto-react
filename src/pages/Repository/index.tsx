import React, {useEffect, useState} from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Header, ReposityInfo, Issues } from './styles'
import gitexplorer from "../../assets/gitexplorer.svg"
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import { isNull } from 'util'

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count:number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string,
    avatar_url: string;
  }
}

interface issues {
  map(arg0: (issue: any) => void): React.ReactNode
  id: number;
  title: string;
  user: {
    login: string;
  };
  html_url: string
}


const Repository: React.FC = () => {

  const [repository,setRepository]=useState<Repository | null> (null);

  const [issues, setIssues] = useState<issues[]>([])

  const { params } = useRouteMatch<RepositoryParams>()

  useEffect(()=>{
    api.get(`/repos/${params.repository}`).then(response =>{
      setRepository(response.data)
    })

    api.get(`/repos/${params.repository}/issues`).then(response =>{
      setIssues(response.data)
    })
  }, [params.repository])

  return (
    <>
      <Header>
        <img src={gitexplorer} alt='logo' />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>
      { repository && (<ReposityInfo>
        <Header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </Header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </ReposityInfo>)}
      <Issues>
        {issues.map((issue)=>{<a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>
          <FiChevronRight size={20} />
        </a>})}
      </Issues>
    </>
  )
}

export default Repository
