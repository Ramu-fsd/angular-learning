import { Injectable, computed, signal } from '@angular/core';
import { ActivityEntry, Priority, WorkItem, WorkStatus, WorkType } from './work.models';

const initialItems: WorkItem[] = [
  {
    id: 'OPS-24018', title: 'Payment reconciliation batch delayed', type: 'Incident',
    priority: 'Critical', status: 'In Progress', requester: 'Finance Operations',
    department: 'Finance', assignee: 'Priya Nair', createdAt: '2026-11-09T08:15:00',
    dueAt: '2026-11-09T18:00:00',
    description: 'The morning reconciliation batch has not completed. Operations must validate upstream settlement files and restart the controlled workflow after approval.',
    activity: [
      { id: 'a1', at: '2026-11-09T08:15:00', actor: 'System', message: 'Incident created from monitoring alert.' },
      { id: 'a2', at: '2026-11-09T08:42:00', actor: 'Priya Nair', message: 'Initial triage started; checking settlement file arrival.' }
    ]
  },
  {
    id: 'OPS-24017', title: 'New employee access provisioning', type: 'Service Request',
    priority: 'Medium', status: 'New', requester: 'People Operations',
    department: 'HR', assignee: 'Unassigned', createdAt: '2026-11-09T09:10:00',
    dueAt: '2026-11-11T17:00:00',
    description: 'Provision standard business applications and role-based access for a new joiner.',
    activity: [{ id: 'a3', at: '2026-11-09T09:10:00', actor: 'System', message: 'Service request submitted.' }]
  },
  {
    id: 'OPS-24016', title: 'Customer reporting portal intermittent errors', type: 'Incident',
    priority: 'High', status: 'Pending', requester: 'Customer Support',
    department: 'Customer Experience', assignee: 'Arjun Rao', createdAt: '2026-11-08T14:25:00',
    dueAt: '2026-11-10T12:00:00',
    description: 'Users report intermittent failures when downloading monthly statements. Vendor diagnostics are awaited.',
    activity: [{ id: 'a4', at: '2026-11-08T14:25:00', actor: 'System', message: 'Incident created by service desk.' }]
  },
  {
    id: 'OPS-24015', title: 'Update branch operations contact list', type: 'Service Request',
    priority: 'Low', status: 'Resolved', requester: 'Branch Administration',
    department: 'Operations', assignee: 'Meera Shah', createdAt: '2026-11-07T10:00:00',
    dueAt: '2026-11-10T17:00:00',
    description: 'Update the internal branch escalation directory with approved contact changes.',
    activity: [{ id: 'a5', at: '2026-11-07T10:00:00', actor: 'Meera Shah', message: 'Request completed and verified.' }]
  },
  {
    id: 'OPS-24014', title: 'Warehouse handheld device connectivity', type: 'Incident',
    priority: 'High', status: 'In Progress', requester: 'Logistics Control',
    department: 'Logistics', assignee: 'Karthik Reddy', createdAt: '2026-11-08T07:40:00',
    dueAt: '2026-11-09T16:00:00',
    description: 'Several handheld devices are disconnecting from the warehouse wireless network.',
    activity: [{ id: 'a6', at: '2026-11-08T07:40:00', actor: 'System', message: 'Incident routed to infrastructure operations.' }]
  }
];

@Injectable({ providedIn: 'root' })
export class OperationsService {
  readonly items = signal<WorkItem[]>(initialItems);
  readonly openCount = computed(() => this.items().filter((item) => item.status !== 'Resolved').length);
  readonly criticalCount = computed(() => this.items().filter((item) => item.priority === 'Critical' && item.status !== 'Resolved').length);
  readonly resolvedCount = computed(() => this.items().filter((item) => item.status === 'Resolved').length);
  readonly slaRiskCount = computed(() => this.items().filter((item) => item.status !== 'Resolved' && new Date(item.dueAt).getTime() < Date.now() + 24 * 60 * 60 * 1000).length);

  getById(id: string): WorkItem | undefined {
    return this.items().find((item) => item.id === id);
  }

  create(input: { title: string; type: WorkType; priority: Priority; requester: string; department: string; description: string }): string {
    const id = 'OPS-' + (24019 + this.items().length - initialItems.length);
    const now = new Date().toISOString();
    const entry: ActivityEntry = { id: this.newId(), at: now, actor: 'You', message: 'Work item created.' };
    const item: WorkItem = {
      ...input, id, status: 'New', assignee: 'Unassigned', createdAt: now,
      dueAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      activity: [entry]
    };
    this.items.update((items) => [item, ...items]);
    return id;
  }

  update(id: string, changes: Partial<Pick<WorkItem, 'priority' | 'status' | 'assignee'>>): void {
    this.items.update((items) => items.map((item) => item.id === id ? { ...item, ...changes } : item));
  }

  addNote(id: string, message: string): void {
    const entry: ActivityEntry = { id: this.newId(), at: new Date().toISOString(), actor: 'You', message };
    this.items.update((items) => items.map((item) => item.id === id ? { ...item, activity: [entry, ...item.activity] } : item));
  }

  private newId(): string {
    return Math.random().toString(36).slice(2, 10);
  }
}
