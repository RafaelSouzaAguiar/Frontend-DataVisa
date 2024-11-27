import React, { useState } from 'react'
import logo from '../../assets/logoOriginal.png'
import ResultadoModelo from '../../components/Menu/ResultadoModelo.js'
import VisualizarModelo from '../../components/Menu/VisualizarModelo.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Gerar = () => {
  const [view, setView] = useState(false)
  const [contador, setContador] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const nomeGrafico = "Grafico de teste" // para teste

  const printDoc = () => {
    const input = document.getElementById('resultado')
    const height = document.getElementById("resultado").clientHeight

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(
        {
          orientation: "landscape",
          format: [height * 0.4, 320]
        }
      )
      pdf.addImage(imgData, 'JPEG', 0, 0)
      pdf.save("DataVisa - " + nomeGrafico + ".pdf")
    })
  }

  window.onresize = function () {
    setContador(contador + 1)
  };

  return (

    <div className='col-12'>

      <VisualizarModelo
        height={window.innerHeight}
        modelo={location.state}
        view={view}
        setView={setView} />

      <div className="grid nested-grid">

        <div className="col-12 grid">
          <div className="col-11 font-bold" style={{ fontSize: '25px' }}>
            Resultado
          </div>
          <div className="col-1">
            <button className='cadastro-btn-blue' onClick={() => navigate("/menu/recentes")}>
              Concluir</button>
          </div>
        </div>

        <div className="card-area grid ml-3 mb-3 mr-3 w-full" id="area"
          style={{ height: "calc(100vh - 200px)" }}>

          <div className='col-9 grid' id='resultado'>
            <div className="col-2 mt-4 ml-4">
              <img src={logo} alt="" style={{ height: "90px" }} />
            </div>

            <div className="col-9" id="teste">
              <ResultadoModelo
                height={window.innerHeight}
                modelo={location.state} />
            </div>
          </div>

          <div className="col-3 text-center">
            <div className="col-12">
              <button className='gerar-btn' onClick={() => setView(true)}>
                Visualizar <i className='fi-rr-eye ml-1' />
              </button>
            </div>
            <div className="col-12">
              <button className='gerar-btn' onClick={() => printDoc()}>
                Baixar <i className='fi-rr-download ml-1' />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Gerar