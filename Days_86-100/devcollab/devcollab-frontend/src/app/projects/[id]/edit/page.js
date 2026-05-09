'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import ProjectForm from "@/components/projects/ProjectForm"
import { getProjectById, updateProject } from "@/services/projects"
import useAuth from "@/hooks/useAuth"

function EditProjectPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    
    const [state, setState] = useState({
        loading: true,
        project: null,
        submitting: false,
        error: null
    })

    useEffect(() => {
        const fetchProject = async() => {
            try {
                const data = await getProjectById(id);
                if (user && data.owner_data.username !== user.username) {
                    router.push(`/projects/${id}`);
                    return;
                }
                setState(prev => ({ ...prev, project: data, loading: false }));
                // setState({ ...state, project: data, loading: false });
            } catch (error) {
                console.error('Failed to fetch project:', error);
                setState(prev => ({ ...prev, error: 'Failed to load project', loading: false }));
            }
        }

        fetchProject()
    })

    const handleSubmit = async(formData) => {
        setState(prev => ({ ...prev, loading: true }));
        setState(prev => ({ ...prev, error: null }));
        
        try {
            await updateProject(id, formData);
            router.push(`/projects/${id}`);
        } catch (error) {
            console.error('Failed to update project:', error);
            setState(prev => ({ ...prev, error: 'Failed to update project', submitting: false }));
        }
    }

    if (loading) {
        return <div>Loading.....</div>
    }

    if (error && state.project === null) {
        return <ProtectedRoute error={error} />;
    }

    return (
        <ProtectedRoute>
            <div>
                <h1>Edit Project</h1>
                <p>{state.project?.title}</p>
            </div>

            <ProjectForm 
                project={state.project}
                onSubmit={handleSubmit}
                loading={state.loading}
                error={state.error}
            />
        </ProtectedRoute>
    )
}

export default EditProjectPage;