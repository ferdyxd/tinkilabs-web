'use client';

import { track } from '@vercel/analytics';

// ─── Eventos de la landing ──────────────────────────────────

export function trackSectionView(section: string) {
  track('section_view', { section });
}

export function trackCTAClick(location: string) {
  track('cta_click', { location });
}

export function trackScrollDepth(depth: number) {
  // depth: 25, 50, 75, 100
  track('scroll_depth', { depth });
}

export function trackWaitlistSubmit() {
  track('waitlist_submitted');
}
