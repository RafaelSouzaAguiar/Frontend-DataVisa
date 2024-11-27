import React, { useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import DBClient from '../../utils/DBClient.js'
import { useLocation, useNavigate } from 'react-router-dom';

const CadastroTemplate = ({ exibeMensagem }) => {
  const [ativo, setAtivo] = useState(true)
  const [controle, setControle] = useState(0)
  const [conexoes, setConexoes] = useState([])
  const [conexao, setConexao] = useState('')
  const [script, setScript] = useState('')
  const [itens, setItens] = useState([])
  const [valores, setValores] = useState([])
  const [retorno, setRetorno] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setScript(location.state.query)
    setAtivo(location.state.isActive == 1 ? true : false)
    const load = async () => {
      try {
        await DBClient.get("/dataVisa/database/getAll").then((res) => {
          setConexoes(res.data)
          setConexao(res.data.find(obj => obj.id == location.state.conexaoId))
        })
      } catch (error) {
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
          + error.response.data)
      }
    }
    load();
    if (location.state.nome != null) {
      setControle(1)
      conectar(location.state.conexaoName, location.state.query)
    }
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      const indentation = '    ';
      const newText = script.substring(0, start) + indentation + script.substring(end);

      setScript(newText);

      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd = start + indentation.length;
      }, 0);
    }
  }
  async function conectar(nomeDb, script) {
    if (script == null) {
      return exibeMensagem("Query vazia.")
    }
    try {
      await DBClient.get("/dataVisa/database/connect/" + nomeDb).then(
        () => executarQuery(formatarQuery(script))
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }
  async function setConnection(nomeDb) {
    try {
      await DBClient.get("/dataVisa/database/connect/" + nomeDb).then(
        (res) => { console.log(res)
          salvarTemplate()}
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  function formatarQuery(query) {
    return query
      .replace(/\s+/g, ' ')
      .trim();
  }
  async function executarQuery(query) {
    try {
      await DBClient.post("/dataVisa/template/validateQuery", query,
        { headers: { 'Content-Type': "text/plain" } }).then(
          (res) => {
            console.log(res.data)
            setRetorno(res.data)
            setItens(res.data.items)
            setValores(res.data.values)
          }
        )
    } catch (error) {
      console.log(error)
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data.mensagemRetorno)
    }
  }

  async function cadastrarTemplate() {
    if (conexao == null) {
      return exibeMensagem("Conexão não informada.")
    }
    if (script == null) {
      return exibeMensagem("Query vazia.")
    }
    if (document.getElementById("nome").value == "") {
      return exibeMensagem("Nome vazio.")
    }

    const dadosQuery = {
      templateName: document.getElementById("nome").value,
      sqlQuery: script,
      tableName: retorno.tableName,
      items: itens,
      isActive: ativo == true ? 1 : 0,
    }
    try {
      await DBClient.post("/dataVisa/template/addTemplate", dadosQuery).then(
        (res) => {
          exibeMensagem(res.data)
          conectar(conexao.nomeConexao, script)
          navigate("/inspect/templates") //Temporario
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }
  async function salvarTemplate() {
    const dadosQuery = {
      id: location.state.id,
      templateName: document.getElementById("nome").value,
      sqlQuery: script,
      tableName: retorno.tableName,
      items: itens,
      conexaoId: conexao.id,
      isActive: ativo == true ? 1 : 0
    }
    console.log(dadosQuery)
    try {
      await DBClient.put("/dataVisa/template/updateTemplate", dadosQuery).then(
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
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="col-8 font-bold mt-3">Cadastro do Template</div>
        <div className="cadastro-area grid col-2 mr-2 mt-1 mb-1 align-items-center"
          style={{ width: '140px', boxShadow: 'none', height: '60px' }}>
          <div className="col-6">Ativo</div>
          <div className="col-6">
            <InputSwitch checked={ativo} onChange={(e) => setAtivo(!ativo)} />
          </div>
        </div>
        <div className="col-1 text-right ml-5 mt-2">
          <button className="cadastro-btn-color"
            type="submit" form='cadastro' onClick={() => {
              controle == 0 ?
                cadastrarTemplate() : setConnection(conexao.nomeConexao)
            }}>
            {controle == 0 ? "Cadastrar" : "Salvar"}</button>
        </div>

        <div className="cadastro-area grid col-10 m-2">

          <div className="scroll-white col-12">

            <div className="col-12 grid">
              <div className="col-4">
                <label className='font-bold'>Nome do Template
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="nome" placeholder="Nome"
                      defaultValue={location.state.nome} required />
                  </div>
                </label>
              </div>
              <div className="col-4">
                <label className='font-bold'>Conexão
                  <Dropdown value={conexao} options={conexoes}
                    optionLabel="nomeConexao"
                    onChange={(e) => {
                        setConnection(e.value.nomeConexao)
                        setConexao(e.value)
                      }
                    }
                    style={{
                      width: "90%", background: '#EBEDEE',
                      border: '1px #374957 solid', opacity: '0.60',
                    }}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} required />
                </label>
              </div>
            </div>

            <div className="col-12 font-bold">Query</div>
            <div className="col-12">OBS: O Select já está inserido no script e não é necessário na query.</div>
            <div className="col-12">
              <InputTextarea value={script} rows={7} cols={70} id='textarea'
                onChange={(e) => setScript(e.target.value)}
                onKeyDown={handleKeyDown} required
              />
            </div>
            <div className="col-1">
              <button className='cadastro-btn-blue'
                onClick={() => {
                  conexao == null ?
                    exibeMensagem("Conexão não informada.") :
                    conectar(conexao.nomeConexao, script)
                }}>Executar</button>
            </div>

            <div className="col-12 font-bold">Output</div>
            <div className="output-area col-12">
              {itens.length > 0 ?
                <table>
                  <thead>
                    <tr>
                      {itens.map((item) => (
                        <th key={item}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {valores.map((valor) => (
                        <td key={valor}>{valor}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                : "Execute a query para trazer resultados."}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroTemplate