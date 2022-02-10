import React, { useRef, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { KeeperContext } from './context'

// 包裹缓存组件，向keeper组件传递缓存组件虚拟dom，
// 并且在生成真实dom后挂载页面上
const Keep = ({
  children,
  keeperKey,
  // style={},
  // rootClass=""
}) => {
  const domContainer = useRef()
  const keeperRef = useRef()

  const formatChildren = () => {
    keeperRef.current(keeperKey, children, (dom) => {
      // 将缓存的组件挂载至页面
      if (domContainer.current && dom) domContainer.current.appendChild(dom)
    })
  }

  // 这里先不考虑，重读渲染的问题
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
  rootClass: PropTypes.string,
  style: PropTypes.object,
}

export default Keep