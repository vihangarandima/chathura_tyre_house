/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CHATHURA TYRE HOUSE — the ONE file the owner edits.
 *
 *  Every business fact shown on the site comes from here. Anything marked
 *  [CONFIRM] was taken from the Google listing / signboard / brief and must be
 *  checked by the owner before launch. Copy (headlines, sentences) lives in
 *  content/en.ts and content/si.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Hours = { open: string; close: string } | null; // null = closed that day

export const site = {
  legalName: 'Chathura Tyre House (Pvt) Ltd',
  shortName: 'Chathura Tyre House',
  url: 'https://chathuratyrehouse.lk', // [CONFIRM] final domain

  address: {
    plusCode: 'W2R6+VQ7', // [CONFIRM]
    line1: 'W2R6+VQ7, A11 Highway', // [CONFIRM]
    line2: 'Maradankadawala–Habarana–Thirukkondaiadimadu Hwy',
    city: 'Polonnaruwa',
    country: 'Sri Lanka',
    countryCode: 'LK',
    // Decoded from the plus code — [CONFIRM] against Google Maps
    geo: { lat: 7.9423, lng: 81.012 },
  },

  phones: {
    landline: { display: '027 222 3548', tel: '+94272223548' }, // [CONFIRM] from Google listing
    mobile: { display: '076 721 6485', tel: '+94767216485' }, // [CONFIRM] from signboard
  },
  whatsapp: '94767216485', // [CONFIRM] international format, no "+"

  timezone: 'Asia/Colombo',
  // [CONFIRM] Google says "open daily, closes 8:00 PM". Opening time is a guess.
  hours: {
    mon: { open: '08:00', close: '20:00' },
    tue: { open: '08:00', close: '20:00' },
    wed: { open: '08:00', close: '20:00' },
    thu: { open: '08:00', close: '20:00' },
    fri: { open: '08:00', close: '20:00' },
    sat: { open: '08:00', close: '20:00' },
    sun: { open: '08:00', close: '20:00' },
  } satisfies Record<DayKey, Hours>,

  rating: {
    value: 4.6, // [CONFIRM] update occasionally from Google
    count: 33,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=Chathura+Tyre+House+Polonnaruwa',
  },

  social: {
    facebook: 'https://www.facebook.com/search/top?q=Chathura%20Tyre%20House%20Polonnaruwa', // [CONFIRM] exact page URL
    facebookFollowers: '3.2K',
    tiktok: 'https://www.tiktok.com/search?q=Chathura%20Tyre%20House', // [CONFIRM] exact @handle URL
  },

  // [CONFIRM] which vehicle categories you sell tyres for
  vehicles: ['car', 'suv', 'van', 'threewheel', 'bike'] as const,

  // [CONFIRM] brands actually stocked. Leave empty to hide brand names entirely.
  // Rendered as plain text (no logos) unless you have licensed logo files.
  brands: [] as string[],

  /*
   * PHOTOS
   * Values are Unsplash photo ids (free Unsplash License) used as stand-ins until
   * you have your own. [REPLACE] each one with a photo from the shop: put the file in
   * /public/shop and write its path instead, e.g. hero: '/shop/front-wheel.jpg'.
   */
  photos: {
    hero: '/shop/hero-tyre.png', // complete high-performance tyre with alloy wheel
    heroInset: '1599082267768-4815b2ea6bd2', // hands fitting a tyre
    tyres: '1571335746824-742511d49bce',
    alloys: '1786489623872-2ebdfe51297c', // shop wall of alloys
    alignment: '1593699199342-59b40e08f0ac',
    workshop: '1645445522156-9ac06bc7a767',
    street: '1583155381750-1c5d2634bd3f', // tuk-tuks outside a shop
    tread: '1527266258038-6ae3e089a609',
    vehicles: {
      car: '1623564493214-6137dff043ad',
      suv: '1585824856765-0cab8940a879',
      van: '1697396248143-e6fa96564d35',
      threewheel: '1550755351-912e3220139f',
      bike: '1603137000613-6833a8002b69',
    } as Record<string, string>,
  },

  // [CONFIRM] common sizes per category shown in "Popular sizes".
  // Typical sizes for each vehicle type, NOT a stock list.
  tyreRange: [
    { id: 'car-1', vehicle: 'car', size: '175/70 R13', rim: 13, photo: '1585252522525-4f9ad48a24ea' },
    { id: 'car-2', vehicle: 'car', size: '185/65 R15', rim: 15, photo: '1657307913178-97cb5a4d0cd7' },
    { id: 'car-3', vehicle: 'car', size: '195/65 R15', rim: 15, photo: '1613214036979-1c6a7e0cf677' },
    { id: 'suv-1', vehicle: 'suv', size: '215/65 R16', rim: 16, photo: '1753030148890-56e451016a0f' },
    { id: 'suv-2', vehicle: 'suv', size: '265/65 R17', rim: 17, photo: '1775848366061-24c48c2914bc' },
    { id: 'van-1', vehicle: 'van', size: '195/80 R15', rim: 15, photo: '1612692064035-df2d74a77cb8' },
    { id: 'van-2', vehicle: 'van', size: '7.00 R16', rim: 16, photo: '1617535909749-2ca20a0a704d' },
    { id: 'tw-1', vehicle: 'threewheel', size: '4.00-8', rim: 8, photo: '1550755351-912e3220139f' },
    { id: 'bike-1', vehicle: 'bike', size: '2.75-17', rim: 17, photo: '1603137000613-6833a8002b69' },
    { id: 'bike-2', vehicle: 'bike', size: '90/90-17', rim: 17, photo: '1608248086047-12d70e2cd870' },
  ] as { id: string; vehicle: string; size: string; rim: number; photo: string; brand?: string }[],

  // Alloy wall gallery — stand-in photos tagged by style. [REPLACE] with your stock.
  alloyStyles: ['five', 'multi', 'mesh', 'sport'] as const,
  alloyWall: [
    { photo: '1542377281-73d08e3a10aa', style: 'five' },
    { photo: '1763630817192-9650723d1157', style: 'multi' },
    { photo: '1594500067118-456bba17ba14', style: 'mesh' },
    { photo: '1611838608826-4c32a6160d90', style: 'sport' },
    { photo: '1444947295498-07f60c19a4ff', style: 'five' },
    { photo: '1614212680663-20d8675d8900', style: 'multi' },
    { photo: '1594500067480-fedcbb960b73', style: 'mesh' },
    { photo: '1760413452186-962c960667fe', style: 'sport' },
  ] as { photo: string; style: string }[],

  // [CONFIRM] services offered — order matters
  services: ['tyres', 'alloys', 'alignment'] as const,
  // [CONFIRM] each "why us" claim before it goes live
  whyUs: ['alignment', 'balancing', 'fitting', 'genuine'] as const,

  // [CONFIRM] short vertical clips. `video` is optional (MP4 in /public/clips).
  // If `video` is empty, tapping opens `link` (your TikTok post) or your TikTok page.
  clips: [
    { id: 'c1', poster: '1578844251758-2f71da64c96f', video: '', link: '', caption: 'Tyre wall' },
    { id: 'c2', poster: '1599082267768-4815b2ea6bd2', video: '', link: '', caption: 'Fitting' },
    { id: 'c3', poster: '1645445522156-9ac06bc7a767', video: '', link: '', caption: 'Alignment' },
    { id: 'c4', poster: '1593699199342-59b40e08f0ac', video: '', link: '', caption: 'Balancing' },
    { id: 'c5', poster: '1477823986828-5aff156284aa', video: '', link: '', caption: 'New stock' },
  ],

  // [owner to paste] real Google reviews, copied word for word.
  // Entries with `placeholder: true` only appear in development.
  reviews: [
    { name: 'Customer name', text: 'Paste a real Google review here.', stars: 5, placeholder: true },
    { name: 'Customer name', text: 'Paste a real Google review here.', stars: 5, placeholder: true },
    { name: 'Customer name', text: 'Paste a real Google review here.', stars: 5, placeholder: true },
  ] as { name: string; text: string; stars: number; placeholder?: boolean }[],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.plusCode} ${site.address.city}`,
)}`;

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
