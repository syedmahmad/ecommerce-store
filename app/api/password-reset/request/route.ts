import { NextResponse } from "next/server"
import { requestPasswordReset } from "../../auth/[...nextauth]/route"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    await requestPasswordReset(email)

    // Always return success for security reasons
    return NextResponse.json(
      { message: "If your email exists in our system, you will receive a password reset link" },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
