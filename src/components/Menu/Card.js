import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'
import DBClient from '../../utils/DBClient';

const Card = ({ report, imgHeight, navigate, exibeMensagem, contador, setContador }) => {

  const [info, setInfo] = useState(false)

  const img = report.graphType == "pie" ? pieChart
    : report.graphType == "bar" ? barChart
      : report.graphType == "scatter" ? lineChart : spreadsheet

  const tipo = report.graphType == "pie" ? "Pizza"
    : report.graphType == "Barras" ? barChart
      : report.graphType == "Linhas" ? lineChart : "Planilha"

  async function deletarTemplate(reportId) {
    try {
      await DBClient.delete("/dataVisa/report/delete/" + reportId).then(
        (res) => {
          setInfo(false)
          setContador(contador + 1)
          exibeMensagem(res.data)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }

  function formatarData(data) {
    const newdata = new Date(data);

    const dataFormatada = newdata.toLocaleDateString("pt-BR");
    const horaFormatada = newdata.toLocaleTimeString("pt-BR", { hour12: false });

    return `${dataFormatada} ${horaFormatada}`
  }

  const footer = (
    <div className='relative mt-5'>

      <div className="text-left absolute bottom-0">

        <Button label="Remover" icon="fi fi-rr-cross" severity="danger"
          onClick={() => deletarTemplate(report.id)} />
      </div>

      <div className='text-right absolute bottom-0 right-0'>

        {/* <Button label="Editar" icon="fi fi-rr-pencil"
          onClick={() => navigate("/menu/filtrar", {state: report} )}/> */}

        <Button label="Gerar" icon="fi fi-rr-check"
          onClick={() => navigate("/menu/gerar", {state: report} )} />
      </div>
    </div>
  )


  return (
    <div className="card-area col-3 grid m-2 ml-4">

      <Dialog visible={info} modal
        header={report.reportName}
        footer={footer}
        style={{ width: '40%' }}
        onHide={() => { if (!info) return; setInfo(false); }}>
        <div className="grid mt-1 mb-1">
          <div className="col-7">
            <p>
              <b>Criado em:</b> {formatarData(report.creationDate)} <br />
              <b>Criado por:</b> {report.creatorName} <br />
              <b>Tipo:</b> {tipo} <br />
              <b>Area:</b> {report.templateName} <br />
            </p>
          </div>
          <div className="col-3 ml-2">
            <img src={img} alt="" style={{ height: '100px' }} />
          </div>
        </div>

      </Dialog>

      <div className="col-10 font-bold">{report.reportName}</div>

      <div className="col-2 font-bold">
        <i className='card-info-btn fi fi-rr-info'
          onClick={() => setInfo(true)} />
      </div>

      <div className="col-12" style={{ fontSize: '12px' }}>
        Criado em: {formatarData(report.creationDate)}
        <hr />
      </div>


      <div className="col-12 text-center" style={{ cursor: 'pointer' }}
        onClick={() => navigate("/menu/gerar",  {state: report} )}>
        <img src={img} alt="" style={{ height: imgHeight }} />
      </div>
    </div>
  )
}

export default Card