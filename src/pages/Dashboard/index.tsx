import React from 'react'

import gitexplorer from "../../assets/gitexplorer.svg"

import { Title, Form } from './styles'


const Dashboard: React.FC = () => {
  return (
    <>
      <img src = {gitexplorer} alt="GitHub Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form action="">
        <input type="text" placeholder ="digite o repositório aqui" />
        <button>Pesquisar</button>
      </Form>
    </>
  )


}

export default Dashboard
