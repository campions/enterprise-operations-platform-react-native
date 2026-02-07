export interface ConfigToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const configToggles: ConfigToggle[] = [
  {
    id: 'auto-approvals',
    label: 'Auto-approve low-risk workflows',
    description: 'Skips manual review for repetitive automation steps.',
    enabled: true
  },
  {
    id: 'alert-digests',
    label: 'Send alert digests hourly',
    description: 'Aggregated summary of incidents delivered to Slack.',
    enabled: false
  },
  {
    id: 'asset-audits',
    label: 'Weekly asset audit reminders',
    description: 'Creates Jira tickets for assets missing owners.',
    enabled: true
  }
];
