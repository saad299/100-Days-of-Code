'use client'

import ProtectedRoute from '../../components/layout/ProtectedRoute'
import useAuth from '@/hooks/useAuth'

function DashboardPage() {
    const { user } = useAuth()
    
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