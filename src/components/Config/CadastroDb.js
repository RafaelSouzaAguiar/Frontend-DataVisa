import React, { Fragment, useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import { useLocation } from 'react-router-dom';
import DBClient from '../../utils/DBClient';

const CadastroDb = ({ exibeMensagem, session }) => {
  const [value, setValue] = useState('');
  const [tipo, setTipo] = useState('')
  const [contador, setContador] = useState(0)
  const [ativo, setAtivo] = useState(true)
  const [testado, setTestado] = useState(true)
  const [tables, setTables] = useState([])
  const [db, setDb] = useState({})
  const location = useLocation();
  let tipos = ["MySQL", "MongoDB", "SQL Server"]
  const cargos = ["Administrador", "Gerente", "Atendente"]

  useEffect(() => {
    setDb(location.state)
    setTipo(location.state.tipoDb)
    setAtivo(location.state.isActive == 1 ? true : false)
    if (location.state.nomeConexao != null) {
      conectar(location.state.nomeConexao)
    } else {
      setTestado(false)
    }
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const onFormSubmit = (event) => {
    const dadosConexao = {
      nomeConexao: document.getElementById('nome').value,
      tipoDb: tipo,
      nomeDb: document.getElementById('nomedb').value,
      usuarioDb: document.getElementById('userdb').value,
      portDb: document.getElementById('portdb').value,
      hostName: document.getElementById('hostdb').value,
      caminhoDb: document.getElementById('caminhodb').value,
      senhaDb: document.getElementById('senhadb').value
    }

    testeConexao(dadosConexao)
    event.preventDefault();
  }
  const handleDropdownChange = (e, id) => {
    const index = tables.findIndex(obj => obj.id == id)
    const cargo = cargos.indexOf(e)

    tables[index].permissaoAcesso = cargo
    setContador(contador + 1)
  }
  async function testeConexao(dadosConexao) {
    try {
      await DBClient.post("/dataVisa/database/testConnection", dadosConexao).then(
        (res) => {
          setTestado(true)
          exibeMensagem(res.data)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function conectar(nomeDb) {
    if (
      testado == true
    ) {
      try {
        await DBClient.get("/dataVisa/database/connect/" + nomeDb).then(
          () => buscarTabelas()
        )

      } catch (error) {
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
          + error.response.data)
      }
    } else {
      exibeMensagem("Faça um teste conexão com sucesso para buscar as tabelas!")
    }
  }
  async function buscarTabelas() {
    try {
      await DBClient.get("/dataVisa/table/getTablesPermitions").then(
        (res) => {
          setTables(res.data.tablesPermitions)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function cadastrarConexao() {
    const dadosDb = {
      nomeConexao: document.getElementById("nome").value,
      tipoDb: tipo,
      nomeDb: document.getElementById("nomedb").value,
      usuarioDb: document.getElementById("userdb").value,
      senhaDb: document.getElementById("senhadb").value,
      hostName: document.getElementById("hostdb").value,
      portDb: document.getElementById("portdb").value,
      caminhoDb: document.getElementById("caminhodb").value,
      isActive: ativo == true ? 1 : 0,
      empresaId: session.empresaId
    }

    try {
      await DBClient.post("/dataVisa/database/addDB", dadosDb).then(
        (res) => {
          exibeMensagem(res.data)
          setDb(dadosDb)
          setContador(contador + 1)
          conectar(dadosDb.nomeConexao)
          document.getElementById("tabelas").scrollIntoView()
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error)
      console.log(error)
    }
  }
  async function salvarConexao() {
    const dadosDb = {
      database: {
        nomeConexao: document.getElementById("nome").value,
        tipoDb: tipo,
        nomeDb: document.getElementById("nomedb").value,
        usuarioDb: document.getElementById("userdb").value,
        senhaDb: document.getElementById("senhadb").value,
        hostName: document.getElementById("hostdb").value,
        portDb: document.getElementById("portdb").value,
        caminhoDb: document.getElementById("caminhodb").value,
        isActive: ativo == true ? 1 : 0,
        empresaId: session.empresaId
      },
      tablesPermitions: tables
    }

    try {
      await DBClient.put("/dataVisa/database/updateDB", dadosDb).then(
        (res) => {
          exibeMensagem(res.data)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  return (
    <div className='col-12'>

      <div className="grid nested-grid">

        <div className="font-bold col-9 mt-3">Cadastro de Banco de dados</div>
        <div className="cadastro-area grid col-2 mr-2 mt-1 mb-1 align-items-center"
          style={{ width: '140px', boxShadow: 'none', height: '60px' }}>
          <div className="col-6">Ativo</div>
          <div className="col-6">
            <InputSwitch checked={ativo} onChange={(e) => setAtivo(!ativo)} />
          </div>
        </div>
        <div className="col-1 ml-2 mt-2 text-right">
          <button className="cadastro-btn-color" type="submit"
            onClick={() => {
              db.nomeConexao == null ?
                cadastrarConexao() : salvarConexao()
            }}>
            {db.nomeConexao == null ? "Cadastrar" : "Salvar"}</button>
        </div>

        <div className="scroll col-12 mt-1 ml-1">

          <form id='cadastro' onChange={handleChange} onSubmit={onFormSubmit}>
            <div className='cadastro-area grid col-12'>

              <div className="col-5">
                <label className='font-bold'>Nome da Conexao
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="nome" placeholder="Nome para a conexao"
                      defaultValue={db.nomeConexao} required />
                  </div>
                </label>
                <label className='font-bold mt-2'>Tipo
                  <Dropdown value={tipo} options={tipos}
                    onChange={(e) => setTipo(e.value)}
                    style={{
                      width: "90%", background: '#EBEDEE',
                      border: '1px #374957 solid', opacity: '0.60',
                    }}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                    defaultValue={db.tipoDb} />
                </label>
                <label className='font-bold mt-2'>Nome do banco de dados
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="nomedb" placeholder="Nome da instância do banco"
                      defaultValue={db.nomeDb} required />
                  </div>
                </label>
                <label className='font-bold mt-2'>Usuario do banco de dados
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="userdb" placeholder="Nome do usuário do banco"
                      defaultValue={db.usuarioDb} required />
                  </div>
                </label>

              </div>
              <div className="col-5">
                <label className='font-bold'>Porta
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="portdb" placeholder="Porta do banco de dados"
                      defaultValue={db.portDb} required />
                  </div>
                </label>
                <label className='font-bold mt-2'>Dominio
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="hostdb" placeholder="Dominio do banco de dados"
                      defaultValue={db.hostName} required />
                  </div>
                </label>
                <label className='font-bold mt-2'>Caminho
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="caminhodb" placeholder="Caminho do banco de dados"
                      defaultValue={db.caminhoDb} required />
                  </div>
                </label>
                <label className='font-bold mt-2'>Senha
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="password" id="senhadb" placeholder="Senha do usuario do banco"
                      defaultValue={db.senhaDb} required />
                  </div>
                </label>
              </div>
              <div className="relative col-1 col-offset-1 h-auto">
                <input className="cadastro-btn-blue absolute bottom-0 mb-1"
                  type="submit" value="Testar" />
              </div>
            </div>
          </form>

          <div className="grid nested-grid col-6 mt-3">
            <div className='font-bold col-12' id='tabelas'>Permissões de tabela</div>

            <div className='cadastro-area grid col-9 mt-2'>
              <i className='fi fi-rr-search mr-2 pt-1' />
              <input type="text" placeholder="Pesquisar por tabela"
                style={{ border: 'none' }} />
            </div>
            <div className='col-2 col-offset-1'>
              <button className='cadastro-btn-blue'
                onClick={() => conectar(document.getElementById("nome").value)}>
                Buscar
              </button>
            </div>

            <div className="cadastro-area grid col-12 mt-2">
              <div className="col-7 font-bold" >
                Nome da tabela
              </div>
              <div className="col-5 font-bold">
                Nivel de Acesso
              </div>
              {tables.map((table) => (
                <Fragment key={table.id}>
                  <div className="col-7 pt-3" >
                    {table.nome}
                  </div>
                  <div className="col-5">
                    <Dropdown value={cargos[table.permissaoAcesso]} options={cargos}
                      onChange={(e) => {
                        handleDropdownChange(e.value, table.id)
                      }}
                      style={{ width: "100%" }}
                      scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                      required placeholder='Defina um nivel' />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CadastroDb