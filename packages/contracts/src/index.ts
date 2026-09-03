export type DataClassification = 'PUB' | 'INT' | 'CON' | 'HRI';

export type ActorContext = {
  actorId: string;
  organizationId: string;
  campusIds: readonly string[];
  permissions: readonly string[];
  correlationId: string;
};

export type ApiError = {
  code: string;
  message: string;
  correlationId: string;
  fields?: ReadonlyArray<{ field: string; code: string; message: string }>;
};

export type HealthResponse = {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  timestamp: string;
};

export type ReadinessResponse = HealthResponse & {
  database: 'ok';
};

export const leadStatuses = [
  'NEW', 'ASSIGNED', 'CONTACTED', 'QUALIFIED', 'NURTURING',
  'CONVERTED', 'DISQUALIFIED', 'LOST', 'DUPLICATE', 'ARCHIVED'
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const applicationStatuses = [
  'DRAFT', 'SUBMITTED', 'DOCUMENT_REVIEW', 'INCOMPLETE', 'VERIFIED',
  'ASSESSMENT_PENDING', 'ASSESSED', 'DECISION_PENDING', 'OFFERED',
  'WAITLISTED', 'REJECTED'
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export const sopVersionStatuses = [
  'DRAFT', 'IN_REVIEW', 'REVISION_REQUIRED', 'APPROVED',
  'SCHEDULED', 'EFFECTIVE', 'SUPERSEDED', 'ARCHIVED'
] as const;

export type SopVersionStatus = (typeof sopVersionStatuses)[number];

export type PageMeta = {
  page: number;
  pageSize: number;
  total: number;
};

export type PageResult<T> = {
  data: T[];
  meta: PageMeta;
};

export type DashboardSummary = {
  leads: { total: number; new: number; qualified: number; converted: number };
  applications: { total: number; inReview: number; incomplete: number; offered: number };
  tasks: { dueToday: number; overdue: number };
  sops: { total: number; draft: number; inReview: number; effective: number };
};

export const taskStatuses = ['OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED'] as const;
export type TaskStatus = (typeof taskStatuses)[number];

export const taskPriorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT'] as const;
export type TaskPriority = (typeof taskPriorities)[number];

export type TaskItem = {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueAt: string | null;
  relatedObjectType: string | null;
  relatedObjectId: string | null;
  rowVersion: number;
  overdue: boolean;
};

export type DomainEvent<TPayload extends object = Record<string, never>> = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  aggregateType: string;
  aggregateId: string;
  organizationId: string;
  occurredAt: string;
  correlationId: string;
  causationId?: string;
  payload: TPayload;
};
