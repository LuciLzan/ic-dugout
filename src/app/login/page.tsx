"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import "./Login.css"
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password })
        })

        if (res.ok) {
            router.push("/member")
        } else {
            const data = await res.json()
            setError(data.error || "Login failed")
        }
    }

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="login-error">{error}</p>}

                <button type="submit">Sign in</button>
                <Link style={{fontSize:"0.75rem",textAlign:"center"}} href="/register">No Account? Click here to register!</Link>
            </form>
        </div>
    )
}