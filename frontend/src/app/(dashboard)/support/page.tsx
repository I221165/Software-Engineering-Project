"use client"

import React from 'react';
import LiveChatWidget from '@/components/LiveChatWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Priority Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@finwise.com">support@finwise.com</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Available Monday to Friday, 9:00 AM - 5:00 PM EST
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:+1-800-FINWISE">+1 (800) FINWISE</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Live Chat Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Chat with our support team in real-time. Average response time: 5 minutes.
          </p>
          <LiveChatWidget />
        </CardContent>
      </Card>
    </div>
  );
} 