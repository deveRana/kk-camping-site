import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grievance Officer — Lakeora',
  description:
    'Contact our Grievance Officer for complaints, concerns, or issues. We acknowledge all complaints within 48 hours and resolve within 30 days as per IT Rules 2021.',
};

export default function GrievancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Grievance Officer' }]} />

      <div className="text-center space-y-3 mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Grievance Officer
        </h1>
        <p className="text-forest-deep/70 max-w-2xl mx-auto">
          We are committed to resolving your concerns promptly and fairly. Contact our Grievance Officer for any complaints or issues.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-mist space-y-6">
        {/* Officer Details */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-4">
            Grievance Officer Details
          </h2>
          <p className="text-sm text-forest-deep/70 mb-6">
            As per Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
          </p>

          <div className="bg-forest/5 rounded-xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">👤</span>
              <div>
                <p className="font-semibold text-forest-deep">Name:</p>
                <p className="text-forest-deep/80">Grievance Officer, Lakeora</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">📧</span>
              <div>
                <p className="font-semibold text-forest-deep">Email:</p>
                <a
                  href="mailto:grievance@lakeorastay.com"
                  className="text-forest hover:underline"
                >
                  grievance@lakeorastay.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">📞</span>
              <div>
                <p className="font-semibold text-forest-deep">Phone:</p>
                <a
                  href="tel:+917499757607"
                  className="text-forest hover:underline"
                >
                  +91 74997 57607
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">📍</span>
              <div>
                <p className="font-semibold text-forest-deep">Address:</p>
                <p className="text-forest-deep/80">
                  Lakeora, Pawna Lake, Thakursai-Aajiwali Road<br />
                  Gevhande Khadak, Lonavala<br />
                  Maharashtra 410406, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">⏰</span>
              <div>
                <p className="font-semibold text-forest-deep">Response Time:</p>
                <p className="text-forest-deep/80">
                  Complaints acknowledged within 48 hours<br />
                  Resolution within 30 days
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Include */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-4">
            How to File a Complaint
          </h2>
          <p className="text-sm text-forest-deep/80 mb-4">
            Please include the following information in your complaint:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-forest-deep/80">
            <li>Your full name and contact details</li>
            <li>Booking reference number (if applicable)</li>
            <li>Detailed description of your concern or complaint</li>
            <li>Any supporting documents or evidence</li>
            <li>Preferred mode of communication for resolution</li>
          </ul>
        </section>

        {/* Types of Complaints */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-4">
            Types of Complaints We Handle
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-sage/10 rounded-lg p-4">
              <h3 className="font-semibold text-forest-deep mb-2">Booking Issues</h3>
              <p className="text-sm text-forest-deep/70">
                Incorrect bookings, payment issues, confirmation problems
              </p>
            </div>
            <div className="bg-sage/10 rounded-lg p-4">
              <h3 className="font-semibold text-forest-deep mb-2">Service Quality</h3>
              <p className="text-sm text-forest-deep/70">
                Accommodation concerns, amenities, food, cleanliness
              </p>
            </div>
            <div className="bg-sage/10 rounded-lg p-4">
              <h3 className="font-semibold text-forest-deep mb-2">Refunds & Cancellations</h3>
              <p className="text-sm text-forest-deep/70">
                Delayed refunds, cancellation policy disputes
              </p>
            </div>
            <div className="bg-sage/10 rounded-lg p-4">
              <h3 className="font-semibold text-forest-deep mb-2">Privacy & Data</h3>
              <p className="text-sm text-forest-deep/70">
                Data protection concerns, consent issues, privacy violations
              </p>
            </div>
            <div className="bg-sage/10 rounded-lg p-4">
              <h3 className="font-semibold text-forest-deep mb-2">Staff Behavior</h3>
              <p className="text-sm text-forest-deep/70">
                Unprofessional conduct, discourtesy, harassment
              </p>
            </div>
            <div className="bg-sage/10 rounded-lg p-4">
              <h3 className="font-semibold text-forest-deep mb-2">Website Issues</h3>
              <p className="text-sm text-forest-deep/70">
                Technical problems, accessibility issues, errors
              </p>
            </div>
          </div>
        </section>

        {/* Resolution Process */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-forest-deep mb-4">
            Complaint Resolution Process
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-forest-deep mb-1">Submit Complaint</h3>
                <p className="text-sm text-forest-deep/70">
                  Email us at grievance@lakeorastay.com with all relevant details
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-forest-deep mb-1">Acknowledgment (48 hours)</h3>
                <p className="text-sm text-forest-deep/70">
                  You'll receive an acknowledgment email with a complaint reference number
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-forest-deep mb-1">Investigation</h3>
                <p className="text-sm text-forest-deep/70">
                  We investigate the matter thoroughly and may contact you for additional information
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-forest-deep mb-1">Resolution (within 30 days)</h3>
                <p className="text-sm text-forest-deep/70">
                  We provide a detailed response and resolution to your complaint
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Escalation */}
        <section className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h2 className="font-display text-xl font-semibold text-forest-deep mb-3">
            Not Satisfied with the Resolution?
          </h2>
          <p className="text-sm text-forest-deep/80 mb-4">
            If you are not satisfied with our resolution, you may escalate your complaint to:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Consumer Disputes Redressal Forum</strong><br />
              District Consumer Forum, Pune, Maharashtra<br />
              Website:{' '}
              <a
                href="https://edaakhil.nic.in/edaakhil/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest hover:underline"
              >
                National Consumer Helpline
              </a>
            </p>
            <p className="pt-2">
              <strong>Or contact:</strong><br />
              National Consumer Helpline: <strong>1800-11-4000</strong><br />
              Email: complaints@consumerhelpline.gov.in
            </p>
          </div>
        </section>

        {/* Contact Links */}
        <div className="pt-6 border-t border-mist text-center">
          <p className="text-sm text-forest-deep/70 mb-4">
            For general inquiries, please visit our{' '}
            <Link href="/contact" className="text-forest hover:underline font-semibold">
              Contact Page
            </Link>
            .
          </p>
          <p className="text-xs text-forest-deep/50">
            This grievance mechanism is in compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
          </p>
        </div>
      </div>
    </div>
  );
}
