export type CustomerSegment = 'Retail' | 'Business' | 'Wealth';
export type RelationshipStatus = 'Active' | 'Review Required' | 'Restricted';

export interface ServiceInteraction {
  id: string;
  date: string;
  channel: 'Branch' | 'Contact Centre' | 'Digital' | 'Relationship Manager';
  subject: string;
  outcome: string;
}

export interface Customer {
  id: string;
  name: string;
  segment: CustomerSegment;
  status: RelationshipStatus;
  email: string;
  phone: string;
  city: string;
  relationshipManager: string;
  joinedOn: string;
  kycReviewDue: string;
  linkedAccounts: string[];
  relationshipValue: number;
  interactions: ServiceInteraction[];
}
