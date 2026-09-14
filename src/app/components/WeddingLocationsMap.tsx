'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  WEDDING_LOCATIONS,
  getWeddingLocationActionLabel,
  getWeddingLocationHref,
  getWeddingLocationHub,
  getWeddingLocationListEntries,
  getWeddingLocationSpokeCities,
  isWeddingLocationNavigable,
  weddingLocationTitle,
  type WeddingLocation,
} from '@/lib/weddingLocations';
import { PRIMARY_REGION, PRIMARY_STATE_ABBR } from '@/lib/siteConfig';

/**
 * Antique map marker — inked dot + serif place name.
 */
function MapPin({
  location,
  active,
  onFocus,
}: {
  location: WeddingLocation;
  active: boolean;
  onFocus: (id: string | null) => void;
}) {
  const isHubLive = location.status === 'live';
  const navigable = isWeddingLocationNavigable(location);
  const href = getWeddingLocationHref(location);
  const hub = getWeddingLocationHub(location);
  const isSpoke = Boolean(location.mapOnly);
  const dotSize = location.featured ? 11 : isSpoke ? 6 : 8;

  const marker = (
    <span className="relative flex items-center gap-1.5">
      <span
        className={`shrink-0 rounded-full transition duration-200 ${
          isHubLive
            ? 'bg-coral ring-2 ring-[#c9a07a]/55'
            : navigable
              ? 'bg-[#5c4030] ring-1 ring-coral/35'
              : 'bg-[#5c4030] ring-1 ring-[#5c4030]/25'
        } ${active ? 'scale-125' : ''}`}
        style={{ width: dotSize, height: dotSize }}
      />
      <span
        className={`whitespace-nowrap font-serif text-[0.68rem] italic leading-none tracking-wide transition sm:text-[0.76rem] ${
          isHubLive || active
            ? 'font-semibold not-italic text-[#3d2a1c]'
            : 'font-medium text-[#5c4030]/90'
        } ${active && (isHubLive || navigable) ? 'text-coral not-italic' : ''} ${
          isSpoke ? 'text-[0.62rem] sm:text-[0.68rem]' : ''
        }`}
      >
        {location.city}
      </span>
    </span>
  );

  const sharedClass =
    'absolute z-20 -translate-x-1/2 -translate-y-1/2 touch-manipulation rounded-sm px-0.5 py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral';

  if (navigable) {
    return (
      <Link
        href={href}
        className={`${sharedClass} hover:opacity-90`}
        style={{ left: `${location.x}%`, top: `${location.y}%` }}
        aria-label={
          hub
            ? `${location.city} wedding photography — see ${hub.city} area`
            : weddingLocationTitle(location.city, true)
        }
        onMouseEnter={() => onFocus(location.id)}
        onMouseLeave={() => onFocus(null)}
        onFocus={() => onFocus(location.id)}
        onBlur={() => onFocus(null)}
      >
        {marker}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={sharedClass}
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
      aria-label={`${location.city} wedding photography — page coming soon`}
      onMouseEnter={() => onFocus(location.id)}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(location.id)}
      onBlur={() => onFocus(null)}
    >
      {marker}
    </button>
  );
}

/** Tiny hand-drawn tree cluster (antique map flourish). */
function TreeCluster({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.45" fill="#5c4030">
      <ellipse cx="0" cy="2" rx="2.2" ry="1.1" opacity="0.35" />
      <path d="M0 2 L-3.5 -4 L0 -9 L3.5 -4 Z" />
      <path d="M5 3 L2.5 -1 L5 -5 L7.5 -1 Z" opacity="0.7" />
      <path d="M-5 3.5 L-7.2 0 L-5 -3.5 L-2.8 0 Z" opacity="0.65" />
    </g>
  );
}

/**
 * Pee Dee region map — vintage Carolina atlas plate:
 * aged parchment, soft washes, inked rivers, compass & cartouche.
 */
function PeeDeeMapArt() {
  const ink = '#5c4030';
  const countyStroke = {
    stroke: ink,
    strokeWidth: 0.95,
    strokeDasharray: '4 2.8',
    fill: '#f3ead8',
  };

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="parchment-wash" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#f7f0e0" />
          <stop offset="55%" stopColor="#ebe0c8" />
          <stop offset="100%" stopColor="#dccdb0" />
        </radialGradient>
        <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.45
                    0 0 0 0 0.35
                    0 0 0 0 0.22
                    0 0 0 0.12 0"
          />
        </filter>
      </defs>

      {/* Aged parchment base */}
      <rect width="520" height="420" fill="url(#parchment-wash)" />
      <rect
        width="520"
        height="420"
        filter="url(#paper-grain)"
        opacity="0.55"
      />

      {/* Foxing / age stains */}
      <ellipse cx="70" cy="55" rx="55" ry="35" fill="#c4a882" opacity="0.18" />
      <ellipse cx="460" cy="340" rx="70" ry="45" fill="#b8956e" opacity="0.16" />
      <ellipse cx="250" cy="390" rx="90" ry="28" fill="#c9b089" opacity="0.14" />
      <ellipse cx="400" cy="80" rx="40" ry="25" fill="#a88860" opacity="0.1" />

      {/* Soft fold lines */}
      <path
        d="M0 140 Q260 148 520 135"
        stroke="#a89070"
        strokeWidth="1"
        opacity="0.18"
      />
      <path
        d="M0 280 Q260 272 520 285"
        stroke="#a89070"
        strokeWidth="1"
        opacity="0.14"
      />
      <path
        d="M175 0 Q168 210 182 420"
        stroke="#a89070"
        strokeWidth="1"
        opacity="0.12"
      />

      {/* —— Neighboring counties —— */}
      <path
        d="M195 18 L280 12 L310 55 L275 78 L200 70 L175 40 Z"
        {...countyStroke}
        fill="#eef3e4"
      />
      <path
        d="M310 55 L380 48 L420 95 L400 140 L340 125 L310 90 Z"
        {...countyStroke}
        fill="#f0ead8"
      />
      <path
        d="M95 70 L175 40 L200 70 L215 130 L180 185 L110 175 L85 120 Z"
        {...countyStroke}
        fill="#ebe8d4"
      />
      <path
        d="M55 140 L85 120 L110 175 L125 230 L90 260 L50 220 Z"
        {...countyStroke}
        opacity="0.9"
        fill="#e8e2d0"
      />
      <path
        d="M340 125 L400 140 L445 175 L440 240 L385 255 L345 210 L330 160 Z"
        {...countyStroke}
        fill="#eef1e0"
      />
      <path
        d="M125 230 L215 220 L270 250 L265 320 L180 335 L120 300 Z"
        {...countyStroke}
        fill="#ebe6d2"
      />
      <path
        d="M90 260 L125 230 L120 300 L85 320 L60 280 Z"
        {...countyStroke}
        opacity="0.75"
        fill="#e8e0cc"
      />
      <path
        d="M270 250 L345 210 L385 255 L370 320 L300 340 L265 320 Z"
        {...countyStroke}
        opacity="0.8"
        fill="#e6eddf"
      />

      {/* Florence County — soft olive wash (no hard highlight) */}
      <path
        d="M180 185
           L215 130
           L275 78
           L310 90
           L340 125
           L330 160
           L345 210
           L270 250
           L215 220
           L125 230
           L180 185 Z"
        fill="#c9c4a0"
        fillOpacity="0.55"
        stroke={ink}
        strokeWidth="1.15"
        strokeDasharray="4 2.8"
      />

      {/* —— Rivers —— */}
      <path
        d="M290 20
           C275 70 305 100 292 145
           C278 195 300 230 285 275
           C272 315 290 350 278 400"
        stroke="#7a9aa0"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M290 20
           C275 70 305 100 292 145
           C278 195 300 230 285 275
           C272 315 290 350 278 400"
        stroke="#a8c0c4"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M70 160
           C120 175 160 190 200 205
           C230 215 255 235 275 265"
        stroke="#7a9aa0"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M70 160
           C120 175 160 190 200 205
           C230 215 255 235 275 265"
        stroke="#b0c8cc"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      <text
        x="308"
        y="100"
        fill="#5a787c"
        fontSize="9.5"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        transform="rotate(72 308 100)"
        opacity="0.85"
      >
        Great Pee Dee River
      </text>

      {/* Small lake */}
      <ellipse
        cx="155"
        cy="145"
        rx="18"
        ry="9"
        fill="#9eb5b0"
        opacity="0.45"
      />
      <ellipse
        cx="155"
        cy="145"
        rx="13"
        ry="6"
        fill="#c5d6d0"
        opacity="0.65"
      />

      {/* Tree flourishes */}
      <TreeCluster x={100} y={95} />
      <TreeCluster x={380} y={200} />
      <TreeCluster x={150} y={300} />

      {/* Gentle hills (west) */}
      <g fill="#5c4030" opacity="0.2">
        <path d="M48 175 Q55 160 62 175 Q55 168 48 175" />
        <path d="M62 178 Q70 162 78 178 Q70 170 62 178" />
        <path d="M55 188 Q64 172 73 188 Q64 180 55 188" />
      </g>

      {/* Double plate border + tick marks */}
      <rect
        x="10"
        y="10"
        width="500"
        height="400"
        stroke={ink}
        strokeWidth="2.2"
        fill="none"
        opacity="0.55"
      />
      <rect
        x="16"
        y="16"
        width="488"
        height="388"
        stroke={ink}
        strokeWidth="0.7"
        fill="none"
        opacity="0.4"
      />
      {/* Coordinate ticks */}
      {[60, 130, 200, 270, 340, 410].map((x) => (
        <g key={`tx-${x}`} opacity="0.35">
          <line x1={x} y1="10" x2={x} y2="16" stroke={ink} strokeWidth="0.8" />
          <line
            x1={x}
            y1="404"
            x2={x}
            y2="410"
            stroke={ink}
            strokeWidth="0.8"
          />
        </g>
      ))}
      {[70, 140, 210, 280, 350].map((y) => (
        <g key={`ty-${y}`} opacity="0.35">
          <line x1="10" y1={y} x2="16" y2={y} stroke={ink} strokeWidth="0.8" />
          <line
            x1="504"
            y1={y}
            x2="510"
            y2={y}
            stroke={ink}
            strokeWidth="0.8"
          />
        </g>
      ))}

      {/* Title cartouche */}
      <g transform="translate(260, 388)">
        <rect
          x="-72"
          y="-16"
          width="144"
          height="28"
          rx="2"
          fill="#f3ead8"
          stroke={ink}
          strokeWidth="0.9"
          opacity="0.92"
        />
        <path
          d="M-78 -4 Q-84 -2 -78 2"
          fill="none"
          stroke={ink}
          strokeWidth="0.7"
          opacity="0.5"
        />
        <path
          d="M78 -4 Q84 -2 78 2"
          fill="none"
          stroke={ink}
          strokeWidth="0.7"
          opacity="0.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fill={ink}
          fontSize="11"
          fontFamily="Georgia, 'Times New Roman', serif"
          letterSpacing="3.5"
          fontWeight="600"
          opacity="0.8"
        >
          PEE DEE
        </text>
      </g>

      {/* Compass rose + faint rhumb lines */}
      <g transform="translate(455, 55)" opacity="0.75">
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="0"
            x2={Math.cos(((deg - 90) * Math.PI) / 180) * 48}
            y2={Math.sin(((deg - 90) * Math.PI) / 180) * 48}
            stroke={ink}
            strokeWidth="0.4"
            opacity="0.25"
          />
        ))}
        <circle cx="0" cy="0" r="26" fill="none" stroke={ink} strokeWidth="0.85" />
        <circle cx="0" cy="0" r="18" fill="none" stroke={ink} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="4" fill="#f3ead8" stroke={ink} strokeWidth="0.5" />
        <path d="M0,-24 L3.2,-5 L0,0 L-3.2,-5 Z" fill={ink} />
        <path d="M0,24 L3.2,5 L0,0 L-3.2,5 Z" fill={ink} opacity="0.4" />
        <path d="M24,0 L5,3.2 L0,0 L5,-3.2 Z" fill={ink} opacity="0.4" />
        <path d="M-24,0 L-5,3.2 L0,0 L-5,-3.2 Z" fill={ink} opacity="0.4" />
        <text
          x="0"
          y="-30"
          textAnchor="middle"
          fill={ink}
          fontSize="10"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="600"
        >
          N
        </text>
      </g>

      {/* Small sailing ship flourish (east water) */}
      <g transform="translate(485, 210)" opacity="0.35" fill={ink}>
        <path d="M-10 6 L10 6 L6 10 L-6 10 Z" />
        <path d="M0 -10 L0 6" stroke={ink} strokeWidth="0.8" />
        <path d="M0 -8 L8 2 L0 2 Z" opacity="0.7" />
        <path d="M0 -6 L-6 1 L0 1 Z" opacity="0.5" />
      </g>
    </svg>
  );
}

export default function WeddingLocationsMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const liveCount = WEDDING_LOCATIONS.filter((l) => l.status === 'live').length;
  const listedLocations = getWeddingLocationListEntries();

  return (
    <section
      className="border-t border-[#e0d9ce] bg-paper px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24"
      aria-labelledby="service-locations-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-boho-sage">Where I shoot</p>
          <h2
            id="service-locations-heading"
            className="mt-4 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl"
          >
            Across the {PRIMARY_REGION}
          </h2>
          <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
            These are the towns closest to home—pick one on the map or from the
            list, & tap a live marker for that wedding page. I&apos;m always
            happy to travel farther too; if your day is outside the{' '}
            {PRIMARY_REGION}, we&apos;ll talk through travel when you reach out.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-7">
            <div
              className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-[2px] border-[3px] border-[#5c4030]/35 bg-[#ebe0c8] shadow-[0_16px_40px_rgba(61,52,44,0.12),inset_0_0_60px_rgba(140,110,70,0.12)] ring-1 ring-[#c4a882]/50"
              role="img"
              aria-label={`Map of wedding photography locations across the ${PRIMARY_REGION} region of ${PRIMARY_STATE_ABBR}`}
            >
              <PeeDeeMapArt />

              <div className="absolute inset-0">
                {WEDDING_LOCATIONS.map((location) => (
                  <MapPin
                    key={location.id}
                    location={location}
                    active={activeId === location.id}
                    onFocus={setActiveId}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="divide-y divide-[#d4c4a8]/80 rounded-[2px] border border-[#c4a882]/70 bg-[#f7f0e0]/95 shadow-[0_8px_28px_rgba(61,52,44,0.05)] dark:divide-boho-stone/30 dark:border-boho-stone/40 dark:bg-boho-bark/50">
              {listedLocations.map((location) => {
                const isLive = location.status === 'live';
                const navigable = isWeddingLocationNavigable(location);
                const href = getWeddingLocationHref(location);
                const isActive = activeId === location.id;
                const spokeCities = getWeddingLocationSpokeCities(location.id);
                const rowClass = `flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition sm:px-6 sm:py-4 ${
                  isActive ? 'bg-coral/8 dark:bg-white/5' : ''
                }`;

                const content = (
                  <>
                    <span className="flex min-w-0 items-start gap-3">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          isLive ? 'bg-coral' : navigable ? 'bg-coral/70' : 'bg-[#5c4030]'
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span
                          className={`block font-serif text-sm italic sm:text-[0.9375rem] ${
                            isLive || navigable
                              ? 'font-medium not-italic text-cream-dark dark:text-cream'
                              : 'text-cream-dark/70 dark:text-cream/60'
                          }`}
                        >
                          {location.city}
                        </span>
                        {spokeCities.length > 0 ? (
                          <span className="mt-0.5 block font-body text-[0.6875rem] font-light leading-snug text-cream-dark/45 dark:text-cream/40">
                            {spokeCities.join(' · ')}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 font-body text-xs font-light sm:text-[0.8125rem] ${
                        isLive || navigable
                          ? 'text-coral dark:text-[#e8b896]'
                          : 'text-cream-dark/40 dark:text-cream/35'
                      }`}
                    >
                      {getWeddingLocationActionLabel(location)}
                    </span>
                  </>
                );

                return (
                  <li key={location.id}>
                    {navigable ? (
                      <Link
                        href={href}
                        className={`${rowClass} hover:bg-coral/6 dark:hover:bg-white/5`}
                        onMouseEnter={() => setActiveId(location.id)}
                        onMouseLeave={() => setActiveId(null)}
                        onFocus={() => setActiveId(location.id)}
                        onBlur={() => setActiveId(null)}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div
                        className={rowClass}
                        onMouseEnter={() => setActiveId(location.id)}
                        onMouseLeave={() => setActiveId(null)}
                      >
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/60 dark:text-cream/55">
              {liveCount === 1
                ? `More ${PRIMARY_REGION} wedding pages will land here as they’re ready.`
                : `${liveCount} locations are live so far.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
