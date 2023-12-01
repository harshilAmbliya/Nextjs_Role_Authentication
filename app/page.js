"use client"

import { UserContext } from "@/context/userContext"
import { useContext } from "react"

export default function Home() {

  const { user } = useContext(UserContext)
  console.log("user", user)
  return (
    <>
      hello
    </>
  )
}
