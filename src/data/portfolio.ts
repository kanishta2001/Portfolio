export type Project = {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  status?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const profile = {
  name: "Nipun Karunarathna",
  title: "Full-Stack Web Developer",
  status: "Software Engineering Undergraduate",
  email: "kanishtakarunarathne2001@gmail.com",
  github: "https://github.com/kanishta2001",
  linkedin: "https://www.linkedin.com/in/nipun-karunarathne",
  cv: "/cv/Nipun-Karunarathna-CV.pdf",
  bio: "I am a Software Engineering undergraduate focused on full-stack web development. I enjoy creating clean user interfaces, building structured backend APIs, and learning modern technologies by working on practical projects.",
  about: [
    "Hi, I'm Nipun Karunarathna. I am a Software Engineering undergraduate at NSBM Green University in Sri Lanka, with a strong interest in full-stack web development and building practical software solutions.",
    "I enjoy working across both frontend and backend development using technologies such as React, Next.js, C#, ASP.NET Core, and SQL Server. I am especially interested in creating clean user interfaces, structured APIs, and applications that are simple, useful, and well organized.",
    "Through academic and personal project work, I continue to improve my programming knowledge, problem-solving skills, and understanding of how complete software applications are designed and developed.",
    "I am currently focused on strengthening my full-stack development skills and preparing for software engineering internship opportunities where I can gain real-world experience and continue growing as a developer.",
  ],
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const highlights = [
  {
    title: "Software Engineering Undergraduate",
    description: "Studying software engineering through a practical, project-first approach.",
  },
  {
    title: "Full-Stack Development Focus",
    description: "Building React interfaces and structured ASP.NET Core APIs.",
  },
  {
    title: "Open to Internship Opportunities",
    description: "Ready to contribute, learn, and grow with a development team.",
  },
] as const;

export const projects: Project[] = [
  {
    title: "TeamFit",
    subtitle: "Smart Student Project Team Formation Platform",
    description:
      "A full-stack platform that helps university students create balanced project teams using skills, preferred roles, and availability.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "C#",
      "ASP.NET Core Web API",
      "SQL Server",
      "Entity Framework Core",
    ],
    category: "Featured Full-Stack Project",
    status: "In Progress",
    githubUrl: "https://github.com/kanishta2001/TeamFit",
  },
  {
    title: "LK_TRAVELMATE",
    subtitle: "Sri Lanka Travel Companion Mobile App",
    description:
      "A mobile application concept focused on helping travellers explore and navigate Sri Lanka.",
    technologies: ["Flutter", "Dart"],
    category: "Mobile App",
  },
  {
    title: "Student Management System",
    subtitle: "Academic Student Information Project",
    description:
      "An academic project created to organize and manage core student information.",
    technologies: ["Java"],
    category: "Academic Project",
  },
  {
    title: "Auction Management System",
    subtitle: "Web-Based Auction Management Project",
    description:
      "A learning project for managing auction-related information and user interactions on the web.",
    technologies: ["JavaScript"],
    category: "Academic Project",
    image: "/projects/auction-management-system.png",
  },
];

export const timeline = [
  {
    year: "2024",
    title: "Started Web Development Basics",
    description: "Learned HTML, CSS, JavaScript and programming fundamentals.",
  },
  {
    year: "2025",
    title: "Built Academic and Learning Projects",
    description:
      "Worked on Student Management System, Auction Management System and LK_TRAVELMATE.",
  },
  {
    year: "2026",
    title: "Full-Stack Development Path",
    description:
      "Developing skills in C#, .NET, ASP.NET Core, React, Next.js, TypeScript and SQL Server while building TeamFit.",
  },
  {
    year: "2026+",
    title: "Internship Goal",
    description:
      "Improving my full-stack skills and preparing for software engineering internship opportunities.",
  },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    description: "Interfaces that feel clear, fast, and responsive.",
    skills: [
      { name: "React", logo: "/skills/react.svg" },
      { name: "Next.js", logo: "/skills/nextjs.svg", invert: true },
      { name: "JavaScript", logo: "/skills/javascript.svg" },
      { name: "TypeScript", logo: "/skills/typescript.svg" },
      { name: "Tailwind CSS", logo: "/skills/tailwindcss.svg" },
    ],
  },
  {
    title: "Backend & Database",
    description: "Structured APIs, maintainable application logic, and reliable relational data.",
    skills: [
      { name: "C#", logo: "/skills/csharp.svg" },
      { name: ".NET", logo: "/skills/dotnetcore.svg" },
      { name: "ASP.NET Core Web API", logo: "/skills/dotnetcore.svg" },
      { name: "SQL Server", logo: "/skills/sqlserver.svg" },
      { name: "Entity Framework Core", logo: "/skills/entityframeworkcore.svg" },
    ],
  },
  {
    title: "Tools",
    description: "Daily tools that support development and delivery.",
    skills: [
      { name: "Git", logo: "/skills/git.svg" },
      { name: "GitHub", logo: "/skills/github.svg", invert: true },
      { name: "VS Code", logo: "/skills/vscode.svg" },
      { name: "Swagger", logo: "/skills/swagger.svg" },
    ],
  },
] as const;
