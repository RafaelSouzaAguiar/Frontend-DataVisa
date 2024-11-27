import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({color, width, height}) => {
  return (
    <ReactLoading type="spin" color={color} height={height} width={width} />
  )
}

export default Loading