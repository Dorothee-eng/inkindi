import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Phone, MapPin, Instagram } from 'lucide-react';
import FadeIn from '@/components/motion/FadeIn';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Speak with our concierge — questions about a piece, custom orders, or our Kigali boutique opening. We respond within 24 hours.',
};

const FAQ = [
  {
    q: 'Where do you ship?',
    a: 'Worldwide, to 46+ countries. Complimentary express shipping on orders over $200. From 2027, we will fulfil regional African orders directly from our Kigali warehouse.',
  },
  {
    q: 'What is your returns policy?',
    a: 'We accept returns within 30 days of delivery on unworn pieces in their original packaging. Engraved or custom-sized pieces are final sale.',
  },
  {
    q: 'Are your pieces hallmarked?',
    a: 'Yes. Every solid-gold and silver Inkindi piece carries an Inkindi maker’s mark and the appropriate metal hallmark from our Paris atelier.',
  },
  {
    q: 'Can I have a piece engraved?',
    a: 'Most rings, signets and pendants can be engraved up to 12 characters. Engraving is complimentary on orders over $400.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We offer 4-installment interest-free payments at checkout via Klarna and Afterpay (regions vary). Mobile-money plans for Africa coming soon.',
  },
  {
    q: 'When does the Kigali boutique open?',
    a: 'Our flagship is scheduled for late 2027. Subscribe to the INKINDI Letter or follow @inkindi for updates and the founders’ private opening.',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="container-luxe pt-16 pb-12">
        <FadeIn className="max-w-2xl">
          <p className="eyebrow mb-3">Concierge</p>
          <h1 className="display-1 text-balance">
            We are here, <span className="italic font-light">always.</span>
          </h1>
          <p className="lead mt-5">
            Our concierge team responds within 24 hours, in English, italian ,French, Kinyarwanda and
            Swahili. For urgent enquiries, message us on WhatsApp.
          </p>
        </FadeIn>
      </section>

      <section className="container-luxe pb-24 grid grid-cols-1 lg:grid-cols-12 gap-14">
        {/* Form */}
        <FadeIn className="lg:col-span-7" delay={0.1}>
          <ContactForm />
        </FadeIn>

        {/* Contact methods */}
        <FadeIn className="lg:col-span-5" delay={0.2}>
          <div className="bg-cream-100 p-8 lg:p-10 space-y-7">
            <ContactRow
              Icon={MessageCircle}
              label="WhatsApp"
              value="+393514635469"
              href="https://wa.me/393514635469?text=Hello%20Inkindi%20concierge"
              note="Fastest reply — usually within 30 minutes."
            />
            <ContactRow
              Icon={Mail}
              label="Email"
              value="concierge@inkindi.com"
              href="mailto:concierge@inkindi.com"
              note="Replies within 24 hours."
            />
            <ContactRow
              Icon={Phone}
              label="Phone"
              value="+40757979362"
              href="tel:+40757979362"
              note="Mon–Fri · 9 a.m. — 6 p.m. CET"
            />
            <ContactRow
              Icon={MapPin}
              label="Boutique"
              value="via pelagio I 10,00165 ROMA"
              note="By appointment — booking@inkindi.com"
            />
            <div className="pt-4 border-t border-ink/10">
              <p className="eyebrow mb-3">Follow the house</p>
              <div className="flex items-center gap-4">
                <a aria-label="Instagram" href="https://instagram.com/inkindi" className="hover:text-gold-500"><Instagram className="w-5 h-5" /></a>
                <a aria-label="TikTok" href="https://tiktok.com/@inkindi" className="hover:text-gold-500">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M16 3v3.5a4.5 4.5 0 0 0 4.5 4.5V14a7.5 7.5 0 0 1-4.5-1.5V17a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 13 17V3h3z" />
                  </svg>
                </a>
                <Link href="https://pinterest.com/inkindi" className="text-[12px] uppercase tracking-luxe link-luxe">Pinterest</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream-100">
        <div className="container-luxe py-24">
          <FadeIn className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Help Centre</p>
            <h2 className="display-2 text-balance">Quick answers, before you ask.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2">
            {FAQ.map((item, i) => (
              <FadeIn key={item.q} delay={i * 0.05}>
                <details className="group border-b border-ink/10 py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-serif text-[18px]">{item.q}</span>
                    <span className="text-ink/40 text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-ink-muted leading-relaxed text-[14px]">{item.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  note,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <span className="grid place-items-center w-9 h-9 bg-cream-50 text-gold-500 shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.6} />
      </span>
      <div>
        <p className="eyebrow mb-1">{label}</p>
        <p className="font-serif text-[17px]">{value}</p>
        {note && <p className="text-[12.5px] text-ink/55 mt-1">{note}</p>}
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:text-ink">{inner}</a> : inner;
}
