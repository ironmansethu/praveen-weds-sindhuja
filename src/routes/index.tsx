import { createFileRoute } from '@tanstack/react-router'
import { memo, useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: WeddingInvitation,
})

// Single source for all couple/event details.
const VENUE_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Meenakshi Mahal YSR Residency Alagar Kovil Madurai')
const WEDDING = {
  groom: 'Praveen Kumar',
  bride: 'Sindhuja',
  heroDate: '14 December 2026',
  dateLabel: 'December 13 & 14, 2026',
  tamilTagline: 'அவளும் நானும்',
  tamilNames: 'பிரவீன் குமார் & சிந்துஜா',
  tamilDate: '14 டிசம்பர் 2026',
  countdownTarget: '2026-12-14T06:00:00+05:30',
  music: '/dharshana.mp3',
  calendar: {
    title: 'Praveen Kumar & Sindhuja Wedding',
    start: '2026-12-13T18:00:00+05:30',
    end: '2026-12-14T07:30:00+05:30',
    location:
      'Meenakshi Mahal & YSR Residency, SH 72A, Kottai Vasal, Alagar Kovil, Valaiyapatti, Madurai, Tamil Nadu 625301',
  },
  events: [
    {
      icon: '💍',
      name: 'Engagement',
      when: '13 December 2026 · 6:00 PM – 7:30 PM',
      venue: 'Meenakshi Mahal & YSR Residency',
      address: 'SH 72A, Kottai Vasal, Alagar Kovil, Valaiyapatti, Madurai, Tamil Nadu - 625301',
      mapUrl: VENUE_MAP_URL,
    },
    {
      icon: '🪔',
      name: 'Wedding',
      when: '14 December 2026 · 6:00 AM – 7:30 AM',
      venue: 'Meenakshi Mahal & YSR Residency',
      address: 'SH 72A, Kottai Vasal, Alagar Kovil, Valaiyapatti, Madurai, Tamil Nadu - 625301',
      mapUrl: VENUE_MAP_URL,
    },
  ],
  families: [
    {
      icon: '🌺',
      title: "Groom's Family",
      relation: 'Son of',
      parents: 'Kumaresan & Prathipa',
    },
    {
      icon: '🌸',
      title: "Bride's Family",
      relation: 'Daughter of',
      parents: 'Soundarapandian & Mangayarkarasi',
    },
  ],
}

const COUNTDOWN_TARGET = new Date(WEDDING.countdownTarget)
const ENVELOPE_OPEN_MS = 1600

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const Petals = memo(function Petals() {
  const [petals] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 18 + 8}px`,
      duration: `${Math.random() * 20 + 12}s`,
      delay: `${Math.random() * 20}s`,
      color: ['#f4a300', '#e8742a', '#f7c948', '#d94f70', '#fbe3a1'][i % 5],
    })),
  )

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50% 0 50% 0',
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: 0.75,
          }}
        />
      ))}
    </>
  )
})

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-box">
      <div className="font-serif text-3xl font-semibold text-gold">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs uppercase tracking-widest text-gold-soft mt-1">{label}</div>
    </div>
  )
}

function Divider({ icon = '✦' }: { icon?: string }) {
  return <div className="divider text-gold text-sm select-none">{icon}</div>
}

type Stage = 'closed' | 'opening' | 'open'

function EnvelopeIntro({ stage, onOpen }: { stage: Stage; onOpen: () => void }) {
  return (
    <div
      className={`envelope-overlay page-bg${stage === 'open' ? ' is-hidden' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation envelope"
    >
      <p className="font-serif italic text-gold-soft text-xl md:text-2xl tracking-wide">
        You are cordially invited
      </p>
      <button
        type="button"
        className={`envelope${stage === 'closed' ? '' : ' is-open'}`}
        onClick={onOpen}
        disabled={stage !== 'closed'}
        aria-label="Open the invitation"
      >
        <span className="envelope-back" />
        <span className="envelope-letter">
          <span className="font-script italic text-2xl">
            {WEDDING.groom} &amp; {WEDDING.bride}
          </span>
          <span className="font-serif text-xs tracking-[0.3em] uppercase mt-1">{WEDDING.dateLabel}</span>
        </span>
        <span className="envelope-front" />
        <span className="envelope-flap" />
        <span className="envelope-seal" aria-hidden="true">
          {WEDDING.groom[0]}&amp;{WEDDING.bride[0]}
        </span>
      </button>
      <p className="tap-hint font-serif text-gold-soft text-lg tracking-widest uppercase">
        Tap the envelope to open
      </p>
    </div>
  )
}

function WeddingInvitation() {
  const { days, hours, minutes, seconds } = useCountdown(COUNTDOWN_TARGET)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [stage, setStage] = useState<Stage>('closed')
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    document.body.classList.toggle('no-scroll', stage !== 'open')
    if (stage !== 'opening') return
    const id = window.setTimeout(() => setStage('open'), ENVELOPE_OPEN_MS)
    return () => window.clearTimeout(id)
  }, [stage])

  useEffect(() => () => document.body.classList.remove('no-scroll'), [])

  useEffect(() => {
    if (stage !== 'open') return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.reveal-section'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [stage])

  const playMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false
    try {
      await audio.play()
      setIsMuted(false)
    } catch {
      setIsMuted(true)
    }
  }

  const openInvitation = () => {
    if (stage !== 'closed') return
    setStage('opening')
    // Started inside the click so browsers allow audio playback.
    void playMusic()
  }

  const toggleAudioMute = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      await playMusic()
      return
    }
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  const handleAddToCalendar = () => {
    const eventStart = new Date(WEDDING.calendar.start)
    const eventEnd = new Date(WEDDING.calendar.end)

    const formatGoogleDate = (date: Date) => {
      const pad = (value: number) => String(value).padStart(2, '0')
      return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
    }

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: WEDDING.calendar.title,
      dates: `${formatGoogleDate(eventStart)}/${formatGoogleDate(eventEnd)}`,
      details:
        WEDDING.events.map((event) => `${event.name}: ${event.when}`).join('\n') +
        '\n\nReminder preference: 2 days, 1 day, and 2 hours before.',
      location: WEDDING.calendar.location,
      trp: 'true',
    })

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden page-bg">
      <audio ref={audioRef} loop playsInline preload="auto" src={WEDDING.music} aria-hidden="true" />

      <EnvelopeIntro stage={stage} onOpen={openInvitation} />

      <div inert={stage !== 'open'}>
        <div className="static-banana-tree banana-left" aria-hidden="true">
          <img src="/bananatree.png" alt="" />
        </div>
        <div className="static-banana-tree banana-right" aria-hidden="true">
          <img src="/bananatree.png" alt="" />
        </div>

        <Petals />

        <div className="temple-border relative z-10" aria-hidden="true" />

        {/* Hero */}
        <section className="relative z-10 reveal-section flex flex-col items-center text-center pt-14 pb-12 px-4">
          <p className="font-serif italic text-gold-soft text-2xl tracking-wide mb-5">— Save The Date —</p>
          <p className="hero-caps">We are getting</p>
          <p className="hero-caps hero-caps-strong">Married</p>
          <p className="font-serif text-3xl md:text-4xl font-semibold text-gold-soft mb-8 tracking-wide uppercase">
            {WEDDING.heroDate}
          </p>

          <h1 className="font-script italic text-gold leading-tight my-4">
            <span className="block text-7xl md:text-8xl">{WEDDING.groom}</span>
            <span className="block font-serif not-italic text-3xl text-gold-soft my-3">&amp;</span>
            <span className="block text-7xl md:text-8xl">{WEDDING.bride}</span>
          </h1>

          <Divider icon="❧" />

          <p className="font-serif text-xl md:text-2xl text-ivory italic mt-3 max-w-lg leading-relaxed">
            Together with our families, we’d love nothing more than to have you with us as we begin this
            beautiful new chapter of our lives together.
          </p>

          <Divider />

          <div className="event-card max-w-md mt-5 p-10">
            <p className="font-serif text-4xl font-semibold">{WEDDING.dateLabel}</p>
            <p className="font-serif italic text-maroon text-xl mt-2">
              {WEDDING.events.map((event) => event.name).join(' · ')}
            </p>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative z-10 reveal-section flex flex-col items-center py-8 px-4">
          <h2 className="font-serif text-xl text-gold-soft italic mb-6">Counting down to the celebration…</h2>
          <div className="flex gap-3 flex-wrap justify-center">
            <CountdownUnit value={days} label="Days" />
            <CountdownUnit value={hours} label="Hours" />
            <CountdownUnit value={minutes} label="Minutes" />
            <CountdownUnit value={seconds} label="Seconds" />
          </div>
          <button type="button" onClick={handleAddToCalendar} className="calendar-btn mt-8">
            Add Wedding Schedule to Google Calendar
          </button>
        </section>

        <Divider icon="🌸" />

        {/* Events */}
        <section className="relative z-10 reveal-section max-w-2xl mx-auto px-4 py-8 space-y-8">
          <h2 className="font-script italic text-5xl text-center text-gold mb-8">Celebrations</h2>
          {WEDDING.events.map((event) => (
            <div key={event.name} className="event-card">
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0" aria-hidden="true">{event.icon}</div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold">{event.name}</h3>
                  <p className="font-serif text-maroon mt-1 text-xl md:text-2xl font-extrabold tracking-wide">
                    {event.when}
                  </p>
                  <p className="mt-2 leading-relaxed font-semibold">{event.venue}</p>
                  <p className="leading-relaxed">{event.address}</p>
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
                    📍 Get Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <Divider />

        {/* Families */}
        <section className="relative z-10 reveal-section max-w-2xl mx-auto px-4 py-8">
          <div className="event-card text-center mb-12">
            <p className="font-tamil tamil-intro-tagline">{WEDDING.tamilTagline}</p>
            <p className="font-tamil tamil-intro-names">{WEDDING.tamilNames}</p>
            <p className="font-tamil tamil-intro-date font-semibold">{WEDDING.tamilDate}</p>
            <img src="/wedding.png" alt="Wedding emblem" className="wedding-logo" />
          </div>
          <h2 className="font-script italic text-5xl text-center text-gold mb-8">Our Families</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {WEDDING.families.map((family) => (
              <div key={family.title} className="event-card text-center">
                <p className="text-4xl mb-3" aria-hidden="true">{family.icon}</p>
                <h3 className="font-serif text-3xl font-semibold">{family.title}</h3>
                <Divider icon="·" />
                <p className="leading-relaxed text-lg md:text-xl font-serif">
                  {family.relation}
                  <br />
                  <span className="font-semibold">{family.parents}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Closing message */}
        <section className="relative z-10 reveal-section flex flex-col items-center text-center px-4 py-12">
          <p className="font-script italic text-5xl text-gold mb-4">With Love &amp; Blessings</p>
          <p className="font-serif italic text-ivory text-lg max-w-md leading-relaxed">
            We look forward to celebrating these special moments with you.
          </p>
          <div className="text-4xl mt-8 select-none" aria-hidden="true">🌼 🪔 🌼</div>
        </section>

        <footer className="site-footer relative z-10 text-center py-6 px-4">
          <p className="font-serif text-gold-soft text-sm italic">
            {WEDDING.groom} &amp; {WEDDING.bride} · {WEDDING.dateLabel}
          </p>
        </footer>

        <div className="temple-border flip relative z-10" aria-hidden="true" />
      </div>

      {stage === 'open' && (
        <button
          type="button"
          onClick={toggleAudioMute}
          className="audio-toggle-button"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
              <path d="M16.5 12c0-1.77-.77-3.37-2-4.47v8.94c1.23-1.1 2-2.7 2-4.47z" />
              <path d="M5 9v6h4l5 5V4L9 9H5z" />
              <path d="M19 5l-1.41 1.41L20.17 9H17v2h3.17l-2.58 2.59L19 15l4-4-4-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
              <path d="M5 9v6h4l5 5V4L9 9H5z" />
              <path d="M14.5 12c0-1.77-.77-3.37-2-4.47v8.94c1.23-1.1 2-2.7 2-4.47z" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
