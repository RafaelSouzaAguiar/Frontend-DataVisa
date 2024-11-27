import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from "primereact/checkbox";
import Pizza from '../../components/Templates/Pizza'
import Barras from '../../components/Templates/Barras'
import Linhas from '../../components/Templates/Linhas'
import Planilha from '../../components/Templates/Planilha'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import DBClient from '../../utils/DBClient';

const Filtrar = () => {
  const navigate = useNavigate()
  const [session, alteraModo, exibeMensagem] = useOutletContext();

  const [area, setArea] = useState({})
  const [areas, setAreas] = useState([])

  const [item, setItem] = useState('')
  const [itemLabel, setItemLabel] = useState('')
  const [items, setItems] = useState([])

  // const [order, setOrder] = useState('Crescente')
  // const [orderBy, setOrderBy] = useState('')
  // const [where, setWhere] = useState("Nenhuma")
  const [modelo, setModelo] = useState('')
  const [checkedPublico, setCheckedPublico] = useState(false)
  const location = useLocation()

  const modelos = ["Gráfico de Pizza", "Gráfico de Linhas", "Gráfico de Barras", "Planilha"]
  // const orders = ["Crescente", "Decrescente"]
  // const wheres = ["Nenhuma", "Igual a", "Maior que", "Menor que", "Entre"]
  const dropStyle = {
    width: "90%",
    background: '#EBEDEE',
    border: '1px #374957 solid',
    opacity: '0.60',
  }

  useEffect(() => {
    const load = async () => {
      try {
        await DBClient.get("/dataVisa/template/getActives").then(
          (res) => {
            setAreas(res.data)
            //console.log(res.data)
          })
      } catch (error) {
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
          + error.response.data)
      }
    }
    load();
    setModelo(location.state)
  }, [])
  async function conectar(nomeDb) {
    try {
      await DBClient.get("/dataVisa/database/connect/" + nomeDb).then(
        () => gerar()
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function gerar() {
    const dadosReport = {
      reportName: document.getElementById("nome").value,
      templateName: area.nome,
      sqlQuery: area.query,
      selectedItem: item,
      selectedLabel: itemLabel,
      graphType: modelo == "Gráfico de Barras" ? "bar" :
        modelo == "Gráfico de Linhas" ? "scatter" :
          modelo == "Gráfico de Pizza" ? "pie" : "table",
      conexaoName: area.conexaoName,
      tablePermition: area.tablePermition,
      isPublic: checkedPublico == true ? 1 : 0
    }
    console.log(dadosReport)
    try {
      DBClient.post("/dataVisa/report/addReport",
        dadosReport
      ).then((res) => {
        console.log(res.data)
        navigate("/menu/gerar", { state: res.data })
      })
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="col-10 font-bold">Crie uma personalização para o modelo</div>
        <div className="col-2">
          <button className='cadastro-btn-blue' onClick={() => conectar(area.conexaoName)
            //navigate("/menu/gerar", { state: modelo })
          }>
            Avançar</button>
        </div>

        <div className="col-12 grid mt-2">
          <div className="card-area col-5 grid ml-3">
            <div className="scroll-white col-12">
              <div className="col-12 grid">

                <label className='font-bold col-10'>Nome do Modelo
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE' }}
                      type="text" id="nome" placeholder="Nome" required />
                  </div>
                </label>

                <label className='font-bold col-10'>Tipo de Modelo
                  <Dropdown value={modelo} options={modelos}
                    onChange={(e) => setModelo(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-10'>Área
                  <Dropdown value={area} options={areas} optionLabel='nome'
                    onChange={(e) => {
                      setArea(e.value)
                      setItems(e.value.items)
                    }} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-10'>Item
                  <Dropdown value={item} options={items}
                    onChange={(e) => setItem(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-10'>Legenda
                  <Dropdown value={itemLabel} options={items}
                    onChange={(e) => setItemLabel(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                {/* <label className='font-bold col-6'>Ordenação
                  <Dropdown value={order} options={orders}
                    onChange={(e) => setOrder(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-6'>Ordenar por
                  <Dropdown value={orderBy} options={items}
                    onChange={(e) => setOrderBy(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-6'>Limite
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="limit" placeholder="Valor limite" required />
                  </div>
                </label>

                <label className='font-bold col-6'>Condição
                  <Dropdown value={where} options={wheres}
                    onChange={(e) => setWhere(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label> */}

                {/* {where != "Nenhuma" ?
                  <label className='font-bold col-6'>{where == "Entre" ? "Valor minimo" : "Valor"}
                    <div className="input-div">
                      <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                        type="text" id="valor" required />
                    </div>
                  </label> : <div />}

                {where == "Entre" ?
                  <label className='font-bold col-6'>Valor Maximo
                    <div className="input-div">
                      <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                        type="text" id="valorMax" required />
                    </div>
                  </label> : <div />} */}

                <label className='font-bold col-6'>Tornar Público
                  <Checkbox inputId="checkTodos"
                    onChange={e => setCheckedPublico(e.checked)} checked={checkedPublico}>
                  </Checkbox>
                </label>
              </div>
            </div>
          </div>


          <div className="card-area grid col-6 ml-4 relative">
            <div className='preview'>

              {modelo == "Gráfico de Pizza" ?
                <Pizza
                  valores={["25", "30", "67", "6"]}
                  labels={["Valor 1", "Valor 2", "Valor 3", "Valor 4"]}
                  layout={
                    {
                      width: 500,
                      height: 350,
                      title: "Grafico de Exemplo",
                      margin: {
                        r: 30, l: 110, t: 40, b: 20
                      }
                    }
                  }
                />
                :
                modelo == "Gráfico de Barras" ?
                  <Barras
                    valores={[31, 23, 57]}
                    labels={["Valor 1", "Valor 2", "Valor 3"]}
                    layout={
                      {
                        width: 500,
                        height: 350,
                        title: "Grafico de Exemplo",
                        margin: {
                          r: 30, l: 50, t: 50, b: 30
                        }
                      }}
                  />
                  :
                  modelo == "Gráfico de Linhas" ?
                    <Linhas
                      valores={[15, 5, 12, 43]}
                      labels={["Valor 1", "Valor 2", "Valor 3", "valor 4"]}
                      layout={
                        {
                          width: 500,
                          height: 350,
                          title: "Grafico de Exemplo",
                          margin: {
                            r: 30, l: 50, t: 50, b: 30
                          }
                        }}
                    />
                    :
                    <Planilha
                      labels={["Valor 1", "Valor 2", "Valor 3"]}
                      valores={[
                        ["Registro 1", "Registro 2", "Registro 3"],
                        ["Registro 1", "Registro 2", "Registro 3"],
                        ["Registro 1", "Registro 2", "Registro 3"],
                      ]}
                      layout={
                        {
                          width: 500,
                          height: 350,
                          title: "Planilha de Exemplo",
                          margin: {
                            r: 30, l: 50, t: 50, b: 30
                          }
                        }}
                    />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filtrar