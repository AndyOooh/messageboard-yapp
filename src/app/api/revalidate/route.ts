import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  // Get the secret token from the request
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Check for valid token (compare with your environment variable)
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Get the path to revalidate from the request body
    const { path = '/' } = await request.json();

    // Revalidate the specified path
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      message: `Path ${path} revalidated`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
