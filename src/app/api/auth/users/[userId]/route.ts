import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { Bill } from '@/models/Bill';
import { Loan } from '@/models/Loan';
import { Transaction } from '@/models/Transaction';
import { Savings } from '@/models/Savings';

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await Promise.resolve(params);
    
    await connectDB();
    
    // Check if user exists and is not an admin
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (user.role === 'admin') {
      return NextResponse.json(
        { error: 'Cannot delete admin user' },
        { status: 403 }
      );
    }

    // Delete all associated data
    await Promise.all([
      // Delete all bills
      Bill.deleteMany({ userId }),
      // Delete all loans
      Loan.deleteMany({ userId }),
      // Delete all transactions
      Transaction.deleteMany({ userId }),
      // Delete all savings
      Savings.deleteMany({ userId })
    ]);
    
    // Delete the user
    await User.findByIdAndDelete(userId);
    
    return NextResponse.json(
      { message: 'User and all associated data deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 