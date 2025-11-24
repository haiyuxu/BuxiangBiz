import React from 'react';

export enum AppView {
  HOME = 'HOME',
  SHOP = 'SHOP',
  CLUBHOUSE = 'CLUBHOUSE',
  ASSISTANT = 'ASSISTANT',
  PROFILE = 'PROFILE'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  // New fields for detail page
  images?: string[]; // Carousel images
  specs?: Record<string, string>; // e.g. { "Weight": "500g", "Origin": "Hunan" }
  details?: string; // Long HTML/Markdown description
}

export interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum RoomType {
  MEETING_SMALL = 'Small Meeting Room',
  SALON_LARGE = 'Large Salon Hall',
  PRIVATE_DINING = 'Private Dining'
}