"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getProjects } from "@/services/projects";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const heroImage = "/project_detail.png";

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
      return;
    }

    async function fetchRecentProjects() {
      try {
        const data = await getProjects();

        // show only first 3 projects on landing page
        setRecentProjects(data.slice(0, 3));
      } catch {
        // silently fail — landing page works without projects
      } finally {
        setLoading(false);
      }
    }
    fetchRecentProjects();
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-left">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 sm:mb-5 leading-tight">
                Find developers to build
                <br className="hidden md:block" /> with you
              </h1>

              <p className="font-body text-base sm:text-lg text-gray-500 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
                DevCollab connects developers who have project ideas with developers
                who want to contribute. Post your project, find collaborators, and
                build something together.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                {user ? (
                  <>
                    <Link
                      href="/projects/new"
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium px-7 py-3 rounded-xl transition-colors text-sm min-h-11 flex items-center justify-center"
                    >
                      Post a Project
                    </Link>
                    <Link
                      href="/projects"
                      className="w-full sm:w-auto text-gray-700 font-medium px-7 py-3 rounded-xl transition-colors text-sm min-h-11 flex items-center justify-center hover:underline"
                    >
                      Browse Projects
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium px-7 py-3 rounded-xl transition-colors text-sm min-h-11 flex items-center justify-center"
                    >
                      Get Started. It&apos;s Free
                    </Link>
                    <Link
                      href="/projects"
                      className="w-full sm:w-auto text-gray-700 font-medium px-7 py-3 rounded-xl transition-colors text-sm min-h-11 flex items-center justify-center hover:underline"
                    >
                      Browse Projects
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="relative h-64 md:h-80 lg:h-96">
              {heroImage && !imageError ? (
                <Image
                  src={heroImage}
                  alt="DevCollab project card preview"
                  fill
                  className="rounded-2xl shadow-lg object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                  <p className="text-gray-400 text-sm">Image failed to load</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-gray-900 text-left mb-8 sm:mb-12">
          How it works
        </h2>

        <div className="space-y-8 md:space-y-12">
          <div className="flex gap-6 items-start">
            <span className="font-display text-5xl md:text-6xl font-bold text-blue-500">01</span>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Post your project</h3>
              <p className="font-body text-base text-gray-500 leading-relaxed">
                Share what you are building. Describe the project, list the tech stack, and specify the roles you need.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="font-display text-5xl md:text-6xl font-bold text-blue-500">02</span>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Receive requests</h3>
              <p className="font-body text-base text-gray-500 leading-relaxed">
                Developers who are interested send collaboration requests with a message explaining what they bring to the project.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <span className="font-display text-5xl md:text-6xl font-bold text-blue-500">03</span>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Build together</h3>
              <p className="font-body text-base text-gray-500 leading-relaxed">
                Review requests, accept the right collaborators, and start building. Track everything from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects - Only shown when there are projects */}
      {!loading && recentProjects.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-gray-900">
                Recent Projects
              </h2>
              <p className="font-body text-sm text-gray-500 mt-1">
                Projects looking for collaborators right now
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm text-blue-500 hover:underline font-medium"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-0">
            {recentProjects.map((project, index) => (
              <div key={project.project_id}>
                {index === 0 ? (
                  <div className="bg-blue-500 border border-blue-600 rounded-xl p-6 mb-6">
                    <Link href={`/projects/${project.project_id}`} className="block">
                      <h3 className="font-display text-2xl font-semibold text-white mb-2 hover:text-blue-100 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-body text-blue-50 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(project.tech_stack) ? (
                          project.tech_stack.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs bg-blue-100 text-blue-900 px-3 py-1.5 rounded-full font-medium">
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs bg-blue-100 text-blue-900 px-3 py-1.5 rounded-full font-medium">
                            {project.tech_stack || 'No tech stack specified'}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 py-4">
                    <Link href={`/projects/${project.project_id}`} className="block">
                      <h3 className="font-display text-lg font-medium text-gray-900 mb-1 hover:text-blue-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-body text-gray-500 text-sm line-clamp-1">
                        {project.description}
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Ready to find your next collaborator?
          </h2>
          <p className="font-body text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm leading-relaxed px-2">
            Join DevCollab, post your project, and connect with developers who
            want to build with you.
          </p>
          {user ? (
            <Link
              href="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm min-h-11 flex items-center justify-center"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-colors text-sm min-h-11 flex items-center justify-center"
            >
              Create an Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
