import { NextRequest, NextResponse } from 'next/server';
import { verifyUser } from '../../../lib/db';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'a_secret_jwt_key';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    const user = await verifyUser(username, password);
    if (!user) {
      return new Response('Invalid credentials', { status: 401 });
    }

    const token = sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1d'
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 1 day
    });

    return response;
  } catch {
    return new Response('Error during login', { status: 500 });
  }
}