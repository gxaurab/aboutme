"use client"
import { lazy, Suspense } from "react"
import Loader from "@/components/loader"
const ProjectsDisplay = lazy(()=> import("../../components/Projects/ProjectsDisplay"))

const Projects = () => {
  return (
    <div className="pt-20 min-h-screen bg-cyan-950">
    <Suspense fallback={<Loader/>}>
      <ProjectsDisplay/>
    </Suspense>
    </div>
  )
}

export default Projects