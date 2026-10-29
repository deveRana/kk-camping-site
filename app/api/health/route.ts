import { NextResponse } from 'next/server';

/**
 * Health check endpoint for uptime monitoring
 * Returns 200 if the application is running
 */
export async function GET() {
  try {
    // Basic health check
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    // If this fails, something is seriously wrong
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
