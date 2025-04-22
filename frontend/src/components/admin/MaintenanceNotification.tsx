"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface MaintenanceNotification {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'in-progress' | 'completed';
}

const MaintenanceNotification = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [notifications, setNotifications] = useState<MaintenanceNotification[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !startDate || !endDate) {
      toast.error('Please fill in all fields');
      return;
    }

    if (startDate >= endDate) {
      toast.error('End date must be after start date');
      return;
    }

    const newNotification: MaintenanceNotification = {
      id: Date.now().toString(),
      title,
      description,
      startDate,
      endDate,
      status: 'scheduled'
    };

    setNotifications([...notifications, newNotification]);
    toast.success('Maintenance notification scheduled successfully');

    // Reset form
    setTitle('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600';
      case 'in-progress': return 'text-yellow-600';
      case 'completed': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Maintenance Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Schedule New Notification</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter notification description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Schedule Notification
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Scheduled Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="p-4">
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                <div className="mt-2 text-sm">
                  <p>Start: {format(notification.startDate, 'PPP')}</p>
                  <p>End: {format(notification.endDate, 'PPP')}</p>
                  <p className={getStatusColor(notification.status)}>
                    Status: {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                  </p>
                </div>
              </Card>
            ))}
            {notifications.length === 0 && (
              <p className="text-gray-500 text-center">No scheduled notifications</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceNotification; 