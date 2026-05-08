"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

function RegisterPage() {
  const [state, action, pending] = useActionState({
    setState: (state, newState) => {
      return {
        ...state,
        ...newState,
      };
    },
    username: "",
    email: "",
    password: "",
    password2: "",
    error: "",
    loading: false,
  });

  const { register, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.password !== state.password2) {
      setState({ error: "Passwords do not match" });
      return;
    }
    setState({ loading: true });
    setState({ error: null });

    try {
      await register(state.username, state.email, state.password);
      router.push("/dashboard");
    } catch (error) {
      const errMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setState({ error: errMessage });
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <div>
      <h1>Join DevCollab by Registering Yourself here</h1>

      {setState && (
        <form action={action} onSubmit={handleSubmit}>
          <input
            type="username"
            placeholder="Username"
            value={state.username}
            onChange={(e) => setState({ username: e.target.value })}
          />
          <input
            type="email"
            placeholder="email"
            value={state.email}
            onChange={(e) => setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) => setState({ password: e.target.value })}
          />
          <input
            type="password"
            placeholder="confirm password"
            value={state.password2}
            onChange={(e) => setState({ password2: e.target.value })}
          />
          <button type="submit" disabled={pending}>
            {isPending ? "Loading..." : "Login"}
          </button>
          {state?.error && <p className="text-red-500">{state.error}</p>}
        </form>
      )}
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}

export default RegisterPage;
