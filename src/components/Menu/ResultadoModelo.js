import React from 'react'
import Pizza from '../../components/Templates/Pizza.js'
import Barras from '../../components/Templates/Barras.js'
import Linhas from '../../components/Templates/Linhas.js'
import Planilha from '../../components/Templates/Planilha.js'

const ResultadoModelo = ({ height, modelo }) => {

    return (
        <div className="col-9">
            {modelo.graphType == "pie" ?
                <Pizza
                    valores={modelo.reportValues}
                    labels={modelo.reportLabels}
                    layout={
                        {
                            width: 600,
                            height: height - 230,
                            title: modelo.reportName,
                            margin: {
                            r: 30, l: 110, t: 40, b: 20
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
                                width: 600,
                                height: height - 230,
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
                                    width: 600,
                                    height: height - 230,
                                    title: modelo.reportName,
                                    margin: {
                                        r: 10, l: 50, t: 50, b: 30
                                    }
                                }}
                        /> :
                        <Planilha
                            labels={["Pagamento", "Valor"]}
                            valores={[
                                ["Cartão", "Dinheiro", "Online"],
                                ["68.00","10.00","129.00"]
                            ]}
                            layout={
                                {
                                    width: 600,
                                    height: height - 230,
                                    title: "Planilha de Exemplo",
                                    margin: {
                                        r: 30, l: 50, t: 50, b: 30
                                    }
                                }}
                        />
            }
        </div>
    )
}

export default ResultadoModelo