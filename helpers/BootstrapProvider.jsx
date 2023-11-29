"use client"

import React, { useEffect } from "react"

const BootstrapProvider = ({ children }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])
  return <div>{children}</div>
}

export default BootstrapProvider
