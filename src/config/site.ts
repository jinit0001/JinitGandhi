/**
 * EVERYTHING you may want to edit lives in this file.
 * Optional fields (marked "optional") are simply hidden when left out.
 */

export const site = {
  name: 'Jinit Gandhi',
  roles: ['Project Management', 'Product Management', 'Business Operations'],
  headline: 'Building Clarity Between *Ideas,* *People* & Execution.',
  intro:
    "I'm Jinit Gandhi — an aspiring Project and Product Management professional interested in turning complex ideas into structured execution.",
  positioning:
    'I bridge the gap between people, processes and technology to turn ideas into organized, meaningful outcomes.',
  // Edit this to change the availability pill in the hero.
  availability: { show: true, label: 'Open to internships · 2026–27' },
  facts: ['B.Tech CSE (AI)', 'Class of 2027', 'Vadodara · Mumbai'],
  links: {
    email: 'gandhijinit@gmail.com',
    linkedin: 'https://linkedin.com/in/jinit-gandhi-1b70b4298',
    github: 'https://github.com/jinit0001',
    resume: '/Jinit_Gandhi_Resume.pdf', // replace public/Jinit_Gandhi_Resume.pdf to update
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ],
}

export const about = {
  statement:
    'I am interested in how products get built, how teams work together, and how organisations run better. I like being the person who turns a messy idea into a clear plan, and then keeps it moving.',
  pillars: [
    { n: '01', title: 'Project & product thinking', text: 'I like understanding what a project is really trying to achieve before deciding how to do it: the goal, the users, and what “done” means.' },
    { n: '02', title: 'Team coordination', text: 'I have coordinated a four-person team from planning to delivery, keeping tasks, owners and deadlines visible so nobody has to guess.' },
    { n: '03', title: 'Business operations', text: 'I am drawn to how work flows through an organisation: where it gets stuck, who needs to act, and how a process can be improved.' },
    { n: '04', title: 'Organised execution', text: 'Task tracking, documentation, requirement management and progress reviews are habits for me, not afterthoughts.' },
  ],
}

export type Tag = 'Project Management' | 'Coordination' | 'Operations' | 'Academic' | 'Simulation'
export const journeyFilters: ('All' | Tag)[] = ['All', 'Project Management', 'Coordination', 'Operations', 'Academic', 'Simulation']

export interface JourneyItem {
  when: string
  title: string
  org: string
  kind: 'Academic project' | 'Virtual job simulation' | 'Education' | 'Certification'
  tags: Tag[]
  summary: string
  details?: string[]
}

export const journey: JourneyItem[] = [
  {
    when: '2026', title: 'Operations Job Simulation', org: 'Goldman Sachs · via Forage', kind: 'Virtual job simulation', tags: ['Operations', 'Simulation'],
    summary: 'Traced a stuck client transaction to its root cause across a compliance hold and a liquidity gap, and wrote a formal Trade Fail Report.',
    details: [
      'Reviewed account data and found five pending transactions that were really one chain of delays, all upstream of the one transaction funding the client’s purchase.',
      'Worked out which teams had to act: Trading Desk, Compliance and Risk, and Client Service. I also noted which issue belonged to IT instead.',
      'Assessed client, regulatory and liquidity risk. A compliance hold cannot be bypassed under time pressure, so the plan escalated it and chased the missing documents instead.',
      'Recommended an alert for linked pending transactions and a checklist for time-sensitive, single-asset purchases.',
    ],
  },
  {
    when: '2026', title: 'Product Management Job Simulation', org: 'Electronic Arts · via Forage', kind: 'Virtual job simulation', tags: ['Project Management', 'Simulation'],
    summary: 'Analysed engagement, retention and churn data and used segmentation and KPI analysis to shape product recommendations.',
    details: [
      'Segmented users and compared how groups behaved over time.',
      'Turned the analysis into a structured report and presentation aimed at stakeholder review.',
    ],
  },
  {
    when: '2026', title: 'KeyMood-AI', org: 'Team of four · Academic project', kind: 'Academic project', tags: ['Project Management', 'Coordination', 'Academic'],
    summary: 'Coordinated a four-person team building a privacy-preserving emotion-detection platform, from planning through delivery.',
    details: [
      'Planned the work, split it across four people, and tracked progress against the plan.',
      'Owned architecture and integration, and made the call to re-run experiments when the first results were not reliable.',
      'Documented each module so teammates could pick up their own parts.',
    ],
  },
  {
    when: '2026', title: 'OpenTrace', org: 'Team project · Academic project', kind: 'Academic project', tags: ['Coordination', 'Academic'],
    summary: 'Defined requirements and the end-to-end workflow for a digital-footprint risk analyzer, then coordinated build, testing and handover.',
  },
  {
    when: '2026', title: 'Business Analytics & AI Foundations', org: 'UniAthena & Cambridge · IBM on Coursera', kind: 'Certification', tags: ['Academic'],
    summary: 'Basics of Business Analytics (UniAthena and Cambridge International Qualifications) and AI Foundations for Business (IBM).',
  },
  {
    when: '2023 – 2027', title: 'B.Tech, Computer Science Engineering (AI)', org: 'Parul Institute of Engineering and Technology, Vadodara', kind: 'Education', tags: ['Academic'],
    summary: 'Final year, graduating in 2027. CGPA 7.09 / 10.',
  },
]

export interface Project {
  id: string
  index: string
  title: string
  kicker: string
  short: string
  year: string
  tags: string[]
  overview: string
  role?: string
  problem?: string
  approach?: string
  tools?: string[]
  contributions?: string[]
  learned?: string
  link?: { label: string; href: string }
}

export const projects: Project[] = [
  {
    id: 'keymood-ai', index: '01', title: 'KeyMood AI', kicker: 'Privacy-preserving behavioural computing', year: '2026',
    short: 'Emotion detection from typing patterns, built so raw keystrokes never need to leave a person’s device.',
    tags: ['Federated learning', 'FastAPI', 'Team of 4'],
    overview: 'A privacy-preserving behavioural computing platform for emotion detection using keystroke dynamics and federated learning. It reads how a person types (speed, key-hold time and the gaps between keys) and compares it with their own baseline, instead of collecting what they write.',
    role: 'Team lead of a four-person group: planning and coordination, architecture and integration.',
    problem: 'Most emotion-detection systems gather a lot of sensitive data in one place. The question was whether something as personal as emotional state could be inferred from something as ordinary as typing rhythm, without centralising anyone’s raw data.',
    approach: 'Start with the smallest useful signal set, build the model around each person’s own baseline, and design for privacy from day one with a federated approach. When early results were unreliable, the team stopped to re-run the experiments properly instead of shipping a model that only looked finished.',
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'React', 'Federated learning (FedAvg simulation)'],
    contributions: [
      'Coordinated planning, task split and progress tracking across four people.',
      'Owned architecture and integration, with modules for authentication, profile and settings, emotion detection, guardian and SOS alerts, journaling, recommendations, analytics, friends and messaging.',
      'Wrote and ran 205 automated tests against a real PostgreSQL and Redis. Real-database testing caught a bug where writes were silently never saved, which mocks would have missed.',
      'Documented each module so teammates could work on their own parts.',
    ],
    learned: 'Cheap, early validation beats willpower when a deadline is close, and testing against the real thing finds problems that fakes never will.',
    link: { label: 'Backend on GitHub', href: 'https://github.com/jinit0001/module-2' },
  },
  {
    id: 'unidex', index: '02', title: 'UniDex Dashboard', kicker: 'Departmental claims management', year: '2026',
    short: 'A dashboard-based system to organise claims management, documentation and reporting workflows.',
    tags: ['Dashboard', 'Workflows', 'Reporting'],
    overview: 'A dashboard-based system designed to organise departmental claims management, documentation and reporting workflows in one place.',
    problem: 'Claims, supporting documents and reports are easy to lose track of when they live in different places and move through different hands.',
    approach: 'Bring claims, documentation and reporting into one dashboard view so the status of each item, and what has to happen next, is visible.',
    // Add any of these later and the matching section will appear automatically:
    // role: '', tools: [], contributions: [], learned: ''
  },
  {
    id: 'logistics-risk', index: '03', title: 'Logistics Risk Assessment Tool', kicker: 'Structured risk assessment', year: '2026',
    short: 'A project focused on organising logistics risk information and supporting structured assessment and reporting.',
    tags: ['Risk', 'Assessment', 'Reporting'],
    overview: 'A project focused on organising logistics risk information and supporting structured assessment and reporting.',
    problem: 'Risk information in logistics is scattered and hard to compare, which makes consistent assessment and reporting difficult.',
    approach: 'Collect the risk information in a consistent structure, then assess and report on it in a repeatable way.',
    // Add any of these later and the matching section will appear automatically:
    // role: '', tools: [], contributions: [], learned: ''
  },
  {
    id: 'opentrace', index: '04', title: 'OpenTrace', kicker: 'AI-powered cyber risk analyzer', year: '2026',
    short: 'A tool that shows everyday people what their public GitHub and Reddit footprint says about them.',
    tags: ['React', 'Node.js', 'MongoDB'],
    overview: 'A full-stack tool that scores digital-footprint risk. A person enters a profile, the tool pulls data through REST APIs, and returns a risk score with a plain-language explanation of why.',
    role: 'Requirements and workflow definition, API integration with teammates, testing and QA, and handover documentation.',
    problem: 'Most people have no real idea what their public footprint reveals. Each profile looks harmless alone, but together they can show patterns and weak spots.',
    approach: 'Narrow to two high-signal sources (GitHub and Reddit), score the exposure, and explain the result in plain language. When part of the original scope did not hold up, the requirements were reworked instead of patched around.',
    tools: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    contributions: [
      'Defined requirements and the end-to-end workflow, from data collection to reporting.',
      'Built the GitHub and Reddit API integration with teammates.',
      'Handled testing and QA, and documented the process for handover.',
    ],
    learned: 'Write the acceptance criteria before building, so a wrong assumption shows up on paper instead of in code.',
  },
]

export interface SkillGroup { id: string; title: string; blurb: string; items: { name: string; note?: string; learning?: boolean }[] }
export const skills: SkillGroup[] = [
  { id: 'product', title: 'Product Management', blurb: 'How I turn a vague idea into something buildable.', items: [
    { name: 'Product Thinking' }, { name: 'Problem Breakdown' }, { name: 'Requirements Definition', note: 'OpenTrace' },
    { name: 'Product Scoping' }, { name: 'PRDs' }, { name: 'User Stories' }, { name: 'Feature Definition' },
    { name: 'Workflow Specifications' }, { name: 'Acceptance Criteria' }, { name: 'Market Research & Analysis' },
  ]},
  { id: 'execution', title: 'Product Execution', blurb: 'How I help work get shipped.', items: [
    { name: 'SDLC Understanding' }, { name: 'UAT & Quality Assurance' }, { name: 'Backlog Management' },
    { name: 'Agile / Scrum' }, { name: 'Sprint Planning' }, { name: 'Prioritization' },
    { name: 'Product Documentation', note: 'Module and handover docs' }, { name: 'Rollout Planning' }, { name: 'Feature Iteration' },
  ]},
  { id: 'pm', title: 'Project & Stakeholders', blurb: 'How I keep people and work aligned.', items: [
    { name: 'Task Management', note: 'KeyMood-AI team of four' }, { name: 'Project Coordination', note: 'Planning to delivery' },
    { name: 'Cross-functional Collaboration' }, { name: 'Stakeholder Management' }, { name: 'Dependency Tracking' },
    { name: 'Risk Identification' }, { name: 'Delivery Coordination' }, { name: 'Timeline Management' }, { name: 'Progress Monitoring' },
  ]},
  { id: 'data', title: 'Data & Analysis', blurb: 'How I use numbers to decide.', items: [
    { name: 'KPI Tracking' }, { name: 'Data-Driven Decision Making' }, { name: 'Data Validation' },
    { name: 'User Segmentation', note: 'EA simulation' }, { name: 'Funnel Analysis' }, { name: 'Operational Metrics' }, { name: 'Structured Reporting' },
  ]},
  { id: 'ops', title: 'Business & Operations', blurb: 'How I look at how work flows.', items: [
    { name: 'Process Coordination' }, { name: 'Workflow Management' }, { name: 'Reporting', note: 'Simulation reports' },
    { name: 'Problem Solving', note: 'Root-cause tracing' },
  ]},
  { id: 'tools', title: 'Tools', blurb: 'What I use day to day.', items: [
    { name: 'Jira' }, { name: 'Microsoft Excel' }, { name: 'Power BI' }, { name: 'MS Office' },
    { name: 'Google Workspace' }, { name: 'Notion' }, { name: 'Git / GitHub' }, { name: 'Trello', learning: true },
  ]},
  { id: 'tech', title: 'Technology', blurb: 'The technical base behind how I work.', items: [
    { name: 'Python', note: 'Basic · FastAPI, Flask' }, { name: 'C', note: 'Basic' }, { name: 'Java' }, { name: 'JavaScript' },
    { name: 'React' }, { name: 'SQL', note: 'Basic' }, { name: 'MongoDB' }, { name: 'PostgreSQL' },
    { name: 'REST APIs' }, { name: 'FastAPI', note: 'KeyMood-AI backend' }, { name: 'AI / ML Fundamentals' },
  ]},
]

export const process = [
  { n: '01', title: 'Understand', text: 'Get clear on the objective, the requirements and what everyone expects, before any plan is made.' },
  { n: '02', title: 'Plan', text: 'Break the work into tasks, milestones and timelines, with a clear owner for each piece.' },
  { n: '03', title: 'Coordinate', text: 'Keep stakeholders aligned and make sure the right people hear the right thing at the right time.' },
  { n: '04', title: 'Execute', text: 'Track progress, spot blockers early and support the team to get work over the line.' },
  { n: '05', title: 'Improve', text: 'Review what happened and turn it into a better way of working for the next round.' },
]

export interface Learning { title: string; org: string; label: string; simulation?: boolean; text: string }
export const learning: Learning[] = [
  { title: 'Product Management Simulation', org: 'Electronic Arts', label: 'Virtual job simulation · Forage', simulation: true, text: 'A guided exercise on engagement, retention and churn analysis. It is a virtual simulation, not employment.' },
  { title: 'Operations Simulation', org: 'Goldman Sachs', label: 'Virtual job simulation · Forage', simulation: true, text: 'A guided exercise tracing a delayed client transaction and writing a Trade Fail Report. It is a virtual simulation, not employment.' },
  { title: 'Basics of Business Analytics', org: 'UniAthena & Cambridge International Qualifications', label: 'Certification · 2026', text: 'Foundations of business analytics.' },
  { title: 'AI Foundations for Business', org: 'IBM · Coursera', label: 'Certification · 2026', text: 'How AI applies to business problems.' },
]
