"use client"

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  lastContact: string;
}

interface ClientCardProps {
  client: Client;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{client.name}</CardTitle>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
          <Badge className={getStatusColor(client.status)}>
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Last Contact: {format(new Date(client.lastContact), 'MMM d, yyyy')}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/clients/${client.id}/annotations`}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Annotations
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/clients/${client.id}/report`}>
            <FileText className="mr-2 h-4 w-4" />
            Report
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClientCard; 