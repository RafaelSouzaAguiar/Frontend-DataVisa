import React from 'react'
import { Dialog } from 'primereact/dialog'
import Pizza from '../../components/Templates/Pizza.js'
import Barras from '../../components/Templates/Barras.js'
import Linhas from '../../components/Templates/Linhas.js'
import Planilha from '../../components/Templates/Planilha.js'

const VisualizarModelo = ({ height, modelo, view, setView }) => {

  return (
    <Dialog visible={view} modal
      onHide={() => { if (!view) return; setView(false); }}
      content={({ hide }) => (
        <div className='grid text-center'
          style={{ borderRadius: "5px", backgroundColor: "white", minWidth: "800px" }}>

          <div className="col-1 ">
            <button className='cadastro-btn-blue' onClick={(e) => hide(e)}>
              Fechar</button>
          </div>

          <div className="col-12">
            {modelo.graphType == "pie" ?
              <Pizza
                valores={modelo.reportValues}
                labels={modelo.reportLabels}
                layout={
                  {
                    width: 850,
                    height: height - 120,
                    title: modelo.reportName,
                    font: {
                      size: 18,
                    },
                    margin: {
                      r: 30, l: 110, t: 60, b: 20
                    }
                  }
                }
              />
              : modelo.graphType == "bar" ?
                <Barras
                  valores={modelo.reportValues}
                  labels={modelo.reportLabels}
                  layout={
                    {
                      width: 700,
                      height: height - 120,
                      title: modelo.reportName,
                      margin: {
                        r: 30, l: 50, t: 50, b: 30
                      }
                    }} />
                : modelo.graphType == "scatter" ?
                  <Linhas
                    valores={modelo.reportValues}
                    labels={modelo.reportLabels}
                    layout={
                      {
                        width: 700,
                        height: height - 120,
                        title: modelo.reportName,
                        margin: {
                          r: 30, l: 50, t: 50, b: 30
                        }
                      }}
                  /> :
                  <Planilha
                    labels={["Pagamento", "Valor"]}
                    valores={[
                      ["Cartão", "Dinheiro", "Online"],
                      ["68.00", "10.00", "129.00"]
                    ]}
                    layout={
                      {
                        width: 700,
                        height: height - 120,
                        title: "Planilha de Exemplo",
                        margin: {
                          r: 30, l: 50, t: 50, b: 30
                        }
                      }}
                  />
            }
          </div>
        </div>
      )}
    ></Dialog>
  )
}

export default VisualizarModelo