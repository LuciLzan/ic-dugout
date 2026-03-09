import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { signToken } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { username, password } = await req.json()


    const token = await login(username, password)

    if(!token) {
        return NextResponse.json({ error: "Invalid login" }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
    })

    return res
}

export async function login(username: string, password: string,mockUser?:{id:number,username:string,password:string}) {

    if(mockUser) {
        return mockUser.password === password? mockUser.id.toString():undefined
    }

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        return undefined
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return undefined
    }

   return signToken(user.id.toString())
}