import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * 待缓存的组件渲染成真实dom的容器
 */

const KeepContainer = ({ virtual, activeKey, setNode }) => {
  const curCache = virtual[activeKey] || null
  const domRef = useRef()
  useEffect(() => {
    setNode(activeKey, domRef.current)
  }, [activeKey])
  console.log('curCache', virtual)
  return (
    <div style={{
      display: 'none'
    }}
    
    >
      <div ref={domRef}>
      {
        curCache
      }
      </div>
      
    </div>
  )
}

KeepContainer.propTypes = {
  virtual: PropTypes.object,
  activeKey: PropTypes.string,
  setNode: PropTypes.func,
}

export default KeepContainer