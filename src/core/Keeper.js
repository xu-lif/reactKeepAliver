import React, { useRef, useState, useEffect } from 'react'
import { KeeperContext } from './context'

import KeepContainer from './KeepContainer'

const Keeper = ({ children }) => {
  // 用作强制更新
  const [forceUpdate, setForceUpdate] = useState(false)
  // 储存真实dom的对象
  const nodeRef = useRef({})
    // 存储待缓存的组件的React Element
    const virtualRef = useRef({})

  const activeKeyRef = useRef('')
  // 监听
  const listensRef = useRef([])

  // const resolveRef = useRef()

  // 保存缓存node
  const setNode = (key, node) => {
    nodeRef.current[key] = node
  }
  // 发布node dom
  const issueListens = () => {
    if (listensRef.current.length) {
      listensRef.current.forEach(val => {
        if (val[activeKeyRef.current]) {
          if (nodeRef.current[activeKeyRef.current]) {
            val[activeKeyRef.current](nodeRef.current[activeKeyRef.current])
          }
        }
      })
    }
  }

  const injectListens = (key, listen) => {
    let isExit = false
    listensRef.current = listensRef.current.map(val => {
      if (Object.keys(val).find(item => item === key)) {
        isExit = true
        return {
          [key]: listen
        }
      }
      return val
    })
    if (!isExit) {
      listensRef.current.push({
        [key]: listen
      })
    }
  }

  // 注入react element缓存
  // 首先判断是否已经存在缓存，存在则直接取用
  // 不存的缓存则保存
  const injectCache = (key, cache, listen) => {
    activeKeyRef.current = key
    injectListens(key, listen)
    if (nodeRef.current[key]) { // 命中缓存
      issueListens()
      return
    }
    virtualRef.current[key] = cache
    // 强制更新
    setForceUpdate(oldUpdate => !oldUpdate)
  }

  useEffect(() => {
    issueListens()
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