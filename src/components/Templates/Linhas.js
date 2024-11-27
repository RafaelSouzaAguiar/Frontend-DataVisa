import React from 'react'
import Plot from 'react-plotly.js'

const Linhas = ({ valores, labels, layout }) => {

  return (
    <Plot
      data={
        [
          {
            x: labels,
            y: valores,
            type: 'scatter'
          }
        ]
      }
      layout={layout}
      config={{modeBarButtonsToRemove: ['toImage']}}
    />
  )
}

export default Linhas