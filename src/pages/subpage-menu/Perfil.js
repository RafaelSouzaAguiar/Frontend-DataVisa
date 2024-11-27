import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import DBClient from '../../utils/DBClient'
import user from '../../assets/user.png'

const Perfil = () => {
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const [value, setValue] = useState('');
  const [alterado, setAlterado] = useState(false)
  const [view, setView] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value);
    if (document.getElementById("senha").value == "" &&
      document.getElementById("nome").value == session.nome &&
      document.getElementById("email").value == session.email
    )
      setAlterado(false)
    else
      setAlterado(true)
  }
  const onFormSubmit = (event) => {
    const dadosUsuario = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('senha').value,
      empresaId: session.empresaId,
      nivelAcesso: session.nivelAcesso
    }
    //salvarUser(dadosUsuario);
    exibeMensagem("Pendente implementar")
    event.preventDefault();
  }

  async function salvarUser(dadosUsuario) {
    try {
      await DBClient.put('/dataVisa/user/updateUser',
        dadosUsuario
      ).then((res) => {
        exibeMensagem(res.data)
        document.getElementById("senha").value = ""
        setAlterado(false)
      })
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }

  return (
    <div className='col-12'>
      <div className='grid nested-grid ml-2 mt-1'>

        <div className='col-2 text-center align-content-center' id='frame-perfil'>
          <img src={user} alt="" style={{ height: '70px' }} />
        </div>

        <div className='col-10 ml-3'>
          <div className="grid">

            <div className='font-bold col-12' style={{ fontSize: "25px" }}>
              {session.nome}
            </div>

            <div className='col-5 mt-2' style={{ fontSize: "18px" }}>
              <div>
                <b><i className='fi fi-rr-envelope'></i> E-mail: </b> {session.email}
              </div>
              <div className='mt-3'>
                <b><i className='fi fi-rr-user-check'></i> Nivel de acesso: </b>
                {session.nivelAcesso == 1 ?
                  "Administrador" : session.nivelAcesso == 2 ?
                    "Analista" : "Usuário"}
              </div>
            </div>

            <div className='col-5 mt-2' style={{ fontSize: "18px" }}>
              <div>
                <b><i className='fi fi-rr-building'></i> Empresa: </b> {session.empresa}
              </div>
              <div className='mt-3'>
                <b><i className='fi fi-rr-briefcase'></i> Cargo: </b> {session.departamento}
              </div>
            </div>

            {/* <div className='col-4'>
              <div>
                {session.cnpj}CNPJ: (to do)
              </div>
              <div>
                {session.matricula}Matricula: (To do)
              </div>
            </div> */}

          </div>
        </div>

      </div>

      <div className='font-bold mt-5 ml-2' style={{ fontSize: "20px" }}>Alterar Dados</div>
      <form onChange={handleChange} onSubmit={onFormSubmit}>
        <div className='grid mt-1 ml-2'>

          <div className='col-4'>

            <label className='font-bold'>Nome Completo
              <div className="input-div">
                <input className="input-field" style={{ background: '#EBEDEE' }}
                  type="text" id="nome" placeholder="Nome"
                  defaultValue={session.nome} required />
              </div>
            </label>

            <label className='font-bold mt-3'>E-mail
              <div className="input-div">
                <input className='input-field' style={{ background: '#EBEDEE' }}
                  type="email" id="email" placeholder="E-mail"
                  defaultValue={session.email} />
              </div>
            </label>
          </div>

          <div className='col-4'>

            <label className='font-bold'>Senha
              <div className="input-div">
                <input className='input-field' style={{ background: '#EBEDEE' }}
                  type={view == true ? "text" : "password"} id="senha" placeholder="Digite sua nova senha" required/>
                <i className={view == true ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'}
                  id='eye' onClick={() => setView(!view)} />
              </div>
            </label>
            <div className="mt-5">
              {alterado == true ?
                "Há alterações não salvas, clique em Gravar pra salva-las."
                : "Sem alterações."}
            </div>
          </div>
          {alterado == true ?
            <div className="col-1">
              <button className='cadastro-btn-blue mt-4'>Gravar</button>
            </div>
            : <div />
          }
        </div>
      </form>

    </div>
  )
}

export default Perfil