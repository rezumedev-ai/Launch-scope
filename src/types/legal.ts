export interface LegalPageProps {
  onBack?: () => void;
}

export interface LegalSection {
  title: string;
  content: string;
}

export const LEGAL_INFO = {
  companyName: 'LaunchScope',
  companyLegalName: 'LaunchScope',
  companyLocation: 'Markham, Ontario, Canada',
  contactEmail: 'launchscopeapp@gmail.com',
  lastUpdated: 'October 9, 2025',
};
