

const skillsLayout = [
  {
    category: 'Container & Orchestration',
    color: 'bg-gray-50',
    items: ['Docker', 'Kubernetes', 'Helm', 'Docker Compose', 'Podman']
  },
  {
    category: 'Cloud Providers',
    color: 'bg-gray-100',
    items: ['AWS', 'GCP', 'Cloudflare', 'DigitalOcean']
  },
  {
    category: 'CI/CD Pipelines',
    color: 'bg-gray-50',
    items: ['GitHub Actions', 'GitLab CI', 'ArgoCD', 'Jenkins']
  },
  {
    category: 'Infrastructure as Code',
    color: 'bg-gray-100',
    items: ['Terraform', 'Ansible', 'Packer', 'CloudFormation']
  },
  {
    category: 'Observability',
    color: 'bg-gray-50',
    items: ['Prometheus', 'Grafana', 'Datadog', 'ELK Stack', 'OpenTelemetry']
  },
  {
    category: 'Languages & Scripting',
    color: 'bg-gray-100',
    items: ['Python', 'Bash / Shell', 'Go', 'JavaScript', 'HCL', 'YAML']
  },
  {
    category: 'Full Stack & Web',
    color: 'bg-white',
    items: ['Full Stack Development', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS']
  }
];

export default function SkillsApp() {
  return (
    <div className="p-4 md:p-6 bg-os-main min-h-full">
      <div className="mb-6 flex items-center justify-between border-b-3 border-os-border pb-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Stack_Mapping</h2>
        <div className="bg-os-border text-white px-2 py-1 font-mono text-xs font-bold">
          TOTAL: {skillsLayout.reduce((acc, group) => acc + group.items.length, 0)} ITEMS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsLayout.map((group) => (
          <div key={group.category} className={`border-3 border-os-border shadow-brutal-sm p-4 ${group.color}`}>
            <h3 className="font-bold uppercase tracking-tight border-b-2 border-os-border pb-2 mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span 
                  key={skill}
                  className="bg-white font-mono text-xs px-2 py-1 border-2 border-os-border font-bold hover:-translate-y-0.5 hover:shadow-brutal-sm transition-transform cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
