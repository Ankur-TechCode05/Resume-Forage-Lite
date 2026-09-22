export const SKILLS_DATABASE: string[] = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift',
  'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Dart', 'Lua', 'Objective-C', 'Elixir', 'Clojure', 'Haskell',
  'Shell', 'Bash', 'PowerShell', 'SQL', 'PL/SQL', 'VBA', 'Groovy',

  // Frontend
  'React', 'React Native', 'Vue', 'Vue.js', 'Angular', 'Next.js', 'Nuxt', 'Svelte', 'SvelteKit',
  'Redux', 'MobX', 'Zustand', 'jQuery', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Sass', 'SCSS', 'Less',
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Ant Design', 'Styled Components',
  'Ember.js', 'Backbone.js', 'Three.js', 'D3.js', 'Chart.js', 'Storybook', 'Webpack', 'Vite',
  'Parcel', 'Rollup', 'Babel', 'ESLint', 'Prettier', 'Figma', 'Adobe XD', 'Sketch',

  // Backend
  'Node.js', 'Express', 'NestJS', 'Koa', 'Fastify', 'Deno', 'Django', 'Flask', 'FastAPI',
  'Spring', 'Spring Boot', 'ASP.NET', 'ASP.NET Core', 'Laravel', 'Symfony', 'CodeIgniter',
  'Ruby on Rails', 'Gin', 'Echo', 'Fiber', 'GraphQL', 'Apollo', 'gRPC', 'REST API', 'RESTful API',
  'WebSockets', 'Socket.io', 'Microservices', 'Serverless', 'AWS Lambda', 'tRPC',

  // Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'DynamoDB', 'Firebase', 'Firestore',
  'Supabase', 'Elasticsearch', 'Cassandra', 'CouchDB', 'Neo4j', 'MariaDB', 'Oracle SQL',
  'Microsoft SQL Server', 'Prisma', 'Sequelize', 'TypeORM', 'Mongoose', 'Knex', 'Drizzle',

  // Cloud & DevOps
  'AWS', 'Google Cloud', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Ansible',
  'Jenkins', 'CI/CD', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Vercel', 'Netlify',
  'Heroku', 'DigitalOcean', 'Cloudflare', 'Helm', 'Prometheus', 'Grafana', 'Datadog',
  'Nginx', 'Apache', 'Linux', 'Unix', 'Bash Scripting',

  // Tools & Practices
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Agile', 'Scrum', 'Kanban',
  'TDD', 'Unit Testing', 'Jest', 'Vitest', 'Mocha', 'Chai', 'Cypress', 'Playwright',
  'Selenium', 'Puppeteer', 'Postman', 'Insomnia', 'Swagger', 'OpenAPI',

  // Data & AI
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras', 'scikit-learn',
  'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Jupyter', 'NLP',
  'Computer Vision', 'OpenCV', 'Hugging Face', 'LangChain', 'OpenAI', 'LLM',
  'Data Analysis', 'Data Visualization', 'Big Data', 'Hadoop', 'Spark', 'Kafka',
  'Airflow', 'dbt', 'Snowflake', 'ETL', 'Data Warehousing', 'Power BI', 'Tableau',

  // Mobile
  'iOS', 'Android', 'Flutter', 'React Native', 'Xamarin', 'Ionic', 'Expo',

  // Security
  'Cybersecurity', 'Penetration Testing', 'OWASP', 'OAuth', 'JWT', 'SAML', 'SSO',
  'Encryption', 'PKI', 'SSL/TLS', 'Security Auditing', 'NIST', 'ISO 27001',

  // Soft / Other
  'Project Management', 'Leadership', 'Communication', 'Teamwork', 'Problem Solving',
  'Critical Thinking', 'Time Management', 'Mentoring', 'Technical Writing',
  'Customer Service', 'Sales', 'Marketing', 'SEO', 'Product Management',
];

export function normalizeSkill(skill: string): string {
  return skill.toLowerCase().trim();
}

export function findMatchingSkills(text: string): string[] {
  const lowerText = text.toLowerCase();
  const found = new Set<string>();

  for (const skill of SKILLS_DATABASE) {
    const normalized = normalizeSkill(skill);
    const regex = new RegExp(`\\b${escapedRegex(normalized)}\\b`, 'i');
    if (regex.test(lowerText)) {
      found.add(skill);
    }
  }

  return Array.from(found);
}

function escapedRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractKeywordsFromJobDescription(jd: string): string[] {
  const lowerJD = jd.toLowerCase();
  const found = new Set<string>();

  for (const skill of SKILLS_DATABASE) {
    const normalized = normalizeSkill(skill);
    const regex = new RegExp(`\\b${escapedRegex(normalized)}\\b`, 'i');
    if (regex.test(lowerJD)) {
      found.add(skill);
    }
  }

  return Array.from(found);
}
