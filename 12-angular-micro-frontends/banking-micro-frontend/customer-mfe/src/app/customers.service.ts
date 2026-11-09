import { Injectable, computed, signal } from '@angular/core';
import { Customer, CustomerSegment, RelationshipStatus } from './customer.models';

const seedCustomers: Customer[] = [
  {
    id: 'CUS-7001', name: 'Ananya Rao', segment: 'Wealth', status: 'Active',
    email: 'ananya.rao@example.test', phone: '+91 90000 10001', city: 'Hyderabad',
    relationshipManager: 'Meera Shah', joinedOn: '2018-04-12', kycReviewDue: '2027-04-12',
    linkedAccounts: ['**** 4821', '**** 2109'], relationshipValue: 4850000,
    interactions: [
      { id: 'SI-101', date: '2026-11-08T11:30:00', channel: 'Relationship Manager', subject: 'Annual portfolio review', outcome: 'Review completed; follow-up requested.' },
      { id: 'SI-102', date: '2026-10-19T14:00:00', channel: 'Digital', subject: 'Statement download support', outcome: 'Guidance shared with customer.' }
    ]
  },
  {
    id: 'CUS-7002', name: 'Vikram Mehta', segment: 'Business', status: 'Review Required',
    email: 'vikram.mehta@example.test', phone: '+91 90000 10002', city: 'Mumbai',
    relationshipManager: 'Arjun Rao', joinedOn: '2016-09-03', kycReviewDue: '2026-11-15',
    linkedAccounts: ['**** 1936', '**** 7780', '**** 1012'], relationshipValue: 12500000,
    interactions: [
      { id: 'SI-103', date: '2026-11-09T09:15:00', channel: 'Branch', subject: 'Business profile refresh', outcome: 'Updated documents requested.' }
    ]
  },
  {
    id: 'CUS-7003', name: 'Meera Iyer', segment: 'Retail', status: 'Active',
    email: 'meera.iyer@example.test', phone: '+91 90000 10003', city: 'Chennai',
    relationshipManager: 'Priya Nair', joinedOn: '2021-01-20', kycReviewDue: '2027-01-20',
    linkedAccounts: ['**** 7504'], relationshipValue: 1000000,
    interactions: [
      { id: 'SI-104', date: '2026-11-05T16:10:00', channel: 'Contact Centre', subject: 'Fixed deposit maturity query', outcome: 'Maturity options explained.' }
    ]
  },
  {
    id: 'CUS-7004', name: 'Rahul Verma', segment: 'Retail', status: 'Restricted',
    email: 'rahul.verma@example.test', phone: '+91 90000 10004', city: 'Pune',
    relationshipManager: 'Karthik Reddy', joinedOn: '2017-06-18', kycReviewDue: '2026-10-01',
    linkedAccounts: ['**** 6629'], relationshipValue: 78500,
    interactions: [
      { id: 'SI-105', date: '2026-10-02T10:00:00', channel: 'Branch', subject: 'KYC review follow-up', outcome: 'Escalated to compliance review queue.' }
    ]
  },
  {
    id: 'CUS-7005', name: 'Sana Khan', segment: 'Wealth', status: 'Active',
    email: 'sana.khan@example.test', phone: '+91 90000 10005', city: 'Bengaluru',
    relationshipManager: 'Meera Shah', joinedOn: '2022-02-11', kycReviewDue: '2027-02-11',
    linkedAccounts: ['**** 8102', '**** 8103'], relationshipValue: 3250000,
    interactions: [
      { id: 'SI-106', date: '2026-11-06T12:30:00', channel: 'Relationship Manager', subject: 'Investment product enquiry', outcome: 'Information pack shared.' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class CustomersService {
  readonly customers = signal<Customer[]>(seedCustomers);
  readonly totalCustomers = computed(() => this.customers().length);
  readonly activeCustomers = computed(() => this.customers().filter((c) => c.status === 'Active').length);
  readonly reviewRequired = computed(() => this.customers().filter((c) => c.status === 'Review Required').length);
  readonly totalRelationshipValue = computed(() => this.customers().reduce((sum, c) => sum + c.relationshipValue, 0));

  getById(id: string): Customer | undefined {
    return this.customers().find((customer) => customer.id === id);
  }

  search(query: string, segment: string, status: string): Customer[] {
    const term = query.trim().toLowerCase();
    return this.customers().filter((customer) => {
      const matchesText = [customer.id, customer.name, customer.email, customer.city].join(' ').toLowerCase().includes(term);
      return matchesText && (segment === 'All' || customer.segment === segment)
        && (status === 'All' || customer.status === status);
    });
  }

  readonly segments: CustomerSegment[] = ['Retail', 'Business', 'Wealth'];
  readonly statuses: RelationshipStatus[] = ['Active', 'Review Required', 'Restricted'];
}
