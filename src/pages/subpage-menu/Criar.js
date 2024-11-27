import React from 'react'
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'
import CardModelo from '../../components/Menu/CardModelo.js'
import { useNavigate } from 'react-router-dom'

const Criar = () => {
  const navigate = useNavigate()
  function filtrar(grafico) {
    navigate("/menu/filtrar", { state: grafico })
  }

  return (
    <div className='col-12'>
      <div className="grid nested-grid">
        <div className="col-12 font-bold">Escolha o modelo</div>

        <div className='cadastro-area grid col-5 m-2'>
          <i className='fi fi-rr-search mr-2 pt-2' />
          <input type="text" placeholder="Pesquisar pelo nome"
            style={{ border: 'none', width: '92%' }} />
        </div>

        <div className="scroll-white grid col-12 mt-2" style={{height: 'calc(100vh - 240px)'}}>
          <CardModelo img={pieChart} filtrar={filtrar} tipo="Gráfico de Pizza"/>
          <CardModelo img={barChart} filtrar={filtrar} tipo="Gráfico de Barras"/>
          <CardModelo img={lineChart} filtrar={filtrar} tipo="Gráfico de Linhas"/>
          <CardModelo img={spreadsheet} filtrar={filtrar} tipo="Planilha"/>
        </div>

      </div>
    </div>
  )
}

export default Criar