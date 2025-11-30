"use client"
import { lazy, Suspense } from "react"
import Loader from "@/components/loader"
const Blogs = lazy(()=> import("../../components/Blogs"))

const Writes = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-950 via-slate-900 to-cyan-950 pt-20">
      <Suspense fallback={<Loader/>}>
        <Blogs/>
      </Suspense>
    </div>
  )
}

export default Writes