import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const Auditoria = () => {
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className='grid col-10'>
          <div className="col-12 font-bold">
            Auditoria
          </div>
          <div className='cadastro-area grid col-5 m-2'>
            <i className='fi fi-rr-search mr-2 pt-2' />
            <input type="text" placeholder="Pesquisar pela ação"
              style={{ border: 'none', width: '92%' }} />
          </div>
        </div>
        <div className='col-2 pr-5 pl-5'>
          <button className='cadastro-btn-blue m-1 w-full' onClick={() => {
            alteraModo(1)
            navigate('/menu/recentes')
          }}>Menu</button>
        </div>

        <div className="cadastro-area grid m-2 mr-3 w-full"
          style={{ height: 'calc(100vh - 250px)' }}>

          <div className='grid col-12 ml-1 font-bold text-center mt-2'
            style={{ height: '50px', width: '97.5%' }}>
            <div className='col-2'>Data</div>
            <div className='col-3'>Usuário</div>
            <div className='col-3'>Ação</div>
            <div className='col-4'>Detalhes</div>
            <div className="col-12"><hr /></div>
          </div>

          <div className="scroll-white col-12 text-center ml-1 mt-2"
            style={{ height: 'calc(100vh - 320px)', width: '99%' }}>
            <div className="grid col-12 mt-2">
              <div className='col-2'>01/01/2024 20:00:00</div>
              <div className='col-3'>Lorena</div>
              <div className='col-3'>Alterar senha</div>
              <div className='col-4'>Alterou senha do usuario Rebeca para 1234novasenha</div>
            </div>
            <div className="grid col-12 mt-2">
              <div className='col-2'>10/03/2024 09:30:00</div>
              <div className='col-3'>Rafael</div>
              <div className='col-3'>Recuperar senha</div>
              <div className='col-4'>Realizou recuperação de senha, enviada para rafaelreserva@pizzaria.com</div>
            </div>
            <div className="grid col-12 mt-2">
              <div className='col-2'>14/04/2024 15:47:00</div>
              <div className='col-3'>Jhonatan</div>
              <div className='col-3'>Excluir template</div>
              <div className='col-4'>Excluiu o template Vendas por Mês, criado em 07/02/2024</div>
            </div>
            <div className="grid col-12 mt-2">
              <div className='col-2'>21/05/2024 11:13:00</div>
              <div className='col-3'>Pedro</div>
              <div className='col-3'>Rejeitar usuário pendente</div>
              <div className='col-4'>Rejeitou o usuário pendente Norton</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Auditoria