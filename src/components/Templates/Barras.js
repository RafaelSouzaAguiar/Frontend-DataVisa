import React from 'react'
import Plot from 'react-plotly.js'

const Barras = ({ valores, labels, layout }) => {

    return (
        <Plot
            data={
                [
                    {
                        x: labels,
                        y: valores,
                        name: 'vendas', // legenda
                        type: 'bar',
                    }
                ]
            }
            layout={layout}
            config={{modeBarButtonsToRemove: ['toImage']}}
        />
    )
}

export default Barras