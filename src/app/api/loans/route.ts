import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { Loan } from '@/models/Loan';
import connectDB from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const { userId: tokenUserId } = payload as { userId: string };

    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || userId !== tokenUserId) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const loans = await Loan.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const { userId: tokenUserId } = payload as { userId: string };

    await connectDB();

    const { userId, amount } = await request.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (userId !== tokenUserId) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json({ error: 'Loan amount must be greater than 0' }, { status: 400 });
    }

    // Check if user has any pending loans
    const pendingLoans = await Loan.countDocuments({ userId, status: 'pending' });
    if (pendingLoans > 0) {
      return NextResponse.json({ error: 'You already have a pending loan application' }, { status: 400 });
    }

    const tax = amount * 0.05; // 5% tax

    const loan = new Loan({
      userId,
      amount,
      status: 'pending',
      tax,
      createdAt: new Date(),
    });

    await loan.save();
    return NextResponse.json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 