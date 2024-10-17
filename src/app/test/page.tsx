'use client'
import React from 'react'
import { useState } from 'react'

const Page = () => {
  const [test, setTest] = useState('tesde')
  const click = () => {
    setTest('Test')
  }
  return <div onClick={click}>{test}</div>
}

export default Page
