import React from 'react'
import Plot from 'react-plotly.js'

const Planilha = ({ valores, labels, layout }) => {
  return (
    <Plot
      data={
        [
          {
            type: 'table',
            header: {
              values: labels,
              align: "center", height: 40,
              line: {width: 1, color: 'black'},
              fill: {color: "#5786E6"},
              font: {family: "Inter", size: 14, color: "white"},
            },
            cells: {
              values: valores,
              align: "center", height: 30,
              line: {width: 1, color: 'black'},
              font: {family: "Inter", size: 12, color: "black"},
            }
          }
        ]
      }
      layout={layout}
      config={{modeBarButtonsToRemove: ['toImage']}}
    />
  )
}

export default Planilha