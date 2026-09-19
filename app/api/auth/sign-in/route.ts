import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";

const signUpSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //Validation
    const result = await signUpSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid input",
          details: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    //Log in
    const isExistingUser = await pool.query(
      "SELECT id, password_hash FROM users WHERE email = $1",
      [email],
    );

    if (isExistingUser.rows.length === 0) {
      return Response.json(
        { error: "User Doesn't Exists. Create An Account" },
        { status: 404 },
      );
    }

    const storedHash = isExistingUser.rows[0].password_hash;
    const userId = isExistingUser.rows[0].id;

    //hash password
    const isMatch = await bcrypt.compare(password, storedHash);

    if (!isMatch) {
      return Response.json(
        { error: "Unauthorized - Wrong Password" },
        { status: 401 },
      );
    }

    //Create tokens
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    //hash the refresh token
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
      [userId, refreshTokenHash],
    );

    const cookieStore = await cookies();

    cookieStore.set("accToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15,
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json(
      { message: "Log in successful" },
      { status: 200 },
    );
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
