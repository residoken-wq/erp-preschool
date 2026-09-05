export type JourneyAction =
  | 'lead.assign' | 'lead.contact' | 'lead.qualify' | 'lead.application'
  | 'application.submit' | 'application.review' | 'application.verify'
  | 'application.assessment-pending' | 'application.assess' | 'application.decision'
  | 'offer.create' | 'offer.submit' | 'offer.approve' | 'offer.issue' | 'offer.accept'
  | 'enrollment.create' | 'enrollment.finance'
  | 'handover.ready' | 'handover.submit' | 'handover.accept';

const leadTransitions: Partial<Record<string, readonly [JourneyAction, string]>> = {
  NEW: ['lead.assign', '1. Phân công'],
  ASSIGNED: ['lead.contact', '2. Đã liên hệ'],
  CONTACTED: ['lead.qualify', '3. Đủ điều kiện'],
  QUALIFIED: ['lead.application', '4. Khởi tạo Application']
};

const applicationTransitions: Partial<Record<string, readonly [JourneyAction, string]>> = {
  DRAFT: ['application.submit', 'Nộp hồ sơ'],
  SUBMITTED: ['application.review', 'Bắt đầu review tài liệu'],
  DOCUMENT_REVIEW: ['application.verify', 'Xác minh hồ sơ'],
  INCOMPLETE: ['application.review', 'Đã bổ sung tài liệu'],
  VERIFIED: ['application.assessment-pending', 'Lên lịch assessment'],
  ASSESSMENT_PENDING: ['application.assess', 'Hoàn tất assessment'],
  ASSESSED: ['application.decision', 'Chuyển chờ quyết định']
};

export function leadActionForStatus(status: string): readonly [JourneyAction, string] | undefined {
  return leadTransitions[status];
}

export function applicationActionForStatus(status: string): readonly [JourneyAction, string] | undefined {
  return applicationTransitions[status];
}
