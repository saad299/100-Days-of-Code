'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../components/layout/ProtectedRoute'
import useAuth from '@/hooks/useAuth'
import RequestCard from '@/components/requests/RequestCard'
import ProjectCard from '@/components/projects/ProjectCard'
import { getMyProjects } from '@/services/projects'
import { getProjectRequests } from '@/services/requests'

function DashboardPage() {
    const [projects, setProjects] = useState([])
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const myProjects = await getMyProjects()
                setProjects(myProjects)
                const requestPromises = myProjects.map(project => getProjectRequests(project.id)).then(requests => requests.map(request => ({
                    ...request,
                    projectTitle: project.title
                })))
                setRequests(requestPromises)
                .catch(() => [])
            const allProjectRequests = await Promise.all(requestPromises)
            setRequests([allProjectRequests])
            } catch (err) {
                console.error('Error fetching dashboard data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    })

    const handleRequetUpdateStatus = (requestId, newStatus) => {
        setRequests(requests.map(request => request.id === requestId ? { ...request, status: newStatus } : request))
    }

    return (
        <ProtectedRoute>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome, {user?.username}</p>
            </div>
        </ProtectedRoute>
    )
}

export default DashboardPage