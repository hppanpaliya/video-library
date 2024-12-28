import { NextRequest } from 'next/server';
import { createUser } from '../../../lib/db';


const secret = process.env.REGISTRATION_SECRET || 'Invitation_Code';

export async function POST(request: NextRequest) {
  try {
    const { username, password, code } = await request.json();
    
    if (!username || !password) {
      return new Response('Username and password are required', { status: 400 });
    }
    if (code !== secret) {
      return new Response('Invalid registration code', { status: 403 });
    }

    const success = await createUser(username, password);
    if (!success) {
      return new Response('Username already exists', { status: 409 });
    }

    return new Response('User created successfully', { status: 201 });
  } catch {
    return new Response('Error creating user', { status: 500 });
  }
}