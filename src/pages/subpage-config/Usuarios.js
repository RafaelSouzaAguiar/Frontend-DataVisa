import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { confirmDialog } from 'primereact/confirmdialog'
import DBClient from '../../utils/DBClient.js'
import ListUser from '../../components/Config/ListUser.js'
import ListPending from '../../components/Config/ListPending.js'

const Usuarios = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingPending, setLoadingPending] = useState(true)
  const [controle, setControle] = useState(0);
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    alteraModo(3)
    setLoading(true)
    setLoadingPending(true)
    const loadUsers = async () => {
      try {
        await DBClient.get('/dataVisa/user/getAll').then((res) => {
          setUsers(res.data)
          console.log(res.data)
          setLoading(false)
        })
      } catch (error) {
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
          error.response.data)
      }
    }
    const loadPending = async () => {
      try {
        await DBClient.get('/dataVisa/user/getAllPending').then((res) => {
          setUsers(res.data)
          console.log(res.data)
          setLoadingPending(false)
        })
      } catch (error) {
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
          error.response.data)
      }
    }

    if (location.pathname == "/config/usuarios") {
      loadUsers()
    } else {
      loadPending()
    }
  }, [controle])

  async function userCadastro(email) {
    try {
      await DBClient.get("/dataVisa/user/getUser/" + email).then(
        (res) => navigate('/config/cadastro/usuario', { state: res.data }))
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  const confirmDelete = (user) => {
    const refuseMessage = 'Deseja mesmo recusar o cadastro de ' + user.nome + '?'
    const deleteMessage = 'Deseja mesmo deletar o usuário ' + user.nome + '?'
    confirmDialog({
      message: user.nivelAcesso == 0 ? refuseMessage : deleteMessage,
      header: 'Confirmar ação',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      rejectLabel: "Não",
      acceptLabel: "Sim",
      accept() {
        user.nivelAcesso == 0 ? rejeitarUser(user.email) : deletarUser(user)
      },
      reject() {
        return
      }
    })
  }

  async function deletarUser(user) {
    try {
      await DBClient.delete('/dataVisa/user/deleteUser',
        { data: user }
      ).then((res) => {
        console.log(res)
        setControle(prevControle => prevControle + 1);
        exibeMensagem(res.data)
      });
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }

  async function rejeitarUser(userEmail) {
    try {
      await DBClient.delete("/dataVisa/user/refusePendingUser",
        { data: { email: userEmail } }).then((res) => {
          setControle(prevControle => prevControle + 1);
          exibeMensagem(res.data)
        })
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }

  return (
    <div className='col-12'>
      <div className='grid nested-grid'>

        <div className='grid col-10'>
          <div className="col-12 font-bold">
            {location.pathname == "/config/usuarios" ?
              "Gerenciamento de usuários" : "Usuários Pendentes"}
          </div>
          <div className='cadastro-area grid col-5 m-2'>
            <i className='fi fi-rr-search mr-2 pt-2' />
            <input type="text" placeholder="Pesquisar pelo nome"
              style={{ border: 'none', width: '92%' }} />
          </div>
        </div>
        <div className='col-2 pr-5 pl-5'>
          <button className='cadastro-btn-blue m-1 w-full' onClick={() => {
            alteraModo(1)
            navigate('/menu/recentes')
          }}>Menu</button>
        </div>

        {location.pathname == "/config/usuarios" ?
          <ListUser
            list={users}
            userCadastro={userCadastro}
            confirmDelete={confirmDelete}
            setControle={setControle} 
            loading={loading} />
          :
          <ListPending
            list={users}
            userCadastro={userCadastro}
            confirmDelete={confirmDelete}
            setControle={setControle} 
            loading={loadingPending}/>
        }
      </div>
    </div>
  )
}

export default Usuarios