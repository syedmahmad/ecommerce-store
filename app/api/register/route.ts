import { NextResponse } from "next/server"
import { registerUser } from "../auth/[...nextauth]/route"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await registerUser({ name, email, password })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
