import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";

const registerSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).max(72),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid input",
          details: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    // Registration logic goes here

    //1st step is to check if there is an existing user
    const isExistingUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );

    if (isExistingUser.rows.length > 0) {
      return Response.json({ error: "User Already Exists" }, { status: 409 });
    }

    //2nd step is to hash the password
    const hash = await bcrypt.hash(password, 10); //best cost factor for me

    //3rd step is to insert the user into the users table
    const userResult = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hash],
    );

    const userId = userResult.rows[0].id;

    //4th step is generating JWT access and refresh tokens
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    //5th step is to hash the refresh token and store it in my db

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
      [userId, refreshTokenHash],
    );

    //6th step, time to set cookies
    const cookieStore = await cookies();

    cookieStore.set("accToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15, //
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
      { message: "Registration successful" },
      { status: 201 },
    );
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
