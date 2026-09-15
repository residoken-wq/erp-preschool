'use client';

import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { TaskBoard, type TaskItem, type TaskStatus } from './task-board';
import { DemoJourney, type JourneyAction } from './demo-journey';
import { SopWorkspace } from './sop-workspace';

type Tab = 'overview' | 'leads' | 'applications' | 'sops' | 'tasks';
type Row = Record<string, unknown>;
type CampusContext = { id: string; code: string; name: string; timezone: string };
type UserContext = {
  user: { id: string; display_name: string } | null;
  campuses: CampusContext[];
  roles: Array<{ code: string; name: string }>;
  permissions: string[];
};
type DemoPersona = { id: string; label: string; actorId: string; campusIds: string[] };
type Summary = {
  leads: { total: number; new: number; qualified: number; converted: number };
  applications: { total: number; inReview: number; incomplete: number; offered: number };
  tasks: { dueToday: number; overdue: number };
  sops: { total: number; draft: number; inReview: number; effective: number };
};

const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN ?? 'http://localhost:3001';
const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'static' ? 'static' : 'live';
const organizationId = '00000000-0000-7000-8000-000000000001';
const centralCampusId = '00000000-0000-7000-8000-000000000101';
const eastCampusId = '00000000-0000-7000-8000-000000000102';
const demoPersonas: DemoPersona[] = [
  { id: 'manager', label: 'Admission Manager', actorId: '00000000-0000-7000-8000-000000001001', campusIds: [centralCampusId, eastCampusId] },
  { id: 'officer', label: 'Admission Officer', actorId: '00000000-0000-7000-8000-000000001002', campusIds: [centralCampusId] }
];

const fallbackSummary: Summary = {
  leads: { total: 128, new: 18, qualified: 37, converted: 24 },
  applications: { total: 46, inReview: 18, incomplete: 5, offered: 8 },
  tasks: { dueToday: 12, overdue: 3 },
  sops: { total: 10, draft: 2, inReview: 1, effective: 7 }
};
const emptySummary: Summary = {
  leads: { total: 0, new: 0, qualified: 0, converted: 0 },
  applications: { total: 0, inReview: 0, incomplete: 0, offered: 0 },
  tasks: { dueToday: 0, overdue: 0 },
  sops: { total: 0, draft: 0, inReview: 0, effective: 0 }
};

const fallbackLeads: Row[] = [
  { id: '1', code: 'LEAD-2026-0101', first_name: 'Lê', last_name: 'Gia Hân', source_type: 'Website', status: 'NEW', next_action_at: 'Hôm nay, 10:30' },
  { id: '2', code: 'LEAD-2026-0102', first_name: 'Nguyễn', last_name: 'Minh Khang', source_type: 'Referral', status: 'CONTACTED', next_action_at: 'Hôm nay, 14:00' },
  { id: '3', code: 'LEAD-2026-0103', first_name: 'Trần', last_name: 'Bảo An', source_type: 'Event', status: 'QUALIFIED', next_action_at: 'Ngày mai, 09:00' }
];
const fallbackApplications: Row[] = [
  { id: '1', code: 'APP-2026-0148', first_name: 'Phạm', last_name: 'Khánh Linh', program_code: 'PRESCHOOL-4', status: 'INCOMPLETE', created_at: '28/08/2026' },
  { id: '2', code: 'APP-2026-0149', first_name: 'Trần', last_name: 'Bảo An', program_code: 'PRESCHOOL-5', status: 'DOCUMENT_REVIEW', created_at: '29/08/2026' }
];
const fallbackSops: Row[] = [
  { id: '1', code: 'ADM-001', title: 'Tiếp nhận và phân loại Lead', process_code: 'ADM-001', version_label: 'v1.0', version_status: 'EFFECTIVE' },
  { id: '2', code: 'ADM-004', title: 'Tiếp nhận Application', process_code: 'ADM-004', version_label: 'v1.0', version_status: 'IN_REVIEW' },
  { id: '3', code: 'ADM-010', title: 'Operational Handover', process_code: 'ADM-010', version_label: 'v1.0', version_status: 'DRAFT' }
];
const fallbackTasks: TaskItem[] = [
  { id: '1', title: 'APP-2026-0148 thiếu tài liệu synthetic', description: null, priority: 'HIGH', dueAt: 'Quá hạn 2 giờ', status: 'OPEN', relatedObjectType: 'Application', relatedObjectId: null, rowVersion: 1, overdue: true },
  { id: '2', title: 'Review hồ sơ synthetic APP-2026-0149', description: null, priority: 'NORMAL', dueAt: 'Hạn 17:00 hôm nay', status: 'IN_PROGRESS', relatedObjectType: 'Application', relatedObjectId: null, rowVersion: 1, overdue: false },
  { id: '3', title: 'Liên hệ Lead synthetic LEAD-2026-0101', description: null, priority: 'URGENT', dueAt: 'Trong 1 giờ', status: 'OPEN', relatedObjectType: 'Lead', relatedObjectId: null, rowVersion: 1, overdue: false }
];

function actorHeaders(persona: DemoPersona, campusIds: string[]): Record<string, string> {
  return {
    'content-type': 'application/json',
    'x-actor-id': persona.actorId,
    'x-organization-id': organizationId,
    'x-campus-ids': campusIds.join(',')
  };
}

async function api<T>(path: string, headers: Record<string, string>, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiOrigin}/api/v1${path}`, { ...init, headers: { ...headers, ...init?.headers } });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: 'Không thể xử lý yêu cầu' })) as { message?: string };
    throw new Error(body.message ?? `HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function text(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value);
}
function statusClass(value: unknown): string { return text(value).toLowerCase().replaceAll(' ', '_'); }
function formatDate(value: unknown, timezone: string): string {
  if (typeof value !== 'string') return text(value);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short', timeZone: timezone }).format(date);
}

export function SopOsApp() {
  const [tab, setTab] = useState<Tab>('overview');
  const [personaId, setPersonaId] = useState('manager');
  const [campusId, setCampusId] = useState(centralCampusId);
  const [context, setContext] = useState<UserContext | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [summary, setSummary] = useState(demoMode === 'static' ? fallbackSummary : emptySummary);
  const [leads, setLeads] = useState<Row[]>(demoMode === 'static' ? fallbackLeads : []);
  const [applications, setApplications] = useState<Row[]>(demoMode === 'static' ? fallbackApplications : []);
  const [sops, setSops] = useState<Row[]>(demoMode === 'static' ? fallbackSops : []);
  const [tasks, setTasks] = useState<TaskItem[]>(demoMode === 'static' ? fallbackTasks : []);
  const [query, setQuery] = useState('');
  const [recordStatus, setRecordStatus] = useState('ALL');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [journeyBusy, setJourneyBusy] = useState(false);
  const [journeyError, setJourneyError] = useState('');
  const [sopDetail, setSopDetail] = useState<Row | null>(null);
  const [sopAudit, setSopAudit] = useState<Row[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leadModal, setLeadModal] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [taskError, setTaskError] = useState('');
  const [connectionError, setConnectionError] = useState('');
  const persona = demoPersonas.find((item) => item.id === personaId) ?? demoPersonas[0]!;
  const requestHeaders = actorHeaders(persona, [campusId]);
  const activeCampus = context?.campuses.find((campus) => campus.id === campusId);
  const timezone = activeCampus?.timezone ?? 'Asia/Ho_Chi_Minh';

  async function refresh(): Promise<void> {
    if (demoMode === 'static') {
      setConnected(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const contextData = await api<UserContext>('/context', actorHeaders(persona, persona.campusIds));
      const nextCampusId = contextData.campuses.some((campus) => campus.id === campusId)
        ? campusId
        : contextData.campuses[0]?.id;
      if (!nextCampusId) throw new Error('Persona không có campus scope hợp lệ');
      const [summaryData, leadPage, applicationPage, sopRows, taskRows] = await Promise.all([
        api<Summary>('/dashboard/summary', actorHeaders(persona, [nextCampusId])),
        api<{ data: Row[] }>('/leads?pageSize=100', actorHeaders(persona, [nextCampusId])),
        api<{ data: Row[] }>('/applications', actorHeaders(persona, [nextCampusId])),
        api<Row[]>('/sops', actorHeaders(persona, [nextCampusId])),
        api<TaskItem[]>('/tasks', actorHeaders(persona, [nextCampusId]))
      ]);
      setContext(contextData);
      if (nextCampusId !== campusId) setCampusId(nextCampusId);
      setSummary(summaryData); setLeads(leadPage.data); setApplications(applicationPage.data); setSops(sopRows); setTasks(taskRows); setConnected(true); setConnectionError('');
    } catch (caught) {
      setConnected(false);
      setConnectionError(caught instanceof Error ? caught.message : 'Không thể kết nối API local');
    } finally { setLoading(false); }
  }

  useEffect(() => {
    const hashTab = window.location.hash.replace('#/', '') as Tab;
    if (['overview', 'leads', 'applications', 'sops', 'tasks'].includes(hashTab)) setTab(hashTab);
  }, []);

  useEffect(() => { void refresh(); }, [personaId, campusId]);

  function navigate(nextTab: Tab): void {
    setTab(nextTab);
    setQuery('');
    setRecordStatus('ALL');
    setSelectedRecordId(null);
    setSopDetail(null);
    window.history.replaceState(null, '', `#/${nextTab}`);
  }

  async function selectRecord(id: string): Promise<void> {
    setSelectedRecordId(id);
    setJourneyError('');
    if (tab !== 'sops') return;
    await loadSop(id);
  }

  async function loadSop(id: string): Promise<void> {
    setJourneyBusy(true);
    try {
      const detail = await api<Row>(`/sops/${id}`, requestHeaders);
      const versions = Array.isArray(detail.versions) ? detail.versions as Row[] : [];
      const versionId = text(versions[0]?.id);
      const audit = versionId === '—' ? [] : await api<Row[]>(`/audit-events?objectType=SOPVersion&objectId=${encodeURIComponent(versionId)}`, requestHeaders);
      setSopDetail(detail);
      setSopAudit(audit);
    } catch (caught) {
      setJourneyError(caught instanceof Error ? caught.message : 'Không thể mở SOP');
    } finally { setJourneyBusy(false); }
  }

  function openRelatedSop(code: string): void {
    const sop = sops.find((item) => text(item.code) === code);
    setTab('sops');
    setQuery(code);
    setRecordStatus('ALL');
    window.history.replaceState(null, '', '#/sops');
    if (!sop) return;
    const id = text(sop.id);
    setSelectedRecordId(id);
    void loadSop(id);
  }

  async function runSopTransition(status: string): Promise<void> {
    const versions = Array.isArray(sopDetail?.versions) ? sopDetail.versions as Row[] : [];
    const versionId = text(versions[0]?.id);
    if (versionId === '—' || !selectedRecordId) return;
    setJourneyBusy(true); setJourneyError('');
    try {
      await api(`/sops/versions/${versionId}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: status }) });
      await refresh();
      await selectRecord(selectedRecordId);
    } catch (caught) { setJourneyError(caught instanceof Error ? caught.message : 'Không thể chuyển trạng thái SOP'); }
    finally { setJourneyBusy(false); }
  }

  async function addSopComment(body: string): Promise<void> {
    const versions = Array.isArray(sopDetail?.versions) ? sopDetail.versions as Row[] : [];
    const versionId = text(versions[0]?.id);
    if (versionId === '—' || !selectedRecordId) return;
    setJourneyError('');
    try {
      await api(`/sops/versions/${versionId}/comments`, requestHeaders, { method: 'POST', body: JSON.stringify({ body }) });
      await selectRecord(selectedRecordId);
    } catch (caught) {
      setJourneyError(caught instanceof Error ? caught.message : 'Không thể thêm nhận xét SOP');
    }
  }

  async function runJourneyAction(action: JourneyAction, row: Row): Promise<void> {
    setJourneyBusy(true);
    setJourneyError('');
    const id = text(row.id);
    const offerId = text(row.offer_id);
    const enrollmentId = text(row.enrollment_id);
    const applicationTransitions: Partial<Record<JourneyAction, string>> = {
      'application.submit': 'SUBMITTED', 'application.review': 'DOCUMENT_REVIEW',
      'application.verify': 'VERIFIED', 'application.assessment-pending': 'ASSESSMENT_PENDING',
      'application.assess': 'ASSESSED', 'application.decision': 'DECISION_PENDING'
    };
    try {
      if (action === 'lead.assign') await api(`/leads/${id}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'ASSIGNED', ownerUserId: persona.actorId, nextActionAt: new Date(Date.now() + 86_400_000).toISOString() }) });
      else if (action === 'lead.contact') await api(`/leads/${id}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'CONTACTED' }) });
      else if (action === 'lead.qualify') await api(`/leads/${id}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'QUALIFIED' }) });
      else if (action === 'lead.application') await api(`/leads/${id}/applications`, requestHeaders, { method: 'POST', body: JSON.stringify({ code: `APP-DEMO-${Date.now()}`, programCode: 'PRESCHOOL-DEMO', intakeCode: 'DEMO-2026' }) });
      else if (applicationTransitions[action]) await api(`/applications/${id}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: applicationTransitions[action] }) });
      else if (action === 'offer.create') await api(`/applications/${id}/offers`, requestHeaders, { method: 'POST', body: JSON.stringify({ code: `OFF-${text(row.code)}`, validUntil: new Date(Date.now() + 7 * 86_400_000).toISOString(), terms: { mode: 'SIMULATED_LOCAL_DEMO' } }) });
      else if (action === 'offer.submit') await api(`/applications/offers/${offerId}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'PENDING_APPROVAL' }) });
      else if (action === 'offer.approve') await api(`/applications/offers/${offerId}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'APPROVED' }) });
      else if (action === 'offer.issue') await api(`/applications/offers/${offerId}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'ISSUED' }) });
      else if (action === 'offer.accept') await api(`/applications/offers/${offerId}/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'ACCEPTED' }) });
      else if (action === 'enrollment.create') await api(`/applications/offers/${offerId}/enrollment`, requestHeaders, { method: 'POST', body: JSON.stringify({ code: `ENR-${text(row.code)}` }) });
      else if (action === 'enrollment.finance') await api(`/applications/enrollments/${enrollmentId}/finance-setup`, requestHeaders, { method: 'POST', body: JSON.stringify({ contractCode: `CTR-${text(row.code)}`, feePlanCode: `FEE-${text(row.code)}`, totalAmount: 0, currency: 'VND' }) });
      else if (action === 'handover.ready') await api(`/applications/enrollments/${enrollmentId}/handover/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'READY', checklist: [{ key: 'identity', label: 'Hồ sơ synthetic', complete: true }, { key: 'consent', label: 'Consent simulated', complete: true }, { key: 'health', label: 'Health metadata synthetic', complete: true }] }) });
      else if (action === 'handover.submit') await api(`/applications/enrollments/${enrollmentId}/handover/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'SUBMITTED' }) });
      else if (action === 'handover.accept') await api(`/applications/enrollments/${enrollmentId}/handover/transitions`, requestHeaders, { method: 'POST', body: JSON.stringify({ to: 'ACCEPTED' }) });
      await refresh();
    } catch (caught) {
      setJourneyError(caught instanceof Error ? caught.message : 'Không thể thực hiện bước demo');
    } finally {
      setJourneyBusy(false);
    }
  }

  async function updateTask(task: TaskItem, status: TaskStatus): Promise<void> {
    if (!connected) {
      setTaskError('Hãy khởi động API/PostgreSQL để cập nhật công việc.');
      return;
    }
    setTaskError('');
    setUpdatingTaskId(task.id);
    try {
      const updated = await api<TaskItem>(`/tasks/${task.id}`, requestHeaders, {
        method: 'PATCH',
        body: JSON.stringify({ status, rowVersion: task.rowVersion })
      });
      setTasks((current) => current.map((item) => item.id === updated.id ? updated : item));
      setSummary(await api<Summary>('/dashboard/summary', requestHeaders));
    } catch (caught) {
      setTaskError(caught instanceof Error ? caught.message : 'Không thể cập nhật công việc');
      try { setTasks(await api<TaskItem[]>('/tasks', requestHeaders)); } catch { /* Keep the last safe UI state. */ }
    } finally {
      setUpdatingTaskId(null);
    }
  }

  const navigation: Array<{ id: Tab; label: string; icon: string }> = [
    { id: 'overview', label: 'Tổng quan', icon: '⌂' }, { id: 'leads', label: 'Lead', icon: '◎' },
    { id: 'applications', label: 'Hồ sơ', icon: '▤' }, { id: 'sops', label: 'Thư viện SOP', icon: '▥' }, { id: 'tasks', label: 'Công việc', icon: '✓' }
  ];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = tab === 'leads' ? leads : tab === 'applications' ? applications : tab === 'sops' ? sops : [];
    return rows.filter((row) => {
      const matchesQuery = !q || Object.values(row).some((value) => text(value).toLowerCase().includes(q));
      const status = tab === 'sops' ? row.version_status : row.status;
      return matchesQuery && (recordStatus === 'ALL' || status === recordStatus);
    });
  }, [applications, leads, query, recordStatus, sops, tab]);

  const displayName = context?.user?.display_name ?? (demoMode === 'static' ? 'Nguyễn Minh Anh' : 'Đang kết nối');
  const roleName = context?.roles[0]?.name ?? persona.label;
  const initials = displayName.split(/\s+/).slice(-2).map((part) => part[0]).join('').toUpperCase();
  const selectedRow = selectedRecordId
    ? (tab === 'leads' ? leads : tab === 'applications' ? applications : tab === 'sops' ? sops : []).find((row) => text(row.id) === selectedRecordId)
    : undefined;

  return <div className={loading ? 'appShell loading' : 'appShell'} data-theme={darkMode ? 'dark' : 'light'}>
    <aside className="sidebar"><div className="brand"><span className="brandMark">S</span><span>SOP OS</span></div><nav className="nav" aria-label="Điều hướng chính">{navigation.map((item) => <button key={item.id} className={tab === item.id ? 'navItem active' : 'navItem'} onClick={() => navigate(item.id)} type="button"><span className="navIcon">{item.icon}</span><span className="navLabel">{item.label}</span></button>)}</nav><div className="sideFoot"><strong>{displayName}</strong><span>{roleName}</span></div></aside>
    <main className="main"><header className="topbar"><span className="breadcrumb">SOP OS / {navigation.find((item) => item.id === tab)?.label}</span><div className="topActions"><span className="demoBadge">LOCAL DEMO</span><select className="personaSelect" aria-label="Vai trò demo" onChange={(event) => { setPersonaId(event.target.value); setCampusId(demoPersonas.find((item) => item.id === event.target.value)?.campusIds[0] ?? centralCampusId); }} value={personaId}>{demoPersonas.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><select className="campusSelect" aria-label="Cơ sở" disabled={!context} onChange={(event) => setCampusId(event.target.value)} value={campusId}>{(context?.campuses ?? [{ id: centralCampusId, code: 'CENTRAL', name: 'Cơ sở Trung tâm', timezone: 'Asia/Ho_Chi_Minh' }]).map((campus) => <option key={campus.id} value={campus.id}>{campus.name}</option>)}</select><button aria-label={darkMode ? 'Dùng giao diện sáng' : 'Dùng giao diện tối'} className="themeToggle" onClick={() => setDarkMode((current) => !current)} type="button">{darkMode ? '☀' : '◐'}</button><span className="avatar">{initials || '—'}</span></div></header><div className="content">{demoMode === 'static' && <div className="notice">STATIC PREVIEW — dữ liệu trên màn hình không được đọc từ API.</div>}{demoMode === 'live' && connectionError && <div className="connectionError" role="alert"><strong>LIVE LOCAL DEMO chưa kết nối được API.</strong><span>{connectionError}</span><button className="secondary" onClick={() => { void refresh(); }} type="button">Thử lại</button></div>}{tab === 'overview' ? <Overview summary={summary} tasks={tasks} onCreate={() => setLeadModal(true)} timezone={timezone} /> : tab === 'tasks' ? <TaskBoard connected={connected} error={taskError} onUpdate={updateTask} query={query} setQuery={setQuery} tasks={tasks} updatingTaskId={updatingTaskId} /> : <Records onCreate={() => setLeadModal(true)} onSelect={(id) => { void selectRecord(id); }} query={query} recordStatus={recordStatus} rows={filtered} selectedId={selectedRecordId} setQuery={setQuery} setRecordStatus={setRecordStatus} tab={tab} timezone={timezone} />}{selectedRow && (tab === 'leads' || tab === 'applications') && <DemoJourney busy={journeyBusy} error={journeyError} kind={tab === 'leads' ? 'lead' : 'application'} onAction={(action) => { void runJourneyAction(action, selectedRow); }} onClose={() => setSelectedRecordId(null)} onOpenSop={openRelatedSop} roleName={roleName} row={selectedRow} />}{tab === 'sops' && sopDetail && <SopWorkspace audit={sopAudit} busy={journeyBusy} detail={sopDetail} error={journeyError} onClose={() => { setSelectedRecordId(null); setSopDetail(null); }} onComment={addSopComment} onTransition={(status) => { void runSopTransition(status); }} roleName={roleName} />}</div></main>
    {leadModal && <LeadModal campusId={campusId} connected={connected} headers={requestHeaders} onClose={() => setLeadModal(false)} onCreated={() => { setLeadModal(false); void refresh(); }} />}
  </div>;
}

function Overview({ summary, tasks, onCreate, timezone }: { summary: Summary; tasks: TaskItem[]; onCreate: () => void; timezone: string }) {
  const funnelMax = Math.max(summary.leads.total, 1);
  const funnel = [['Lead', summary.leads.total], ['Qualified', summary.leads.qualified], ['Application', summary.applications.total], ['Offered', summary.applications.offered], ['Converted', summary.leads.converted]] as const;
  return <><div className="pageHead"><div><h1>Tổng quan vận hành</h1><p>Các việc cần ưu tiên theo vai trò và cơ sở đang chọn.</p></div><button className="primary" onClick={onCreate} type="button">+ Tạo Lead</button></div><section className="metrics" aria-label="Chỉ số chính"><Metric label="Cần xử lý hôm nay" value={summary.tasks.dueToday} note={`${summary.tasks.overdue} việc quá hạn`} icon="✓" warn /><Metric label="Lead mới" value={summary.leads.new} note={`${summary.leads.qualified} đã qualified`} icon="◎" /><Metric label="Application đang review" value={summary.applications.inReview} note={`${summary.applications.incomplete} hồ sơ thiếu`} icon="▤" warn /><Metric label="SOP Effective" value={summary.sops.effective} note={`${summary.sops.inReview} chờ duyệt`} icon="▥" /></section><div className="dashboardGrid"><section className="panel"><div className="panelHead"><h2>Funnel Lead-to-Enrollment</h2><small>Dữ liệu hiện tại</small></div><div className="funnel">{funnel.map(([label, value]) => <div className="funnelRow" key={label}><span>{label}</span><div className="bar"><span style={{ width: `${Math.max((value / funnelMax) * 100, value ? 7 : 0)}%` }} /></div><strong>{value}</strong></div>)}</div></section><section className="panel"><div className="panelHead"><h2>Ưu tiên xử lý</h2><small>{tasks.length} công việc</small></div>{tasks.slice(0, 4).map((task) => <div className="task" key={task.id}><span className="taskMark" /><div className="taskText"><strong>{task.title}</strong><span>{formatDate(task.dueAt, timezone)}</span></div><em className={`badge ${task.overdue ? 'overdue' : statusClass(task.status)}`}>{task.overdue ? 'Quá hạn' : text(task.status)}</em></div>)}</section></div></>;
}

function Metric({ label, value, note, icon, warn }: { label: string; value: number; note: string; icon: string; warn?: boolean }) {
  return <article className="metric"><div className="metricHead"><span>{label}</span><span className="metricIcon">{icon}</span></div><strong>{value}</strong><span className={warn ? 'trend warn' : 'trend'}>{note}</span></article>;
}

function Records({ tab, rows, query, setQuery, onCreate, recordStatus, setRecordStatus, timezone, selectedId, onSelect }: { tab: Exclude<Tab, 'overview' | 'tasks'>; rows: Row[]; query: string; setQuery: (value: string) => void; onCreate: () => void; recordStatus: string; setRecordStatus: (value: string) => void; timezone: string; selectedId: string | null; onSelect: (id: string) => void }) {
  const config = {
    leads: { title: 'Quản lý Lead', subtitle: 'Tiếp nhận, phân loại và theo dõi cơ hội tuyển sinh.', action: '+ Tạo Lead', columns: ['Mã', 'Liên hệ', 'Nguồn', 'Trạng thái', 'Next action'] },
    applications: { title: 'Application', subtitle: 'Theo dõi hồ sơ từ Draft đến Offer.', action: '', columns: ['Mã hồ sơ', 'Học sinh', 'Chương trình', 'Trạng thái', 'Ngày tạo'] },
    sops: { title: 'Thư viện SOP', subtitle: 'Một nguồn sự thật cho quy trình vận hành đang hiệu lực.', action: '', columns: ['Mã SOP', 'Tiêu đề', 'Quy trình', 'Phiên bản', 'Trạng thái'] }
  }[tab];
  const statusOptions = tab === 'leads'
    ? ['NEW', 'ASSIGNED', 'CONTACTED', 'QUALIFIED', 'CONVERTED']
    : tab === 'applications'
      ? ['DRAFT', 'SUBMITTED', 'DOCUMENT_REVIEW', 'INCOMPLETE', 'VERIFIED', 'OFFERED']
      : ['DRAFT', 'IN_REVIEW', 'REVISION_REQUIRED', 'APPROVED', 'EFFECTIVE'];
  return <><div className="pageHead"><div><h1>{config.title}</h1><p>{config.subtitle}</p></div>{config.action && <button className="primary" onClick={onCreate} type="button">{config.action}</button>}</div><div className="toolbar"><label className="srOnly" htmlFor={`${tab}-search`}>Tìm theo mã hoặc tên</label><input className="searchInput" id={`${tab}-search`} placeholder="Tìm theo mã hoặc tên…" value={query} onChange={(event) => setQuery(event.target.value)} /><label className="srOnly" htmlFor={`${tab}-status`}>Lọc theo trạng thái</label><select className="filterSelect" id={`${tab}-status`} onChange={(event) => setRecordStatus(event.target.value)} value={recordStatus}><option value="ALL">Mọi trạng thái</option>{statusOptions.map((status) => <option key={status} value={status}>{status.replaceAll('_', ' ')}</option>)}</select></div><section className="panel tablePanel"><div className="tableWrap"><table className={`table ${tab}Table`}><thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <RecordCells key={text(row.id)} onSelect={onSelect} row={row} selected={selectedId === text(row.id)} tab={tab} timezone={timezone} />)}</tbody></table></div>{rows.length === 0 && <div className="empty">Không có dữ liệu phù hợp.</div>}</section></>;
}

function RecordCells({ tab, row, timezone, selected, onSelect }: { tab: Exclude<Tab, 'overview' | 'tasks'>; row: Row; timezone: string; selected: boolean; onSelect: (id: string) => void }) {
  const code = <button className="recordLink" onClick={() => onSelect(text(row.id))} type="button">{text(row.code)}</button>;
  if (tab === 'leads') return <tr className={selected ? 'selectedRow' : ''}><td>{code}</td><td>{text(row.first_name)} {text(row.last_name)}</td><td>{text(row.source_type)}</td><td><em className={`badge ${statusClass(row.status)}`}>{text(row.status)}</em></td><td>{formatDate(row.next_action_at, timezone)}</td></tr>;
  if (tab === 'applications') return <tr className={selected ? 'selectedRow' : ''}><td>{code}</td><td>{text(row.first_name)} {text(row.last_name)}</td><td>{text(row.program_code)}</td><td><em className={`badge ${statusClass(row.status)}`}>{text(row.status)}</em></td><td>{formatDate(row.created_at, timezone)}</td></tr>;
  return <tr className={selected ? 'selectedRow' : ''}><td>{code}</td><td>{text(row.title)}</td><td>{text(row.process_code)}</td><td>{text(row.version_label)}</td><td><em className={`badge ${statusClass(row.version_status)}`}>{text(row.version_status)}</em></td></tr>;
}

function LeadModal({ connected, onClose, onCreated, campusId, headers }: { connected: boolean; onClose: () => void; onCreated: () => void; campusId: string; headers: Record<string, string> }) {
  const [error, setError] = useState(''); const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); setError(''); if (!connected) { setError('Hãy khởi động API/PostgreSQL trước khi tạo dữ liệu synthetic.'); return; }
    setSubmitting(true); const data = new FormData(event.currentTarget);
    try { await api('/leads', headers, { method: 'POST', body: JSON.stringify({ dataProvenance: 'synthetic', code: data.get('code'), firstName: data.get('firstName'), lastName: data.get('lastName'), email: data.get('email'), phone: data.get('phone'), sourceType: data.get('sourceType'), campusId }) }); onCreated(); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Không thể tạo Lead'); } finally { setSubmitting(false); }
  }
  return <div className="modalBackdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><form className="modal" onSubmit={(event) => { void submit(event); }}><div className="modalHead"><div><h2>Tạo Lead synthetic</h2><p>Trước Gate G1: cấm nhập dữ liệu người thật. Tên phải bắt đầu bằng Synthetic-, email dùng example.test và số điện thoại dùng +000.</p></div><button className="closeButton" onClick={onClose} type="button" aria-label="Đóng">×</button></div><div className="formGrid"><label className="field"><span>Mã Lead</span><input name="code" defaultValue={`LEAD-${new Date().getFullYear()}-`} required /></label><label className="field"><span>Nguồn</span><select name="sourceType"><option value="WEBSITE">Website</option><option value="REFERRAL">Referral</option><option value="EVENT">Event</option></select></label><label className="field"><span>Họ synthetic</span><input name="firstName" defaultValue="Synthetic-" required /></label><label className="field"><span>Tên synthetic</span><input name="lastName" defaultValue="Synthetic-" required /></label><label className="field"><span>Email reserved</span><input name="email" placeholder="lead@example.test" type="email" /></label><label className="field"><span>Điện thoại non-routable</span><input name="phone" placeholder="+000000000001" /></label></div>{error && <div className="error">{error}</div>}<div className="modalActions"><button className="secondary" onClick={onClose} type="button">Hủy</button><button className="primary" disabled={submitting} type="submit">{submitting ? 'Đang tạo…' : 'Tạo Lead synthetic'}</button></div></form></div>;
}
