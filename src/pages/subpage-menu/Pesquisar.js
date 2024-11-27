import React, { useEffect, useState } from 'react'
import Card from '../../components/Menu/Card'
import PesquisarFiltros from '../../components/Menu/PesquisarFiltros'
import { useNavigate, useOutletContext } from 'react-router-dom'
import DBClient from '../../utils/DBClient'

const Pesquisar = () => {
  const [reports, setReports] = useState([])
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const [checkedTodos, setCheckedTodos] = useState(true);
  const [checkedPizza, setCheckedPizza] = useState(true);
  const [checkedLinhas, setCheckedLinhas] = useState(true);
  const [checkedBarras, setCheckedBarras] = useState(true);
  const [checkedPlan, setCheckedPlan] = useState(true);
  const navigate = useNavigate();

  const cards = [
    {
      nome: "Pizzas mais vendidas",
      tipo: "Pizza",
      data: "27/02/2024"
    },
    {
      nome: "Vendas semanais",
      tipo: "Barras",
      data: "16/02/2024"
    },
    {
      nome: "Lucro diário",
      tipo: "Linhas",
      data: "15/02/2024"
    },
    {
      nome: "Vendas por entregador",
      tipo: "Planilha",
      data: "29/01/2024"
    }, {
      nome: "Comissões",
      tipo: "Pizza",
      data: "23/01/2024"
    }
  ]

  useEffect(() => {
    const load = async () => {
      try {
        await DBClient.get("/dataVisa/report/getActives").then((res) => {
          console.log(res.data)
          setReports(res.data)
        })
      } catch (error) {
        exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
          + error.response.data)
      }
    }
    load();
  }, [])

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className='cadastro-area grid col-4 m-2'>
          <i className='fi fi-rr-search mr-2 pt-2' />
          <input type="text" placeholder="Pesquisar pelo nome"
            style={{ border: 'none', width: '92%' }} />
        </div>

        <div className="col-12 font-bold">Resultados</div>
        <div className="grid nested-grid col-12">

          <div className="grid col-3 ml-1 mt-2"
            style={{ border: "solid 1px #366FE1", borderRadius: "5px", height: 'calc(100vh - 235px)' }}>
            <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 240px)', borderRadius: "5px" }}>

              <PesquisarFiltros
                checkedTodos={checkedTodos} setCheckedTodos={setCheckedTodos}
                checkedPizza={checkedPizza} setCheckedPizza={setCheckedPizza}
                checkedLinhas={checkedLinhas} setCheckedLinhas={setCheckedLinhas}
                checkedBarras={checkedBarras} setCheckedBarras={setCheckedBarras}
                checkedPlan={checkedPlan} setCheckedPlan={setCheckedPlan}
                qtd={reports.length} />

            </div>
          </div>

          <div className="grid col-9 ml-2">
            <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 220px)' }}>

              {reports.map((report) => (
                report.graphType == "pie" && checkedPizza == true ||
                  report.graphType == "bar" && checkedBarras == true ||
                  report.graphType == "scatter" && checkedLinhas == true ||
                  report.graphType == "spreadsheet" && checkedPlan == true ?
                  <Card
                    imgHeight={80}
                    report={report}
                    navigate={navigate}
                    exibeMensagem={exibeMensagem}
                  />
                  : null
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Pesquisar