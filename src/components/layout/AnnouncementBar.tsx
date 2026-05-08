'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  'Complimentary worldwide shipping on orders over $200',
  'Coming soon to Kigali — join the waitlist',
  'Lifetime warranty on every Inkindi piece',
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % messages.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink text-cream-50 text-[11px] uppercase tracking-luxe">
      <div className="container-luxe flex items-center justify-center py-2.5 h-9 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {messages[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
