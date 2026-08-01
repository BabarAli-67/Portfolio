// Single source of truth for portfolio content, sourced from Babar Ali's resume.

export const profile = {
  name: 'Babar Ali',
  title: 'Full-Stack Engineer',
  subtitle: 'MERN & AI Integration',
  location: 'Lahore, Pakistan',
  email: 'babarali36912@gmail.com',
  phone: '+92 309 0123027',
  available: true,
  roles: [
    'Building Scalable REST APIs',
    'Architecting MERN Systems',
    'Integrating AI & ML Models',
    'Optimizing MongoDB Pipelines',
    'Shipping Full-Stack Products',
  ],
  summary:
    'Computer Science graduate and Full-Stack Engineer specializing in the MERN stack, RESTful API design, and AI/ML service integration (Gemini, YOLOv8, OCR). I built and shipped Hawalay — an AI-powered lost-and-found platform — end-to-end, from system architecture through deployment, alongside production client work in React and Node.js.',
  avatar: '/avatar.jpeg',
  links: {
    github: 'https://github.com/BabarAli-67',
    linkedin: 'https://linkedin.com/in/babarali92',
    x: 'https://x.com/babarali_dev',
    reddit: 'https://www.reddit.com/user/babarali_dev/',
    quora: 'https://www.quora.com/profile/Babar-Ali-2694',
    email: 'mailto:babarali36912@gmail.com',
  },
}

// Ordered social row used by Hero, Contact, and Footer.
export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/BabarAli-67' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/babarali92' },
  { id: 'x', label: 'X', href: 'https://x.com/babarali_dev' },
  { id: 'reddit', label: 'Reddit', href: 'https://www.reddit.com/user/babarali_dev/' },
  { id: 'quora', label: 'Quora', href: 'https://www.quora.com/profile/Babar-Ali-2694' },
  { id: 'email', label: 'Email', href: 'mailto:babarali36912@gmail.com' },
]

// Tech tiles for the stack.config.ts showcase card (Technical Arsenal).
export const stackGrid = [
  { label: 'Node.js', accent: 'emerald' },
  { label: 'React', accent: 'cyan' },
  { label: 'MongoDB', accent: 'emerald' },
  { label: 'Express', accent: 'blue' },
  { label: 'Gemini', accent: 'violet' },
  { label: 'FastAPI', accent: 'emerald' },
  { label: 'Next.js', accent: 'cyan' },
  { label: 'Docker', accent: 'blue' },
  { label: 'YOLOv8', accent: 'pink' },
]

export const stats = [
  { value: 4, suffix: '+', label: 'Shipped Products' },
  { value: 40, suffix: '%', label: 'Faster Queries' },
  { value: 100, suffix: '+', label: 'Concurrent Sessions' },
  { value: 5, suffix: 's', label: 'AI Match Time', prefix: '<' },
]

// Skill categories rendered as interactive 3D nodes with floating magnetic pills.
export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'Code2',
    accent: 'cyan',
    skills: ['JavaScript', 'Python', 'C++', 'SQL'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'Server',
    accent: 'violet',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Socket.io'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'LayoutTemplate',
    accent: 'blue',
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    id: 'ai',
    title: 'AI / ML & Media',
    icon: 'BrainCircuit',
    accent: 'emerald',
    skills: ['Gemini API', 'YOLOv8', 'EasyOCR', 'Hugging Face', 'Cloudinary'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    accent: 'pink',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: 'Wrench',
    accent: 'cyan',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render'],
  },
]

// Marquee tech rows on the hero.
export const marqueeTop = [
  'Node.js',
  'Express.js',
  'MongoDB',
  'React.js',
  'Next.js',
  'FastAPI',
  'Python',
  'Socket.io',
]
export const marqueeBottom = [
  'Gemini API',
  'YOLOv8',
  'EasyOCR',
  'Docker',
  'Tailwind CSS',
  'JWT Auth',
  'Cloudinary',
  'MySQL',
]

export const projects = [
  {
    id: 'hawalay',
    name: 'Hawalay',
    tagline: 'AI-Powered Lost & Found Platform',
    status: 'Deployed · Final Year Project',
    featured: true,
    categories: ['AI/ML', 'Full-Stack', 'PWA'],
    stack: ['MERN', 'FastAPI', 'YOLOv8', 'Gemini', 'EasyOCR', 'Socket.io'],
    accent: 'emerald',
    description:
      'An AI-assisted PWA that solves fragmented community item recovery and privacy risks — eliminating manual text-search mismatches and automatically protecting sensitive ID photos.',
    highlights: [
      'Architected a 3-tier system (React, Express, FastAPI, MongoDB) with a Backend-for-Frontend proxy isolating AI microservices behind secure secret-token auth.',
      'Hybrid AI matching engine: EasyOCR + YOLOv8 + 512-d Gemini embeddings, MongoDB geospatial filtering (10 km) and cosine similarity (≥ 0.70).',
      'Automated sensitive-ID masking via a custom Sharp pipeline; Socket.io real-time chat with dual-party return verification.',
      'Offline-first PWA queue via IndexedDB — cutting manual item-search time to under 5 seconds per query.',
    ],
    metrics: [
      { label: 'Match Time', value: '< 5s' },
      { label: 'Geo Radius', value: '10 km' },
      { label: 'Similarity', value: '≥ 0.70' },
    ],
    links: { demo: '#', code: 'https://github.com/BabarAli-67' },
  },
  {
    id: 'swiftdrop',
    name: 'SwiftDrop',
    tagline: 'B2C Logistics & Delivery Tracking',
    status: 'Production Platform',
    featured: false,
    categories: ['Full-Stack'],
    stack: ['MERN', 'Tailwind CSS', 'JWT', 'Zod'],
    accent: 'cyan',
    description:
      'An end-to-end B2C delivery-tracking platform automating parcel lifecycles, marketplace claiming, and payout calculation across multi-role operations.',
    highlights: [
      'Designed interactive React dashboards for Merchants (shipment management) and Riders (marketplace claiming & earnings).',
      'Secured Express REST APIs with JWT auth, pre-save bcrypt hashing, and custom role-based access control middleware.',
      'Accelerated analytics and search by 35% via multi-stage MongoDB aggregation pipelines ($match, $group, $sum) and compound indexing.',
    ],
    metrics: [
      { label: 'Query Speed', value: '+35%' },
      { label: 'Roles', value: 'Multi' },
      { label: 'Auth', value: 'JWT/RBAC' },
    ],
    links: { demo: '#', code: 'https://github.com/BabarAli-67' },
  },
  {
    id: 'alhadid',
    name: 'AlHadid International',
    tagline: 'Corporate Web Platform',
    status: 'Client Project · Production',
    featured: false,
    categories: ['Frontend', 'Full-Stack'],
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    accent: 'blue',
    description:
      'A high-performance corporate platform for a Class G5 engineering firm — an interactive, privacy-compliant showcase of verified credentials and enterprise services.',
    highlights: [
      'Built a data-driven project-catalog engine rendering 100+ projects from optimized static schemas, with category filtering, instant search, and paginated views.',
      'Eliminated redundant re-render cycles with React useMemo — fast, zero-layout-shift filtering across all breakpoints.',
      'Developed branded UI/UX systems: custom CSS keyframe animations, auto-advancing media showcases, dual-row marquees, and a compliance-document hub.',
    ],
    metrics: [
      { label: 'Projects', value: '100+' },
      { label: 'Layout Shift', value: 'Zero' },
      { label: 'Tier', value: 'Class G5' },
    ],
    links: { demo: '#', code: 'https://github.com/BabarAli-67' },
  },
  {
    id: 'streamcraft',
    name: 'StreamCraft',
    tagline: 'Video Streaming & Social Platform',
    status: 'In Progress',
    featured: false,
    categories: ['Full-Stack'],
    stack: ['MERN', 'Cloudinary', 'JWT'],
    accent: 'violet',
    description:
      'An end-to-end video streaming and content platform bridging dynamic React interfaces with scalable REST APIs for media delivery and subscriber engagement.',
    highlights: [
      'Developing Express APIs for Cloudinary-based video processing and JWT authentication.',
      'Multi-stage MongoDB aggregation pipelines ($lookup, $match, $group) for channel analytics.',
      'Bridging dynamic React interfaces with scalable REST APIs for media delivery.',
    ],
    metrics: [
      { label: 'Media', value: 'Cloudinary' },
      { label: 'Analytics', value: '$lookup' },
      { label: 'Status', value: 'WIP' },
    ],
    links: { demo: '#', code: 'https://github.com/BabarAli-67' },
  },
]

export const projectFilters = [
  { value: 'All', label: 'All' },
  { value: 'Full-Stack', label: 'Full-Stack' },
  { value: 'AI/ML', label: 'AI / ML' },
  { value: 'Frontend', label: 'Frontend' },
]

export const experience = [
  {
    id: 'innovation',
    company: 'Innovation.Tech',
    role: 'Full-Stack Engineering Intern',
    mode: 'Remote',
    period: 'Mar 2026 – Jul 2026',
    accent: 'cyan',
    points: [
      'Built responsive, production-grade interfaces for the SwiftDrop platform using React.js, Next.js, Tailwind CSS, React Hook Form, and Zod — supporting 100+ concurrent merchant and rider sessions.',
      'Implemented a centralized auth context with Axios interceptors for automatic JWT injection, protected routes, and session management — removing duplicated auth logic across 15+ components.',
      'Designed role-based REST APIs with Node.js and Express.js, applying OOP principles and custom middleware to cleanly separate Merchant and Rider workflows.',
      'Optimized MongoDB performance with compound indexes and aggregation pipelines ($match, $group, $sum), cutting average query response time by 40%.',
    ],
  },
  {
    id: 'gillan',
    company: 'Gillan E Solutions',
    role: 'Web Development Intern',
    mode: 'On-site',
    period: 'Sep 2025 – Jan 2026',
    accent: 'violet',
    points: [
      'Converted Figma/PSD designs into pixel-accurate, reusable WordPress themes using custom PHP template hierarchies and plugin integrations.',
      'Delivered production-ready client sites through a full requirements-to-QA workflow.',
    ],
  },
]

export const testimonials = [
  {
    id: 'alhadid',
    quote:
      'Working with Babar Ali has been an excellent experience. He is highly professional, knowledgeable, and committed to delivering high-quality work. He understands requirements well, communicates effectively, and always goes the extra mile to ensure the project is completed successfully. I highly recommend him for any software development project.',
    name: 'Muhammad Shahbaz',
    company: 'AL HADID International',
    website: 'https://alhadidtec.com',
    websiteLabel: 'alhadidtec.com',
    avatar: '/shahbaz.jpeg',
    accent: 'blue',
  },
]

export const education = {
  degree: 'BS Computer Science',
  school: 'University of Management and Technology (UMT)',
  location: 'Lahore, Punjab, Pakistan',
  period: 'Oct 2022 – Jul 2026',
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Systems',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Data Science',
    'Machine Learning',
  ],
}

// AI pipeline visual for the Hawalay case study.
export const pipeline = [
  { icon: 'Upload', title: 'Upload', sub: 'Input' },
  { icon: 'ScanEye', title: 'YOLOv8', sub: 'Detection' },
  { icon: 'TextSelect', title: 'EasyOCR', sub: 'Extraction' },
  { icon: 'Sparkles', title: 'Gemini', sub: 'Embeddings' },
  { icon: 'Database', title: 'MongoDB', sub: 'Geo Match' },
]
