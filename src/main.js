import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'
import { Keeper, Keep } from './index'

// test例子

const Count = () => {
  const [number, setNumber] = useState(0)
  return (
   <div>{number}
    <button onClick={() => {
      setNumber((oldNum => oldNum + 1))
    }}>点</button>
   </div>
  )
}

const App = () => {
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <Keep keeperKey="count"><Count /></Keep>}
      <button onClick={() => setShow(oldShow => !oldShow)}>显示</button>
    </div>
  )
}

ReactDom.render(<Keeper><App /></Keeper>, document.getElementById('root'))