import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'prabhu-pooja',
    title: 'Prabhu Pooja',
    category: 'Full-Stack Spiritual Services Platform',
    client: 'InstaConnects · Indore, India',
    year: 'Feb 2025 — Present',
    honor: 'Professional Project',
    headline: 'A spiritual services platform for booking poojas, consulting astrologers, and receiving prasadam remotely.',
    description: 'Built a full-stack platform that connects users with spiritual services. SQL-based APIs support user profiles, bookings, and service management, while Zustand manages state across the React frontend.',
    tags: ['React.js', 'Node.js', 'Express.js', 'SQL', 'Zustand'],
    details: [
      { label: 'Architecture', value: 'MVC with Node.js and Express' },
      { label: 'Data', value: 'SQL-based APIs for profiles, bookings, and services' },
      { label: 'Frontend state', value: 'Zustand' }
    ],
    features: [
      'Built a full-stack platform for booking poojas and consulting astrologers',
      'Enabled users to receive prasadam remotely',
      'Integrated SQL-based APIs for profiles, bookings, and service management',
      'Implemented Zustand state management in the React frontend',
      'Organized the backend using MVC architecture with Node.js and Express'
    ],
    stats: [
      { label: 'Platform focus', value: 'Spiritual services' },
      { label: 'Bookings', value: 'Poojas & astrologers' },
      { label: 'Remote service', value: 'Prasadam delivery' },
      { label: 'Frontend state', value: 'Zustand' }
    ]
  },
  {
    id: 'hr-attendance-management',
    title: 'HR & Attendance Management System',
    category: 'Full-Stack HR Application',
    client: 'InstaConnects · Indore, India',
    year: 'Feb 2025 — Present',
    honor: 'Professional Project',
    headline: 'A full-stack HR system for job applications, employee records, attendance tracking, and monthly salary reports.',
    description: 'Developed an HR management system with candidate application submissions and tools for HR teams to manage employee data. The admin panel includes role-based login, application review and status updates, employee role management, attendance tracking, and monthly salary report generation.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Zustand'],
    details: [
      { label: 'Access', value: 'Role-based HR admin login' },
      { label: 'Data', value: 'MongoDB' },
      { label: 'Frontend state', value: 'Zustand' }
    ],
    features: [
      'Enabled candidates to submit job applications',
      'Built an admin panel for reviewing applications and updating candidate status',
      'Added employee data and role management for HR teams',
      'Implemented employee attendance tracking',
      'Automated generation of monthly salary reports'
    ],
    stats: [
      { label: 'Applications', value: 'Candidate submissions' },
      { label: 'Admin tools', value: 'Role-based access' },
      { label: 'Tracking', value: 'Employee attendance' },
      { label: 'Reports', value: 'Monthly salaries' }
    ]
  },
  {
    id: 'colabrary',
    title: 'Colabrary',
    category: 'Frontend Development',
    client: 'Officiel CRM · Remote',
    year: 'Jul 2024 — Oct 2024',
    honor: 'Live Project',
    headline: 'A live Officiel CRM project with frontend development contributed in React.js.',
    description: 'Contributed to Colabrary as a frontend developer during work as a Junior Software Engineer at Officiel CRM.',
    tags: ['React.js'],
    details: [
      { label: 'Project', value: 'Live Officiel CRM project' },
      { label: 'Role', value: 'Frontend developer' },
      { label: 'Technology', value: 'React.js' }
    ],
    features: [
      'Contributed to a live project at Officiel CRM',
      'Worked on frontend development using React.js'
    ],
    stats: [
      { label: 'Project', value: 'Live CRM project' },
      { label: 'Contribution', value: 'Frontend development' }
    ]
  }
];
