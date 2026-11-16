import { Review } from '../types';

const FIRST_NAMES = [
  'Marcus', 'Aiden', 'Liam', 'Omar', 'Noah', 'Daniel', 'Tariq', 'Ethan',
  'Lucas', 'Zayn', 'Ryan', 'Hamza', 'Oliver', 'Jason', 'Kieran', 'Samir',
  'Tyler', 'Mateo', 'Bilal', 'Chris', 'Devin', 'Caleb', 'Jordan', 'Malik',
  'Trevor', 'Isaiah', 'Darius', 'Austin', 'Brandon', 'Julian', 'Nathan', 'Xavier'
];

const LAST_INITIALS = ['T.', 'K.', 'R.', 'S.', 'V.', 'P.', 'M.', 'L.', 'B.', 'H.', 'C.', 'A.', 'W.', 'D.', 'F.', 'N.'];

const LOCATIONS = [
  'New York, USA', 'Chicago, USA', 'Boston, USA', 'Detroit, USA',
  'Philadelphia, USA', 'Los Angeles, USA', 'Seattle, USA', 'Denver, USA',
  'Minneapolis, USA', 'Atlanta, USA', 'Toronto, Canada', 'London, UK',
  'Manchester, UK', 'Berlin, Germany', 'Dubai, UAE', 'Paris, France'
];

const OPENING_LINES = [
  'The glossy royal blue finish looks unreal in person.',
  'Instant head-turner for winter street style.',
  'Best cold-weather pickup I have made this season.',
  'The high-shine royal blue fabric pops right out of the box.',
  'Warmth and luxury street aesthetics in one jacket.',
  'That gold metallic W-LORD shield logo on the chest looks crisp.',
  'Heavy puff insulation keeps freezing wind completely out.',
  'Love the unisex oversized fit—layers effortlessly over hoodies.',
  'Pictures do not even do this royal blue shine justice.',
  'Feels like a true Limited Winter Collection 2026 standout piece.',
  'The gold chest emblem against the royal blue shell is clean.',
  'Wore it out in snowy drizzle and the water-repellent shell beads moisture right off.',
  'Super puffy loft with a bold metallic gold W-LORD logo.',
  'Solid street style staple for chilly US winters.',
  'Ultra-warm padding without feeling stiff or heavy on the shoulders.',
  'Really impressed with the high-shine finish and luxury gold embroidery.'
];

const DETAIL_LINES = [
  'Keeps me warm even in biting morning wind.',
  'Zippers glide smoothly and the pockets are deep and cozy.',
  'Great oversized drape while still holding its structured bubble silhouette.',
  'Water-resistant shell handles sleet and light rain without losing its gloss.',
  'Embroidery on the gold shield logo is super clean with zero loose threads.',
  'Pairs effortlessly with cargos, joggers, or winter denim.',
  'Windproof cuffs and thick baffle fill lock heat in all day.',
  'Light enough for daily city commutes yet seriously insulated.',
  'Collar sits high enough to shield your neck from freezing gusts.',
  'Color stays rich and vibrant under both daylight and streetlamps.',
  'Fits true to the unisex oversized winter cut—very comfortable.',
  'Baffles stay full and evenly padded even after folding for travel.',
  'Great stitching quality throughout the seams and inner lining.',
  'Definitely worth $105.00 for this level of warmth and finish.',
  'Got multiple compliments the very first night I wore it out.',
  'Soft lining inside makes it cozy over a t-shirt or heavy fleece.'
];

const DATES = [
  'Nov 14, 2026', 'Nov 13, 2026', 'Nov 12, 2026', 'Nov 11, 2026',
  'Nov 10, 2026', 'Nov 09, 2026', 'Nov 08, 2026', 'Nov 07, 2026',
  'Nov 06, 2026', 'Nov 05, 2026', 'Nov 04, 2026', 'Nov 03, 2026',
  'Nov 02, 2026', 'Nov 01, 2026', 'Oct 30, 2026', 'Oct 28, 2026'
];

export const ROYAL_BLUE_PUFFER_SAMPLE_REVIEWS: Review[] = Array.from({ length: 256 }, (_, idx) => {
  const firstName = FIRST_NAMES[idx % FIRST_NAMES.length];
  const lastInitial = LAST_INITIALS[Math.floor(idx / FIRST_NAMES.length) % LAST_INITIALS.length];
  const location = LOCATIONS[(idx * 5 + Math.floor(idx / 16)) % LOCATIONS.length];
  const opening = OPENING_LINES[(idx * 3) % OPENING_LINES.length];
  const detail = DETAIL_LINES[(idx * 7 + Math.floor(idx / 16)) % DETAIL_LINES.length];
  const date = DATES[idx % DATES.length];
  // 245 five-star (~96%) + 11 four-star (~4%) => 4.96 => solid 5.0 rating
  const rating = idx % 23 === 11 ? 4 : 5;

  return {
    id: `rb-puffer-sample-${idx + 1}`,
    user: `${firstName} ${lastInitial}`,
    rating,
    comment: `${opening} ${detail}`,
    date,
    country: location
  };
});
