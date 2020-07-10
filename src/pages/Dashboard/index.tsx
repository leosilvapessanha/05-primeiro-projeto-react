import React from 'react'

import gitexplorer from "../../assets/gitexplorer.svg"

import { Title, Form, Repositories } from './styles'
import { FiChevronRight } from 'react-icons/fi'


const Dashboard: React.FC = () => {
  return (
    <>
      <img src={gitexplorer} alt="GitHub Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form action="">
        <input type="text" placeholder="digite o repositório aqui" />
        <button>Pesquisar</button>
      </Form>
      <Repositories>
        <a href="">
          <img src="https://avatars1.githubusercontent.com/u/43595244?s=460&u=cb080f7f07bb02dc5ced6942b26e871f26c48cb6&v=4" alt="Avatar Leonardo Pessanha" />
          <div>
            <strong>leosilvapessanha/05-primeiro-projeto-react</strong>
            <p>First project in React</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )


}

export default Dashboard
