import React, { useRef, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { KeeperContext } from './context'

// 包裹缓存组件，向keeper组件传递缓存组件虚拟dom，并且在生成真实dom后挂载页面上
const Keep = ({
  children,
  keeperKey
}) => {
  const domContainer = useRef()
  const keeperRef = useRef()

  const formatChildren = () => {
    keeperRef.current(keeperKey, children, (dom) => {
      console.log('真实dom', dom)
      domContainer.current.appendChild(dom)
    })
  }

  useEffect(() => {
    formatChildren()
  }, [])

  return (
    <div ref={domContainer}>
     <KeeperContext.Consumer>
      {
        ({
          injectCache
        }) => {
          keeperRef.current = injectCache
        }
      }
    </KeeperContext.Consumer>
    </div>
  )
}
console.log('keep--------------')

Keep.propTypes = {
  children: PropTypes.node,
  keepKey: PropTypes.string,
}

export default Keep