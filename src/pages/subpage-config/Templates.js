import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog'
import DBClient from '../../utils/DBClient';
import Loading from '../../components/Config/Loading.js'

const Templates = () => {
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const [controle, setControle] = useState(0);
  const [loading, setLoading] = useState(true)
  const [templates, setTemplates] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        await DBClient.get("/dataVisa/template/getAll").then(
          (res) => {
            setTemplates(res.data)
            console.log(res.data)
            setLoading(false)
          }
        )
      } catch (error) {
        console.log(error)
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
          error.response.data)
      }
    }
    load()
  }, [controle])

  function formatarData(data) {
    const newdata = new Date(data);

    const dataFormatada = newdata.toLocaleDateString("pt-BR");
    const horaFormatada = newdata.toLocaleTimeString("pt-BR", { hour12: false });

    return `${dataFormatada} ${horaFormatada}`
  }
  async function templateCadastro(template) {
    try {
      await DBClient.get("/dataVisa/template/getTemplate/" + template).then(
        (res) => {
          console.log(res.data)
          navigate("/inspect/cadastro/template", { state: res.data })
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }
  const confirmDelete = (template) => {
    confirmDialog({
      message: 'Deseja mesmo excluir o template ' + template + '?',
      header: 'Confirmar ação',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      rejectLabel: "Não",
      acceptLabel: "Sim",
      accept() {
        deletarTemplate(template)
      },
      reject() {
        return
      }
    })
  }
  async function deletarTemplate(templateNome) {
    try {
      await DBClient.delete("/dataVisa/template/deleteTemplate/" + templateNome).then(
        (res) => {
          exibeMensagem(res.data)
          setControle(controle + 1)
        }
      )
    } catch (error) {
      console.log(error)
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="grid col-10">
          <div className='col-12 font-bold'>
            Gerenciamento de Templates
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
          <button className='cadastro-btn-blue m-1 w-full' onClick={() =>
            navigate("/inspect/cadastro/template", {
              state: {
                nome: null,
              }
            })}>Adicionar</button>
        </div>

        <div className="cadastro-area m-2 mr-3 w-full"
          style={{ height: 'calc(100vh - 250px)' }}>

          <div className='grid col-12 ml-1 font-bold text-center mt-2'
            style={{ height: '50px', width: '97.5%' }}>
            <div className='col-1'>ID</div>
            <div className='col-2'>Nome</div>
            <div className='col-2'>Conexão</div>
            <div className="col-2">Tabela</div>
            <div className='col-2'>Última Mod.</div>
            <div className="col-1">Status</div>
            <div className='col-2'>Ações</div>
            <div className="col-12"><hr /></div>
          </div>

          <div className="scroll-white col-12 text-center ml-1 mt-2"
            style={{ height: 'calc(100vh - 320px)', width: '99%' }}>

            {loading == true ?
              <div className="grid col-4 col-offset-5">
                <Loading color={"blue"} height={100} width={100} />
              </div> :
              templates.map((template) => (

                <div className='grid col-12' key={template.id}>
                  <div className="col-1 mt-2">{template.id}</div>
                  <div className="col-2 mt-2">{template.nome}</div>
                  <div className="col-2 mt-2">{template.conexaoName}</div>
                  <div className="col-2 mt-2">{template.tableName}</div>
                  <div className="col-2 mt-2">{formatarData(template.lastModification)}</div>
                  <div className="col-1 mt-2">{template.isActive == 1 ? "Ativo" : "Inativo"}</div>
                  <div className="col-2">
                    <button className='cadastro-btn-blue mr-2'
                      onClick={() => templateCadastro(template.id)}>Editar</button>
                    <button className='cadastro-btn-red'
                      onClick={() => confirmDelete(template.nome)}>Deletar</button>
                  </div>
                </div>
              ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Templates