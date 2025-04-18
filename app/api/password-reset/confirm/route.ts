import { NextResponse } from "next/server"
import { resetPassword } from "../../auth/[...nextauth]/route"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, token, password } = body

    if (!email || !token || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await resetPassword(email, token, password)

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
  }
}
