export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  honor?: string;
  headline: string;
  description: string;
  tags: string[];
  details: { label: string; value: string }[];
  features: string[];
  stats: { label: string; value: string }[];
  architectureDiagram?: string;
}

export interface CapabilityDemo {
  id: string;
  title: string;
  tag: string;
  description: string;
  badge: string;
}

export interface ProcessBeat {
  beatNumber: string;
  title: string;
  kicker: string;
  description: string;
  quote: string;
  deliverables: string[];
}
