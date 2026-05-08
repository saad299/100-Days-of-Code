'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getProjects } from "@/services/projects"
import ProjectCard from "@/components/projects/ProjectCard"

function ProjectsPage() {
    const [projects, setProjects] = useState([])
    let [loading, setLoading] = true
    let [error, setError] = null

    const searchParams = useSearchParams()
    const router = useRouter()

    const search = searchParams.get('search') || ''
    const techStack = searchParams.get('tech_stack') || ''
    const role = searchParams.get('role') || ''

    let [searchInput, setSearchInput] = useState(search)
    let [techStackInput, setTechStackInput] = useState(techStack)
    let [roleInput, setRoleInput] = useState(role)

    useEffect(() => {
        setLoading(true)
        
        const fetchProjects = async() => {
            try {
                const params = {}
                const data = await getProjects(params)
                setProjects(data)
            } catch (err) {
                const errMessage = "Failed to load projects"
                setError(errMessage)
            } finally {
                setLoading(false)
            }
        }
        
        fetchProjects()
    }, [search, techStack, role, setError, setLoading])

    const handleSearch = (e) => {
        e.preventDefault()
        const queryString = new URLSearchParams({
            search: searchInput,
            tech_stack: techStackInput,
            role: roleInput
        }).toString()
        router.push('/projects?' + queryString)
    }

    const handleClearFilters = () => {
        router.push('/projects')
        setSearchInput('')
        setTechStackInput('')
        setRoleInput('')
    }
    
    return (
        <div>
            <h1>Browse Projects</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => searchInput(e.target.value)}
                />
                <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => techStackInput(e.target.value)}
                />
                <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => roleInput(e.target.value)}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleClearFilters}>Clear</button>
            </form>
            {
                loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : projects === null ? (
                    <>
                        <p>No projects found</p>
                        <p>{search || techStack || role ? 'Try clearing your filters' : 'Try adjusting your search criteria'}</p>
                        <Link href="/projects/new">Or post your own project</Link>
                    </>
                ) : (
                    <>
                        <p>{projects.length} project(s) found</p>
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ProjectsPage;