'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const SUBJECTS = [
  'Order help',
  'Product enquiry',
  'Custom or bespoke piece',
  'Press & partnerships',
  'Wholesale & boutiques',
  'Other',
];

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setErrorMsg(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Bad response');
      setState('done');
      e.currentTarget.reset();
    } catch (err) {
      setState('error');
      setErrorMsg('Something went wrong. Please email concierge@inkindi.com and we will respond promptly.');
    }
  }

  if (state === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cream-100 p-10 lg:p-14"
      >
        <Check className="w-8 h-8 text-gold-500 mb-5" />
        <h2 className="font-serif text-3xl mb-3">Thank you.</h2>
        <p className="lead">
          A member of our concierge team will be in touch within 24 hours, in your preferred
          language. In the meantime, may we tempt you with a quiet hour browsing the shop?
        </p>
        <button onClick={() => setState('idle')} className="btn-ghost mt-8">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-cream-100 p-8 lg:p-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
      <div className="sm:col-span-1">
        <label className="eyebrow block mb-2">First name</label>
        <input name="firstName" required className="input-luxe" />
      </div>
      <div className="sm:col-span-1">
        <label className="eyebrow block mb-2">Last name</label>
        <input name="lastName" required className="input-luxe" />
      </div>
      <div className="sm:col-span-1">
        <label className="eyebrow block mb-2">Email</label>
        <input name="email" type="email" required className="input-luxe" autoComplete="email" />
      </div>
      <div className="sm:col-span-1">
        <label className="eyebrow block mb-2">Phone (optional)</label>
        <input name="phone" type="tel" className="input-luxe" autoComplete="tel" />
      </div>
      <div className="sm:col-span-2">
        <label className="eyebrow block mb-2">Subject</label>
        <select name="subject" required className="input-luxe">
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="eyebrow block mb-2">Message</label>
        <textarea name="message" required rows={5} className="input-luxe resize-none" />
      </div>
      <div className="sm:col-span-2 flex items-center justify-between gap-6 mt-2">
        <p className="text-[11px] text-ink/45 max-w-xs">
          Submitting this form, you agree to our Privacy Policy. We will only use your details
          to reply to you.
        </p>
        <button type="submit" disabled={state === 'loading'} className="btn-primary">
          {state === 'loading' ? 'Sending…' : 'Send message'}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      {errorMsg && <p className="sm:col-span-2 text-[12px] text-red-700">{errorMsg}</p>}
    </form>
  );
}
