'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import { getProjectById } from "@/services/projects"
import { sendRequest } from "@/services/requests"
import useAuth from "@/hooks/useAuth"
import TechStackTag from "@/components/projects/TechStackTag"

function ApplyPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();

    const [state, setState] = useState({
        project: null,
        message: '',
        loading: true,
        submitting: false,
        error: null
    })

    useEffect(() => {
        const fetchProject = async() => {
            try {
                const data = await getProjectById(id);

                if (!data.is_open) {
                    router.push(`/projects/${id}`);
                    return;
                }

                if (data.request_status !== null) {
                    router.push(`/projects/${id}`);
                    return;
                }
                setState(prev => ({ ...prev, project: data, loading: false }));
            } catch (error) {
                console.error('Failed to fetch project:', error);
                setState(prev => ({ ...prev, error: 'Failed to load project' }));
            } finally {
                setState(prev => ({ ...prev, loading: false }));
            }
        }

        fetchProject();
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (state.message.trim().length < 20) {
            setState(prev => ({ ...prev, error: 'Message must be at least 20 characters long' }));
            return;
        }
        setState(prev => ({ ...prev, submitting: true }));
        setState(prev => ({ ...prev, error: null }));
        
        try {
            await sendRequest(id, state.message.trim());
            router.push(`/projects/${id}`);
        } catch (error) {
            const errorData = error.response?.data;
            // console.error('Failed to send request:', error);

            if (errorData?.error.includes('already sent')) {
                router.push(`/projects/${id}`);
                return;
            }
            else {
                setState(prev => ({ ...prev, error: errorData?.message || 'Failed to send request' }));
            }
            setState(prev => ({ ...prev, submitting: false }));
        }
    }

    if (error && state.project === null) {
        return <ProtectedRoute error={error} />;
    }

    return (
        <ProtectedRoute>
            <div>
                <h1>You &apos;re apply to:</h1>
                <p>{state.project?.title}</p>
                <p>{state.project?.owner?.username}</p>
                <p>{state.project?.description.trim().substring(0, 150)}...</p>
                <p>{state.project?.tech_stack?.join(', ')}</p>
                <p>{state.project?.roles_needed?.join(', ')}</p>
            </div>

            <div>
                <h1>Your Message</h1>
                <p>Tell the owner why you want to collaborate and what you bring to the project</p>

                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={state.message}
                        placeholder="I&apos;m interested in this project because..."
                        onChange={(e) => setState(prev => ({ ...prev, message: e.target.value }))}
                        rows={6}
                        minLength={20}
                        cols={50}
                        onError={state.error}
                        required
                    />
                    <button type="submit" disabled={state.submitting}>
                        {state.submitting ? 'Sending...' : 'Send Request'}
                    </button>
                </form>
                <Link href={`/projects/${id}`}>Cancel</Link>
            </div>
        </ProtectedRoute>
    );
}

export default ApplyPage;