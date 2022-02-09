import React, { useRef, useState, useEffect } from 'react'
import { KeeperContext } from './context'

import KeepContainer from './KeepContainer'

const Keeper = ({ children }) => {
  // 用作强制更新
  const [forceUpdate, setForceUpdate] = useState(false)
  // 储存真实dom的对象
  const nodeRef = useRef({})
  const activeKeyRef = useRef('')
  // 存储待缓存的组件的virtual dom
  const virtualRef = useRef({})
  // 监听
  const listensRef = useRef([])

  // const resolveRef = useRef()

  // 保存缓存node
  const setNode = (key, node) => {
    nodeRef.current[key] = node
  }

  const injectCache = (key, cache, listen) => {
    activeKeyRef.current = key
    virtualRef.current[key] = cache
    listensRef.current.push({
      [key]: listen
    })
    setForceUpdate(oldUpdate => !oldUpdate)
  }

  useEffect(() => {
    // resolveRef.current(nodeRef.current[activeKeyRef.current])
    // console.log(nodeRef.current)
    console.log('listensRef.current', listensRef.current)
    if (listensRef.current.length) {
      listensRef.current.forEach(val => {
        if (val[activeKeyRef.current]) {
          console.log(nodeRef.current)
          if (nodeRef.current[activeKeyRef.current]) {
            val[activeKeyRef.current](nodeRef.current[activeKeyRef.current])
          }
        }
      })
    }
  }, [forceUpdate])

  // 获取缓存node
  const getNode = (key) => {
    if (Object.keys(nodeRef.current).find(val => val === key)) {
      return nodeRef.current[key]
    }
    return null
  }

  console.log('keeper--------------')

  return (
    <div>
      <KeeperContext.Provider value={{
        getNode,
        injectCache,
        nodes: nodeRef.current
      }}>
        {
          children
        }
      </KeeperContext.Provider>
      <KeepContainer 
        virtual={{...virtualRef.current}}
        activeKey={activeKeyRef.current}
        setNode={setNode}
      />
    </div>

  )
}
export default Keeper