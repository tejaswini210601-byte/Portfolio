/**
 * ALL of the website's text lives in this one file.
 * Every line comes from Tejaswini's résumé (public/Tejaswini_S_Resume.pdf).
 * To update the site, edit this file only — the components just read from it.
 */

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Prefixes a /public file path so it also works on GitHub Pages (served from /<repo>). */
export const asset = (p: string) => `${BP}${p}`;

export const PROFILE = {
  name: "Tejaswini S",
  firstName: "Tejaswini",
  initials: "TS",
  role: "Mathematics Educator | Coding & Robotics Instructor | STEM Curriculum Developer",
  heroRole: ["Coding & Robotics", "Instructor."],
  shortRole: "STEM Educator",
  email: "Tejaswini210601@gmail.com",
  phone: "+358 41 580 0803",
  phoneHref: "tel:+358415800803",
  location: "Joensuu, Finland",
  resumeSummary:
    "Results-driven Mathematics and STEM Educator with 6+ years of teaching and training experience, having trained 500+ students across schools, online platforms, NGOs and community workshops. Experienced in teaching school-level mathematics, coding, robotics and computer science to children aged 5–17.",
  extraLine:
    "Strong background in curriculum development, personalised instruction, project-based learning and interactive teaching methodologies.",
  quote: "Building logical reasoning, mathematical thinking and independent problem-solving — one student at a time.",
  resume: asset("/Tejaswini_S_Resume.pdf"),
  github: "https://github.com/tejaswini210601-byte",
  linkedin: "", // not in résumé — add your link here and the buttons appear automatically
  languages: ["English", "Hindi", "Kannada", "Finnish (Beginner)"],
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export type Family = "Coding" | "Robotics" | "Mathematics" | "Teaching" | "EdTech" | "AI" | "Tools";

export type Skill = { name: string; symbol: string; family: Family; logo?: string; concept?: string };

/** Each entry becomes one tile in the "periodic table". logo = file in /public/logos, concept = custom line icon. */
export const SKILLS: Skill[] = [
  // Coding
  { name: "Python", symbol: "Py", family: "Coding", logo: "python" },
  { name: "Java", symbol: "Ja", family: "Coding", logo: "java" },
  { name: "Scratch", symbol: "Sc", family: "Coding", logo: "scratch" },
  { name: "Pygame", symbol: "Pg", family: "Coding", concept: "game" },
  { name: "HTML", symbol: "Ht", family: "Coding", logo: "html5" },
  { name: "MIT App Inventor", symbol: "Ai", family: "Coding", concept: "app" },
  { name: "Block-based coding", symbol: "Bl", family: "Coding", concept: "blocks" },
  { name: "PictoBlox", symbol: "Pb", family: "Coding", concept: "blocks" },
  // Robotics
  { name: "Arduino", symbol: "Ar", family: "Robotics", logo: "arduino" },
  { name: "LEGO EV3", symbol: "Ev", family: "Robotics", concept: "robot" },
  { name: "SPIKE Prime", symbol: "Sp", family: "Robotics", concept: "robot" },
  { name: "Makerzoid", symbol: "Mz", family: "Robotics", concept: "gear" },
  { name: "Electronics", symbol: "El", family: "Robotics", concept: "chip" },
  { name: "Sensors", symbol: "Se", family: "Robotics", concept: "sensor" },
  // Mathematics
  { name: "Algebra", symbol: "Al", family: "Mathematics", concept: "algebra" },
  { name: "Geometry", symbol: "Ge", family: "Mathematics", concept: "geometry" },
  { name: "Number theory", symbol: "Nt", family: "Mathematics", concept: "number" },
  { name: "Mensuration", symbol: "Me", family: "Mathematics", concept: "ruler" },
  { name: "Logical reasoning", symbol: "Lr", family: "Mathematics", concept: "logic" },
  { name: "Olympiad preparation", symbol: "Ol", family: "Mathematics", concept: "medal" },
  { name: "Mathematical puzzles", symbol: "Pz", family: "Mathematics", concept: "puzzle" },
  { name: "Pattern recognition", symbol: "Pr", family: "Mathematics", concept: "pattern" },
  // Teaching
  { name: "Curriculum development", symbol: "Cd", family: "Teaching", concept: "book" },
  { name: "Lesson planning", symbol: "Lp", family: "Teaching", concept: "plan" },
  { name: "Project-based learning", symbol: "Pj", family: "Teaching", concept: "build" },
  { name: "Online instruction", symbol: "On", family: "Teaching", concept: "screen" },
  { name: "Student assessment", symbol: "As", family: "Teaching", concept: "check" },
  { name: "Personalised mentoring", symbol: "Pm", family: "Teaching", concept: "person" },
  { name: "Classroom management", symbol: "Cm", family: "Teaching", concept: "people" },
  { name: "Parent communication", symbol: "Pc", family: "Teaching", concept: "chat" },
  // EdTech
  { name: "Google Classroom", symbol: "Gc", family: "EdTech", logo: "googleclassroom" },
  { name: "Moodle", symbol: "Mo", family: "EdTech", logo: "moodle" },
  { name: "Code.org", symbol: "Co", family: "EdTech", concept: "code" },
  { name: "Tynker", symbol: "Ty", family: "EdTech", concept: "blocks" },
  { name: "Kahoot!", symbol: "Ka", family: "EdTech", logo: "kahoot" },
  { name: "Quizizz", symbol: "Qz", family: "EdTech", concept: "check" },
  { name: "H5P", symbol: "H5", family: "EdTech", concept: "code" },
  { name: "Genially", symbol: "Gn", family: "EdTech", concept: "spark" },
  // AI
  { name: "AI literacy", symbol: "Li", family: "AI", concept: "spark" },
  { name: "ChatGPT", symbol: "Gp", family: "AI", logo: "openai" },
  { name: "Claude", symbol: "Cl", family: "AI", logo: "claude" },
  { name: "Google Gemini", symbol: "Gm", family: "AI", logo: "googlegemini" },
  // Tools
  { name: "Visual Studio Code", symbol: "Vs", family: "Tools", logo: "vscode" },
  { name: "Git", symbol: "Gt", family: "Tools", logo: "git" },
  { name: "GitHub", symbol: "Gh", family: "Tools", logo: "github" },
  { name: "Canva", symbol: "Cv", family: "Tools", logo: "canva" },
  { name: "Zoom", symbol: "Zm", family: "Tools", logo: "zoom" },
  { name: "Google Meet", symbol: "Mt", family: "Tools", logo: "googlemeet" },
];

export const FAMILIES: Family[] = ["Coding", "Robotics", "Mathematics", "Teaching", "EdTech", "AI", "Tools"];

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[]; // skill names (must match SKILLS) used for the tiny logos
  ui: "olympiad" | "module" | "line" | "obstacle" | "home" | "scratch" | "app";
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "line-robot",
    index: "01",
    title: "Line-Following Robot",
    kicker: "Robotics",
    description: "Built an autonomous robot using Arduino Uno, IR sensors and a motor driver module.",
    features: ["Autonomous navigation", "Arduino Uno", "IR sensors", "Motor driver module"],
    tech: ["Arduino", "Electronics", "Sensors"],
    ui: "line",
  },
  {
    id: "obstacle-robot",
    index: "02",
    title: "Obstacle-Avoidance Robot",
    kicker: "Robotics",
    description: "Developed a robotics project using an ultrasonic HC-SR04 sensor and servo motor.",
    features: ["Ultrasonic HC-SR04 sensor", "Servo motor", "Obstacle detection", "Arduino-based"],
    tech: ["Arduino", "Sensors", "Electronics"],
    ui: "obstacle",
  },
  {
    id: "smart-home",
    index: "03",
    title: "Smart Home Automation",
    kicker: "IoT · Arduino",
    description: "Developed an Arduino-based automation system to control lights, fans and buzzers.",
    features: ["Light control", "Fan control", "Buzzer alerts", "Arduino-based system"],
    tech: ["Arduino", "Electronics"],
    ui: "home",
  },
  {
    id: "scratch-games",
    index: "04",
    title: "Scratch Game Development",
    kicker: "Coding for kids",
    description: "Introduced students to programming logic, loops, conditions, events and debugging.",
    features: ["Programming logic", "Loops & conditions", "Events", "Debugging"],
    tech: ["Scratch", "Block-based coding"],
    ui: "scratch",
  },
  {
    id: "app-inventor",
    index: "05",
    title: "MIT App Inventor Projects",
    kicker: "Mobile apps",
    description: "Introduced students to event-driven programming, user interfaces and application logic.",
    features: ["Event-driven programming", "User interfaces", "Application logic", "Mobile apps"],
    tech: ["MIT App Inventor", "Block-based coding"],
    ui: "app",
  },
  {
    id: "olympiad",
    index: "06",
    title: "Mathematics Olympiad Problem-Solving Collection",
    kicker: "Mathematics",
    description:
      "Developed structured mathematical challenges covering number theory, algebra, geometry, numerical patterns and logical reasoning.",
    features: ["Number theory", "Algebra", "Geometry", "Numerical patterns", "Logical reasoning"],
    tech: ["Number theory", "Algebra", "Geometry", "Logical reasoning"],
    ui: "olympiad",
  },
  {
    id: "math-module",
    index: "07",
    title: "Interactive Mathematics Learning Module",
    kicker: "Mathematics",
    description: "Created concept-based exercises, visual explanations and practice questions for school students.",
    features: ["Concept-based exercises", "Visual explanations", "Practice questions", "For school students"],
    tech: ["Algebra", "Geometry", "Lesson planning"],
    ui: "module",
  },
];

export type Stop = {
  year: string;
  sort: number;
  kind: "work" | "education";
  title: string;
  place: string;
  detail: string;
};

/** Education + experience on one timeline, sorted oldest → newest. */
export const TIMELINE: Stop[] = [
  {
    year: "10th Std",
    sort: 2016,
    kind: "education",
    title: "10th Standard — 95%",
    place: "Basaveshwara English High School · Karnataka State Board",
    detail: "Scored 95% in the Karnataka State Board examination.",
  },
  {
    year: "2017 – 2019",
    sort: 2017,
    kind: "education",
    title: "Pre-University Course (PCMB)",
    place: "RNS First Grade College",
    detail: "Physics, Chemistry, Mathematics and Biology.",
  },
  {
    year: "2019 – 2022",
    sort: 2019,
    kind: "education",
    title: "Bachelor of Computer Applications (BCA)",
    place: "RNS First Grade College",
    detail: "Undergraduate degree in Computer Applications.",
  },
  {
    year: "2019 – 2023",
    sort: 2019.5,
    kind: "work",
    title: "Independent Robotics & Computer Trainer",
    place: "Freelance",
    detail:
      "Delivered coding and robotics workshops across schools, NGOs and summer camps. Taught Scratch, Python, Arduino and HTML through project-based learning.",
  },
  {
    year: "May 2023 – May 2024",
    sort: 2023.4,
    kind: "work",
    title: "IT Teacher",
    place: "Narayana e-Techno School",
    detail:
      "Taught CBSE Computer Science to Grades 5–10, including Python, Scratch and digital literacy. Introduced Arduino, electronics and sensor-based projects. Organised coding competitions and provided personalised student support.",
  },
  {
    year: "Sep 2024 – Sep 2025",
    sort: 2024.7,
    kind: "work",
    title: "Coding & Robotics Trainer",
    place: "BrightCHAMPS",
    detail:
      "Delivered 100+ live online sessions to US-based students. Taught Python, Scratch, robotics and MIT App Inventor. Monitored student progress and communicated learning updates to parents.",
  },
  {
    year: "Sep 2025 – Present",
    sort: 2025.7,
    kind: "work",
    title: "Curriculum Developer & Coding/Robotics Trainer",
    place: "GeniuSus",
    detail:
      "Design STEM curriculum and deliver coding and robotics programmes reaching 500+ students. Teach Python, Scratch, Pygame, HTML and MIT App Inventor. Conduct hands-on robotics projects using Arduino, LEGO EV3, SPIKE Prime and Makerzoid.",
  },
  {
    year: "2026 – Present",
    sort: 2026,
    kind: "education",
    title: "MSc in Information Technology",
    place: "University of Eastern Finland, Finland",
    detail: "Currently pursuing a master's degree in Information Technology.",
  },
];

export const CERTIFICATIONS = [
  { title: "STEM.org Authenticated Educator Badge", issuer: "STEM.org", status: "In progress" },
  {
    title: "Learning Experience Design: Orientation to the Profession",
    issuer: "University of Michigan · Coursera",
    status: "In progress (41%)",
  },
];

export type Achievement = {
  value: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  icon: "students" | "screen" | "calendar" | "grade" | "age" | "medal";
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    value: 500,
    suffix: "+",
    label: "Students trained",
    caption: "Across schools, online platforms, NGOs and community workshops",
    detail: "Coding, robotics and mathematics",
    icon: "students",
  },
  {
    value: 100,
    suffix: "+",
    label: "Live online sessions",
    caption: "With US-based learners at BrightCHAMPS",
    detail: "International online instruction",
    icon: "screen",
  },
  {
    value: 6,
    suffix: "+",
    label: "Years teaching",
    caption: "Teaching and training experience",
    detail: "Freelance · school · online · curriculum",
    icon: "calendar",
  },
  {
    value: 17,
    suffix: "",
    label: "Ages 5 to 17",
    caption: "Children taught across the full school range",
    detail: "Maths, coding, robotics, computer science",
    icon: "age",
  },
  {
    value: 10,
    suffix: "",
    label: "Grades 5 to 10",
    caption: "CBSE Computer Science at Narayana e-Techno School",
    detail: "Python, Scratch and digital literacy",
    icon: "grade",
  },
  {
    value: 95,
    suffix: "%",
    label: "10th Standard",
    caption: "Karnataka State Board",
    detail: "Basaveshwara English High School",
    icon: "medal",
  },
];
