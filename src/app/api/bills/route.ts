import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Bill } from '@/models/Bill';

interface BillQuery {
  userId: string;
  dueDate?: {
    $gte: Date;
    $lte: Date;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const days = searchParams.get('days');

    if (!userId) {
      return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
    }

    await connectDB();
    let query: BillQuery = { userId };

    if (days) {
      const currentDate = new Date();
      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + parseInt(days));
      
      query = {
        ...query,
        dueDate: {
          $gte: currentDate,
          $lte: futureDate
        }
      };
    }

    const bills = await Bill.find(query).sort({ dueDate: 1 });
    return NextResponse.json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    return NextResponse.json({ error: 'Failed to fetch bills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, dueDate, amount, isRecurring } = body;

    if (!userId || !name || !dueDate || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const bill = new Bill({
      userId,
      name,
      dueDate,
      amount,
      isRecurring: isRecurring ?? true,
    });
    
    await bill.save();
    return NextResponse.json(bill, { status: 201 });
  } catch (error) {
    console.error('Error creating bill:', error);
    return NextResponse.json({ error: 'Failed to create bill' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const billId = searchParams.get('billId');

    if (!userId || !billId) {
      return NextResponse.json({ error: 'UserId and billId are required' }, { status: 400 });
    }

    await connectDB();
    await Bill.findOneAndDelete({ _id: billId, userId });
    
    return NextResponse.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Error deleting bill:', error);
    return NextResponse.json({ error: 'Failed to delete bill' }, { status: 500 });
  }
} 