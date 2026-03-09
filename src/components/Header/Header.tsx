"use client"



import { useEffect, useState } from "react"
import {usePathname, useRouter} from "next/navigation"

import "./Header.css"

export default function Header() {
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/auth/me",{cache: "no-cache"})

            if (res.ok) {
                setLoggedIn(true)
            }
        }

        checkAuth()
    }, [pathname])

    async function handleLogout() {
        await fetch("/api/auth/logout", {
            method: "POST",
            cache: "no-cache",

        })

        setLoggedIn(false)
        router.push("/")
    }

    return (
        <header className="page-header">
            <h2>The IC Dugout</h2>

            {!loggedIn ? (
                <button
                    className="header-btn"
                    onClick={() => router.push("/login")}
                >
                    Login
                </button>
            ) : (
                <button
                    className="header-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </header>
    )
}