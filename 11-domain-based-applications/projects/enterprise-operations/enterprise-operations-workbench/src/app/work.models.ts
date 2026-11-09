export type WorkType = 'Incident' | 'Service Request';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type WorkStatus = 'New' | 'In Progress' | 'Pending' | 'Resolved';

export interface ActivityEntry {
  id: string;
  at: string;
  actor: string;
  message: string;
}

export interface WorkItem {
  id: string;
  title: string;
  type: WorkType;
  priority: Priority;
  status: WorkStatus;
  requester: string;
  department: string;
  assignee: string;
  createdAt: string;
  dueAt: string;
  description: string;
  activity: ActivityEntry[];
}
