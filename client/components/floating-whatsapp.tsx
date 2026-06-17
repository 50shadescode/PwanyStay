'use client'

import { MessageCircle } from 'lucide-react'

// Switched to default export to perfectly satisfy line 10 of your home-page.tsx
export default function FloatingWhatsApp() {
  const whatsappNumber = '254712345678' // Mombasa support number
  const message = 'Hi! I need help with Zuri Homes bookings.'

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      // Replaced 'bg-accent' with 'bg-emerald-500' for true native Tailwind v4 compatibility and M-Pesa/WhatsApp matching brand colors
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
      aria-label="Contact via WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}