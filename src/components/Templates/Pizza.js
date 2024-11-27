import React from 'react'
import Plot from 'react-plotly.js'

const Pizza = ({ valores, labels, layout }) => {
    
    return (
        <Plot
            data={
                [
                    {
                        values: valores,
                        labels: labels,
                        type: 'pie'
                    }]
            }
            layout={layout}
            config={{modeBarButtonsToRemove: ['toImage']}}
        />

    )
}

export default Pizza