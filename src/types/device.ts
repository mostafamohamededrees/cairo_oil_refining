export interface DeviceStep {
  id: number;
  title: string;
  titleEn?: string;
  iconType: string;
}

export interface DeviceFormData {
  title: string;
  subtitle: string;
  description: string;
  methodCode: string;
  versionNumber: string;
  issueDate: string;
  lastReview: string;
  approvedBy: string;
  standard: string;
  detectionLimit: string;
  range: string;
  repeatability: string;
  enrichmentFactor: string;
  sampleVolume: string;
  measurementTime: string;
  purpose: string;
  scope?: string | null;
  principleOfOperation?: string | null;
  approvedStandards?: string[];
  extractionSolvent?: string | null;
  sampleCleanUp?: string | null;
  displaySystem?: string | null;
  interfaces?: string | null;
  software?: string | null;
  internalMemory?: string | null;
  alarmTrackingSystem?: string | null;
  powerRequirements?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  autosampler?: string | null;
  applications: string[];
  advantages: string[];
  warnings: string[];
  steps: DeviceStep[];
  videoUrl?: string | null;
  audioUrl?: string | null;
  imageUrl?: string | null;
}

export interface Device extends DeviceFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceSummary {
  id: string;
  title: string;
  subtitle: string;
  methodCode: string;
  lastReview: string;
  standard: string;
  createdAt: Date;
}
