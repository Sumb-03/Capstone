// Team members data for the Members tab
// Customize with real team member information

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar?: string;
  skills: string[];
  linkedin?: string;
  email?: string;
  hobbies?: string[];
  interests?: string[];
  education?: string;
  quote?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Team Member 1',
    role: 'Software Engineer',
    city: 'Porto',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    skills: ['React', 'TypeScript', 'Node.js'],
    education: "Bachelor's in Computer Science, University of Porto",
    hobbies: ['Photography', 'Hiking', 'Gaming'],
    interests: ['AI/ML', 'Web3', 'Sustainability'],
    quote: 'Code is poetry written in logic',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-2',
    name: 'Team Member 2',
    role: 'Full Stack Developer',
    city: 'Porto',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    skills: ['Python', 'Django', 'React'],
    education: "Master's in Software Engineering, University of Minho",
    hobbies: ['Rock Climbing', 'Playing Guitar', 'Cooking'],
    interests: ['UX Design', 'DevOps', 'Open Source'],
    quote: 'First, solve the problem. Then, write the code',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-3',
    name: 'Team Member 3',
    role: 'Backend Developer',
    city: 'Porto',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
  },
  {
    id: 'member-4',
    name: 'Team Member 4',
    role: 'DevOps Engineer',
    city: 'Coimbra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-5',
    name: 'Team Member 5',
    role: 'Frontend Developer',
    city: 'Coimbra',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    skills: ['Vue.js', 'CSS', 'Figma'],
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-6',
    name: 'Team Member 6',
    role: 'Data Scientist',
    city: 'Braga',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
    skills: ['Python', 'TensorFlow', 'SQL'],
  },
  {
    id: 'member-7',
    name: 'Team Member 7',
    role: 'Security Engineer',
    city: 'Faro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    skills: ['Cybersecurity', 'Penetration Testing', 'Network Security'],
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'member-8',
    name: 'Team Member 8',
    role: 'QA Engineer',
    city: 'Faro',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    skills: ['Selenium', 'Jest', 'Cypress'],
  },
  {
    id: 'member-9',
    name: 'Team Member 9',
    role: 'Cloud Architect',
    city: 'Évora',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face',
    skills: ['Azure', 'Terraform', 'Microservices'],
    linkedin: 'https://linkedin.com',
  },
];
