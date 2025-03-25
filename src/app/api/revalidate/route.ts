import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  console.log('Revalidation API called');

  // Get the secret token from the request
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Check for valid token
  if (token !== process.env.REVALIDATION_TOKEN) {
    console.error('Invalid revalidation token');
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Get the path to revalidate from the request body
    const { path = '/' } = await request.json();
    console.log('Revalidating path:', path);

    // Revalidate the specified path
    revalidatePath(path);
    console.log('Revalidation complete for path:', path);

    return NextResponse.json({
      revalidated: true,
      message: `Path ${path} revalidated`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error during revalidation:', err);
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
