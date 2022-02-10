import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'
import { Keeper, Keep } from './index'

// test例子

const Count = () => {
  const [number, setNumber] = useState(0)
  return (
   <div
    style={{
      height: '200px',
      width: '100px',
      overflowY: 'auto',
      border: '1px solid gray'
    }}
   >{number}
    <button onClick={() => {
      setNumber((oldNum => oldNum + 1))
    }}>点</button>
    <select>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
    <div style={{
      width: '100px',
      height: '800px'
    }}></div>
   </div>
  )
}

const App = () => {
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <Keep keeperKey="count"><Count /></Keep>}
      {/* {show && <Keep keeperKey="sec"><Count /></Keep>} */}
      <button onClick={() => setShow(oldShow => !oldShow)}>显示</button>
    </div>
  )
}

ReactDom.render(<Keeper><App /></Keeper>, document.getElementById('root'))