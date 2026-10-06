'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MOCK_FAQS } from '@/lib/mock-data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Booking & Payment', 'Check-in/out', 'Food & Activities', 'Safety'];

  const filteredFaqs = useMemo(() => {
    return MOCK_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      <div className="text-center space-y-3">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-forest-deep/75 leading-relaxed max-w-xl mx-auto">
          Find instant answers regarding check-in timings, food options, safety guidelines, and cancellation rules.
        </p>
      </div>

      {/* Search & Category filter */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search question or keyword (e.g. food, timing, refund)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-mist rounded-xl px-5 py-3.5 text-sm text-forest-deep placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-forest shadow-sm"
        />

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-white border border-mist text-forest-deep hover:bg-mist/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-mist p-6">
            <p className="text-sm font-semibold text-forest-deep">No questions match &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-forest-deep/60 mt-1">Try searching with a broader keyword or reach out to our team.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <Accordion key={faq.id} title={faq.question}>
              {faq.answer}
            </Accordion>
          ))
        )}
      </div>

      {/* Still Need Help Box */}
      <div className="bg-white rounded-2xl border border-mist p-8 text-center space-y-4 shadow-sm">
        <h3 className="font-display text-2xl font-semibold text-forest-deep">Still Have Questions?</h3>
        <p className="text-xs text-forest-deep/70 max-w-md mx-auto">
          Our friendly support team is available on WhatsApp and phone from 9:00 AM to 9:00 PM every day.
        </p>
        <Link href="/contact" className="inline-block">
          <Button variant="primary" size="md">
            Contact Support Team
          </Button>
        </Link>
      </div>
    </div>
  );
}
