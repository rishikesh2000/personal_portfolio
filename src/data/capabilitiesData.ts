import type { CapabilityDemo, ProcessBeat } from '../types';

export const capabilitiesData: CapabilityDemo[] = [
  {
    id: 'react-frontend',
    title: 'Modern React.js & Frontend Architecture',
    tag: 'CLIENT-SIDE',
    badge: 'REACT.JS · JAVASCRIPT',
    description: 'Frontend development with React.js, JavaScript, HTML5, CSS3, and Bootstrap.'
  },
  {
    id: 'node-backend',
    title: 'Server-Side Programming & Node.js',
    tag: 'SERVER-SIDE',
    badge: 'NODE.JS · EXPRESS',
    description: 'Backend development with Node.js and Express.js for full-stack web applications.'
  },
  {
    id: 'database-systems',
    title: 'Database Architecture & Data Modeling',
    tag: 'DATA STORAGE',
    badge: 'POSTGRESQL · MONGODB',
    description: 'Experience working with PostgreSQL, MongoDB, and SQL-based APIs.'
  },
  {
    id: 'spiritual-services',
    title: 'Spiritual Services Platforms',
    tag: 'PRABHU POOJA',
    badge: 'BOOKINGS · SERVICES',
    description: 'Built features for booking poojas, consulting astrologers, and receiving prasadam remotely.'
  },
  {
    id: 'hr-attendance',
    title: 'HR & Attendance Management',
    tag: 'HR SYSTEM',
    badge: 'ATTENDANCE · REPORTS',
    description: 'Developed HR tools for candidate applications, employee records, attendance tracking, and monthly salary reports.'
  },
  {
    id: 'colabrary',
    title: 'Frontend Development',
    tag: 'COLABRARY',
    badge: 'REACT.JS · OFFICIEL CRM',
    description: 'Contributed to Colabrary, a live Officiel CRM project, as a frontend developer using React.js.'
  }
];

export const processBeats: ProcessBeat[] = [
  {
    beatNumber: '01',
    title: 'Requirement & Architecture Design',
    kicker: 'PHASE 01 · FOUNDATION',
    description: 'Understand the application workflow first, then plan the frontend, backend, and data requirements around it.',
    quote: '"Hardwork begins with understanding the goal and breaking the work into clear, manageable steps."',
    deliverables: ['User and HR workflows', 'Service booking journeys', 'Frontend and backend requirements', 'Data and API planning']
  },
  {
    beatNumber: '02',
    title: 'Full-Stack Code Implementation',
    kicker: 'PHASE 02 · CORE DEVELOPMENT',
    description: 'Building React.js frontends and Node.js / Express.js backends, using SQL or MongoDB and Zustand where required.',
    quote: '"If I do something, I give my 100% efforts to achieve it. Writing clean, maintainable, and readable code that teams can trust for years to come."',
    deliverables: ['React.js frontend features', 'Node.js and Express.js backend', 'SQL and MongoDB integrations', 'Zustand state management']
  },
  {
    beatNumber: '03',
    title: 'Application Features & Delivery',
    kicker: 'PHASE 03 · FEATURES & HANDOFF',
    description: 'Complete the application workflows and deliver the features needed by users and the teams managing the system.',
    quote: '"Honesty means being clear about what is implemented and making the result useful for the people who rely on it."',
    deliverables: ['Candidate application review', 'Employee and role management', 'Attendance tracking', 'Monthly salary reports']
  }
];
