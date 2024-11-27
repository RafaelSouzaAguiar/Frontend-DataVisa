import React, { useEffect, useState } from 'react'
import Card from '../../components/Menu/Card'
import { useNavigate, useOutletContext } from 'react-router-dom'
import DBClient from '../../utils/DBClient';


const Recentes = () => {
  const [reports, setReports] = useState([])
  const [contador, setContador] = useState(0)
  const [session, alteraModo, exibeMensagem] = useOutletContext();
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
    },
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
  }, [contador])

  return (
    <div className='col-12'>

      <div className="grid nested-grid">

        <div className="col-12 font-bold">Recentes</div>

        <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 170px)' }}>

          <div className="col-3 grid m-2 ml-4 relative" id='create-btn' onClick={() => navigate("/menu/criar")}>
            <div className="col-12 mt-5 text-center">
              <div>
                <i className='fi fi-rr-plus' style={{ fontSize: "70px" }} />
              </div>
              <div className='mb-5 ml-3 absolute bottom-0'>Crie seu gráfico ou tabela</div>
            </div>
          </div>

          {reports.map((report) => (
            <Card
              imgHeight={100}
              report={report}
              navigate={navigate}
              exibeMensagem={exibeMensagem}
              setContador={setContador}
              contador={contador}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default Recentes