'use server';

import { createClient } from 'next-sanity';

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website?: string; // honeypot, must stay empty
}

export type ContactResult = { ok: true } | { ok: false; error: string };

const SUBJECTS = ['General Inquiry', 'Group Booking Request', 'Corporate Event', 'Cancellation / Reschedule'];

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  // Bots fill the hidden field; pretend success so they move on.
  if (input.website) return { ok: true };

  const name = input.name?.trim().slice(0, 100);
  const email = input.email?.trim().slice(0, 150);
  const phone = input.phone?.trim().slice(0, 30);
  const message = input.message?.trim().slice(0, 3000);
  const subject = SUBJECTS.includes(input.subject) ? input.subject : 'General Inquiry';

  if (!name || !email || !message) return { ok: false, error: 'Please fill in all required fields.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please enter a valid email address.' };

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    console.error('SANITY_API_WRITE_TOKEN is not set; contact submission was not saved.');
    return { ok: false, error: 'Contact form is temporarily unavailable. Please call us instead.' };
  }

  const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2026-02-01',
    useCdn: false,
    token,
  });

  try {
    await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      phone,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });
    return { ok: true };
  } catch (err) {
    console.error('Failed to save contact submission', err);
    return { ok: false, error: 'Something went wrong. Please try again in a moment.' };
  }
}
