// src/lib/posts.ts

export type PostCategory = 'Technical' | 'Field Report' | 'Safety' | 'Supply Chain'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  date: string
  readTime: string
  image: string
  featured?: boolean
  /** Slugs of products to surface in the "Shop the Story" block */
  relatedProducts: string[]
  /** Simple paragraph body for the article page */
  body: string[]
}

export const postCategories: PostCategory[] = [
  'Technical',
  'Field Report',
  'Safety',
  'Supply Chain',
]

export const posts: Post[] = [
  {
    slug: 'diagnosing-800v-systems-oscilloscope-techniques',
    title:
      'Diagnosing 800V Systems: A Deep Dive into High-Resolution Oscilloscope Techniques',
    excerpt:
      'How the shift to 800V EV architecture changes probing strategy, isolation requirements and the resolution you actually need on the bench.',
    category: 'Technical',
    date: 'Jul 04, 2026',
    readTime: '9 min read',
    image: '/images/blog-800v.png',
    featured: true,
    relatedProducts: [
      'mso8104hd-high-res-oscilloscope',
      'bt3600-battery-internal-resistance-analyzer',
    ],
    body: [
      'The move from 400V to 800V drivetrains doubled bus voltages while shrinking switching losses — and it fundamentally changed how you should probe a modern EV. Higher slew rates mean that a 200 MHz scope that served you well on legacy hybrids will now alias the very transients you are trying to see.',
      'Isolation is the first non-negotiable. Never reference a floating high-voltage bus to earth ground through a standard probe. Use a properly rated differential probe and confirm its CAT rating exceeds the working voltage with margin.',
      'Resolution matters more than raw bandwidth here. A 12-bit high-definition acquisition lets you resolve small ripple riding on a large DC bus without changing vertical scale — exactly the situation you meet when hunting for inverter switching noise.',
      'In practice, we pair the oscilloscope with an internal-resistance analyzer to correlate electrical noise against cell health. When a waveform anomaly maps to a rising internal resistance, you have found your failing module.',
    ],
  },
  {
    slug: '1000v-rated-tools-non-negotiable',
    title: 'Why 1000V-Rated Tools Are Non-Negotiable in Modern EV Workshops',
    excerpt:
      'VDE vs GS certification, what IEC 60900 actually guarantees, and how to build a compliant insulated tool kit that passes an audit.',
    category: 'Safety',
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    image: '/images/blog-safety.png',
    relatedProducts: ['vde-insulated-torque-wrench'],
    body: [
      'A tool marked "insulated" is not automatically a safe tool. IEC 60900 defines the dielectric test, the flame retardance, and the mechanical adhesion of the insulation — and only tools that pass all of it earn a compliant mark.',
      'VDE and GS are the two marks European buyers trust most. Both require independent lab testing and ongoing factory surveillance. A genuine mark is traceable to a test report; if a supplier cannot produce one, treat the certification as decorative.',
      'For a workshop servicing 400V and 800V vehicles, every tool that can touch a live conductor should be rated to 1000V AC. This includes torque wrenches, which are frequently forgotten because buyers think of them as mechanical rather than electrical tools.',
      'Build the kit as a system, document the certificates, and store them where an auditor can find them. Compliance is not paperwork — it is the difference between a controlled service procedure and an arc-flash incident.',
    ],
  },
  {
    slug: 'overlanding-the-gobi-inverter-field-report',
    title: 'Overlanding the Gobi: Testing the Limits of a 4kW Inverter at 50°C',
    excerpt:
      'A two-week field report on thermal derating, dust ingress and real-world runtime when your entire camp runs off a single hybrid inverter.',
    category: 'Field Report',
    date: 'Jun 15, 2026',
    readTime: '7 min read',
    image: '/images/blog-overland.png',
    relatedProducts: [
      'epever-4kw-hybrid-inverter',
      'expedition-led-field-light',
    ],
    body: [
      'Datasheets are written for 25°C. The desert does not care. Our two-week transit across the Gobi put a 4kW hybrid inverter through ambient temperatures that peaked at 50°C in the shade of the vehicle — the exact condition where cheaper units silently derate.',
      'The unit we ran held continuous output far better than spec-sheet skeptics expect, largely thanks to an oversized heatsink and an IP65 enclosure that kept fine dust out of the switching stage.',
      'Runtime is a system property, not a component property. Pairing the inverter with an efficient MPPT charge controller and a modest solar array meant we recharged faster than we drew down during daylight hours.',
      'The lesson for buyers: specify ingress protection and thermal headroom, not just wattage. A 4kW rating you can only reach at room temperature is a 2.5kW inverter everywhere that matters.',
    ],
  },
  {
    slug: 'vde-vs-gs-certification-explained',
    title: 'VDE vs GS Certification: What Every EV Technician Must Know',
    excerpt:
      'A plain-language guide to the two most important European safety marks for hand tools, and how to verify them before you buy in bulk.',
    category: 'Safety',
    date: 'May 30, 2026',
    readTime: '5 min read',
    image: '/images/blog-safety.png',
    relatedProducts: ['vde-insulated-torque-wrench'],
    body: [
      'VDE is a German testing and certification institute; the VDE mark on a tool means that institute tested and continues to surveil the product against the relevant IEC standard.',
      'GS ("Geprüfte Sicherheit" — tested safety) is a statutory German mark issued by accredited bodies. It is broader than VDE and legally recognised across the EU.',
      'For insulated hand tools, look for both an IEC 60900 reference and a mark backed by a real certificate. We keep the certificates on file for every insulated SKU we ship.',
    ],
  },
  {
    slug: 'inside-the-itech-factory',
    title: 'Inside the ITECH Factory: Why We Trust Their Power Solutions',
    excerpt:
      'A supply-chain report from our factory audit in East China — calibration traceability, QC sampling, and what a real partnership looks like.',
    category: 'Supply Chain',
    date: 'May 12, 2026',
    readTime: '8 min read',
    image: '/images/shanghai-hub.png',
    relatedProducts: ['it6015c-bidirectional-dc-power-supply'],
    body: [
      'A trading company is only as trustworthy as the factories behind it. That is why we audit — in person — the plants that build the instruments we sell.',
      'Calibration traceability is the first thing we check. Every programmable source that leaves the line should carry a certificate that traces back to a national metrology standard.',
      'The second is QC sampling discipline: how many units per batch are pulled, what is measured, and what happens when a unit fails. A serious factory can answer all three without hesitation.',
      'Being physically present in the Yangtze River Delta lets us do this work on your behalf. We are, in effect, your eyes inside the factory.',
    ],
  },
  {
    slug: 'building-a-portable-power-lab',
    title: 'Setting Up a Portable Power Lab in the Field: Lessons Learned',
    excerpt:
      'From bench calibration to shock-proof transport cases — how to assemble a mobile diagnostic lab that survives being driven across a continent.',
    category: 'Field Report',
    date: 'Apr 26, 2026',
    readTime: '6 min read',
    image: '/images/blog-overland.png',
    relatedProducts: [
      'mso8104hd-high-res-oscilloscope',
      'epever-4kw-hybrid-inverter',
    ],
    body: [
      'A portable lab lives or dies by its power source. Clean, stable AC from a pure-sine inverter is what keeps sensitive instruments reading accurately far from the grid.',
      'Transport is the silent killer of precision gear. Foam-lined cases and vibration isolation protect calibration between sites.',
      'Plan for recalibration intervals in the field, and carry the documentation. A measurement you cannot defend is a measurement you cannot bill for.',
    ],
  },
]

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function getFeaturedPost() {
  return posts.find((p) => p.featured) ?? posts[0]
}