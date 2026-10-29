import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { getFaqs, getGallery, getProperties, getTestimonials } from '@/lib/sanity/data';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';

export const revalidate = 60;

export default async function HomePage() {
  const [properties, testimonials, faqs, gallery] = await Promise.all([
    getProperties(),
    getTestimonials(),
    getFaqs(),
    getGallery(),
  ]);
  const mosaic = gallery.slice(0, 5);
  const featuredProperties = properties.filter((p) => p.isFeatured);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">Direct Lakefront</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Right on the water edge of Pawna Dam</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-sage/30 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">Bonfire &amp; BBQ</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Unlimited meals &amp; evening grilled snacks</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">Live Music</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Acoustic guitar nights under the stars</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mist shadow-sm hover:border-forest/30 transition">
            <div className="w-12 h-12 rounded-xl bg-sage/30 text-forest mx-auto flex items-center justify-center mb-3">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-forest-deep text-lg">24/7 Safety</h3>
            <p className="text-xs text-forest-deep/70 mt-1">Fully secured &amp; couple friendly</p>
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="forest" size="sm">
              Handpicked Campsites
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep mt-2">
              Featured Stays at Pawna Lake
            </h2>
            <p className="text-sm text-forest-deep/70 mt-1">
              Choose from luxury AC dome tents, pine cottages, and waterfront camping canvas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProperties.slice(0, 4).map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="group bg-white rounded-2xl border border-mist overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.coverImage}
                  alt={property.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                {property.isPopular && (
                  <span className="absolute top-4 left-4 bg-forest text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-forest-deep group-hover:text-forest transition">
                      {property.title}
                    </h3>
                    <p className="text-xs text-forest-deep/60 mt-1">{property.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-forest-deep/70 mb-3">
                  <span>{property.capacity}</span>
                  <span>•</span>
                  <span>{property.category}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-mist">
                  <div>
                    <span className="text-2xl font-bold text-forest">₹{property.price.toLocaleString()}</span>
                    <span className="text-xs text-forest-deep/60 ml-1">/ person</span>
                  </div>
                  <span className="text-forest font-semibold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                    Book Now
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>



      {/* Experience: arch panes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow text-forest mb-3">The Lakeora way</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep">
            Four moments. One unforgettable stay.
          </h2>
          <div className="window-divider mt-6 mx-auto w-40" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: 'Sunrise', d: 'Golden light spilling across the lake, right from your tent.', i: 'M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4M8 12a4 4 0 1 1 8 0' },
            { t: 'Birdsong', d: 'Wake to the calls of kingfishers and bulbuls over still water.', i: 'M4 15c3 0 4-2 5-4s3-4 6-3l3-2-1 4c0 5-4 9-9 9-3 0-4-2-4-4Z' },
            { t: 'Coffee', d: 'Freshly brewed cups and a slow breakfast by the water.', i: 'M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9Zm11 1h2a2 2 0 0 1 0 5h-2M8 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4' },
            { t: 'Feast', d: 'Unlimited veg & non-veg dinner, BBQ and campfire music.', i: 'M7 3v8m-2-8v5a2 2 0 0 0 4 0V3M7 11v10m8-18c-2 2-2 6 0 8v10' },
          ].map((m) => (
            <div key={m.t} className="group bg-white border border-mist arch-lg px-6 pt-12 pb-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mx-auto w-16 h-16 rounded-full bg-sage/30 text-forest flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-sage transition">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={m.i} /></svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-forest-deep">{m.t}</h3>
              <p className="text-sm text-forest-deep/70 mt-2 leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="forest" size="sm">
            Adventures & Activities
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep mt-3">
            More than just camping
          </h2>
          <p className="text-sm text-forest-deep/70 mt-2">
            Water sports, trekking, bonfires & stargazing — there&apos;s something for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Water Adventures',
              items: ['Kayaking', 'Boating', 'Swimming', 'Fishing'],
              icon: '🚣',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'Land Activities',
              items: ['Trekking', 'Cycling', 'Archery', 'Badminton'],
              icon: '⛰️',
              color: 'from-green-500 to-emerald-500',
            },
            {
              title: 'Evening Experiences',
              items: ['Bonfire', 'BBQ Night', 'Live Music', 'Stargazing'],
              icon: '🔥',
              color: 'from-orange-500 to-red-500',
            },
          ].map((activity) => (
            <div
              key={activity.title}
              className="group bg-white rounded-2xl border border-mist p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{activity.icon}</div>
              <h3 className="font-display text-2xl font-semibold text-forest-deep mb-4">
                {activity.title}
              </h3>
              <ul className="space-y-2">
                {activity.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-forest-deep/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sage/20 to-forest/10 rounded-3xl p-8 md:p-12 border border-mist">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="forest" size="sm" className="mb-4">
                Plan Your Visit
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest-deep mb-4">
                Best time to visit Pawna Lake
              </h2>
              <div className="space-y-4 text-forest-deep/80">
                <div>
                  <h4 className="font-semibold text-forest-deep mb-1">🌞 October to February (Peak Season)</h4>
                  <p className="text-sm">Perfect weather, cool nights, ideal for camping. Book early!</p>
                </div>
                <div>
                  <h4 className="font-semibold text-forest-deep mb-1">🌧️ June to September (Monsoon)</h4>
                  <p className="text-sm">Lush green surroundings, full dam. Limited camping available.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-forest-deep mb-1">☀️ March to May (Summer)</h4>
                  <p className="text-sm">Lower crowd, good discounts. Hot during the day, pleasant evenings.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-mist shadow-lg">
              <h3 className="font-display text-xl font-semibold text-forest-deep mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-mist">
                  <span className="text-forest-deep/70">From Mumbai</span>
                  <span className="font-semibold text-forest-deep">2.5 hours</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-mist">
                  <span className="text-forest-deep/70">From Pune</span>
                  <span className="font-semibold text-forest-deep">1.5 hours</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-mist">
                  <span className="text-forest-deep/70">Nearest Station</span>
                  <span className="font-semibold text-forest-deep">Lonavala</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-mist">
                  <span className="text-forest-deep/70">Altitude</span>
                  <span className="font-semibold text-forest-deep">2,100 ft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-deep/70">Check-in / Check-out</span>
                  <span className="font-semibold text-forest-deep">4 PM / 11 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cafe Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ☕ Now Open
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep mb-4">
                Lakeora Cafe
              </h2>
              <p className="text-forest-deep/80 leading-relaxed mb-6">
                Start your day with fresh filter coffee and a view of the lake. Our cafe serves delicious
                breakfast, lunch, snacks, and dinner — all made with local ingredients. Open to both
                guests and walk-in visitors.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  'Fresh Coffee & Chai',
                  'All-day Dining Menu',
                  'Lake View Seating',
                  'Veg & Non-veg Options',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="text-forest">✓</span>
                    <span className="text-forest-deep/80">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/cafe"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-xl transition active:scale-95"
              >
                View Menu & Timings
                <span className="text-lg">→</span>
              </Link>
            </div>
            <div className="relative h-[400px] md:h-full">
              <img
                src="/swiss-tent/swiss-tent-1.jpg"
                alt="Lakeora Cafe"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amber-50/50 md:to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery mosaic */}
      {mosaic.length >= 5 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow text-forest mb-2">Life at Lakeora</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep">
                See the lake for yourself
              </h2>
            </div>
            <Link href="/gallery" className="text-sm font-semibold text-forest hover:text-forest-dark group whitespace-nowrap">
              View gallery <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-[520px] md:h-[560px]">
            {mosaic.map((g, i) => (
              <Link
                key={g.id}
                href="/gallery"
                className={`group relative overflow-hidden rounded-3xl ${i === 0 ? 'col-span-2 row-span-2 md:rounded-t-[10rem]' : ''}`}
              >
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-4 right-4 text-white text-sm font-medium drop-shadow">{g.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* How booking works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow text-forest mb-3">Simple &amp; quick</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-forest-deep">Book in three easy steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-9 left-[16%] right-[16%] border-t-2 border-dashed border-sage" />
          {[
            { n: '1', t: 'Choose your stay', d: 'Pick a tent, dome or cottage that fits your group.' },
            { n: '2', t: 'Complete Payment', d: 'Secure payment via Razorpay — UPI, Cards, Net Banking.' },
            { n: '3', t: 'Arrive & unwind', d: 'Check in at 4 PM. Tea, music and sunset are waiting.' },
          ].map((st) => (
            <div key={st.n} className="relative text-center">
              <div className="mx-auto w-[4.5rem] h-[4.5rem] rounded-full bg-forest text-sage font-display text-3xl flex items-center justify-center shadow-lg ring-8 ring-paper">
                {st.n}
              </div>
              <h3 className="font-display text-2xl font-semibold text-forest-deep mt-5">{st.t}</h3>
              <p className="text-sm text-forest-deep/70 mt-2 max-w-xs mx-auto leading-relaxed">{st.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection testimonials={testimonials} />


      {/* Registration CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest text-white px-6 py-16 md:py-20 text-center shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sage/10" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-sage/10" />
          <div className="relative">
            <p className="eyebrow text-sage mb-4">Weekends fill up fast</p>
            <h2 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Your lakeside escape is <span className="italic text-sage">one tap away</span>
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8">
              Pick your dates, choose your tent or cottage and confirm with instant booking.
              Instant confirmation, zero hassle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/properties" className="bg-sage hover:bg-white text-forest-deep font-semibold px-9 py-4 rounded-full shadow-xl transition active:scale-95">
                Book Your Stay Now
              </Link>
              <Link href="/contact" className="border border-white/50 hover:bg-white/10 text-white px-9 py-4 rounded-full transition">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-semibold text-forest-deep">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-forest-deep/70 mt-1">
            Have questions before booking your Pawna Lake stay?
          </p>
        </div>

        <div className="space-y-4">
          {faqs.slice(0, 4).map((faq) => (
            <Accordion key={faq.id} title={faq.question}>
              {faq.answer}
            </Accordion>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm font-semibold text-forest hover:underline">
            View all questions &amp; policies →
          </Link>
        </div>
      </section>
    </div>
  );
}
