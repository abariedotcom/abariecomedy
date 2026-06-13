import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  venue: string;
  location: string;
  price_regular: number;
  price_vip: number | null;
  image_url: string | null;
  is_active: boolean;
  tickets_available: number;
  tickets_sold: number;
};

export type Booking = {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone: string;
  ticket_type: 'regular' | 'vip';
  quantity: number;
  total_amount: number;
  payment_status: string;
  payment_reference: string | null;
  created_at: string;
};

export async function getActiveEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'payment_status' | 'payment_reference'>): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...booking,
      payment_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }

  return data;
}