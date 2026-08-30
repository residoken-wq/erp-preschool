'use client';

import { type FormEvent, useEffect, useMemo, useState } from 'react';

type Tab = 'overview' | 'leads' | 'applications' | 'sops' | 'tasks';
type Row = Record<string, unknown>;
type Summary = {
  leads: { total: number; new: number; qualified: number; converted: number };
  applications: { total: number; inReview: number; incomplete: number; offered: number };
  tasks: { dueToday: number; overdue: number };
  sops: { total: number; draft: number; inReview: number; effective: number };
};

const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN ?? 'http://localhost:3001';
const campusId = '00000000-0000-7000-8000-000000000101';
const actorHeaders = {
  'content-type': 'application/json',
  'x-actor-id': '00000000-0000-7000-8000-000000001001',
  'x-organization-id': '00000000-0000-7000-8000-000000000001',
  'x-campus-ids': campusId
};

const fallbackSummary: Summary = {
  leads: { total: 128, new: 18, qualified: 37, converted: 24 },
  applications: { total: 46, inReview: 18, incomplete: 5, offered: 8 },
  tasks: { dueToday: 12, overdue: 3 },
  sops: { total: 10, draft: 2, inReview: 1, effective: 7 }
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
const fallbackTasks: Row[] = [
  { id: '1', title: 'APP-2026-0148 thiếu giấy khai sinh', priority: 'HIGH', due_at: 'Quá hạn 2 giờ', status: 'OPEN', overdue: true },
  { id: '2', title: 'Review hồ sơ APP-2026-0149', priority: 'NORMAL', due_at: 'Hạn 17:00 hôm nay', status: 'IN_PROGRESS', overdue: false },
  { id: '3', title: 'Liên hệ Lead LEAD-2026-0101', priority: 'URGENT', due_at: 'Trong 1 giờ', status: 'OPEN', overdue: false }
];

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiOrigin}/api/v1${path}`, { ...init, headers: { ...actorHeaders, ...init?.headers } });
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

export function SopOsApp() {
  const [tab, setTab] = useState<Tab>('overview');
  const [summary, setSummary] = useState(fallbackSummary);
  const [leads, setLeads] = useState<Row[]>(fallbackLeads);
  const [applications, setApplications] = useState<Row[]>(fallbackApplications);
  const [sops, setSops] = useState<Row[]>(fallbackSops);
  const [tasks, setTasks] = useState<Row[]>(fallbackTasks);
  const [query, setQuery] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leadModal, setLeadModal] = useState(false);

  async function refresh(): Promise<void> {
    setLoading(true);
    try {
      const [summaryData, leadPage, applicationPage, sopRows, taskRows] = await Promise.all([
        api<Summary>('/dashboard/summary'), api<{ data: Row[] }>('/leads?pageSize=100'), api<{ data: Row[] }>('/applications'), api<Row[]>('/sops'), api<Row[]>('/tasks')
      ]);
      setSummary(summaryData); setLeads(leadPage.data); setApplications(applicationPage.data); setSops(sopRows); setTasks(taskRows); setConnected(true);
    } catch { setConnected(false); } finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, []);

  const navigation: Array<{ id: Tab; label: string; icon: string }> = [
    { id: 'overview', label: 'Tổng quan', icon: '⌂' }, { id: 'leads', label: 'Lead', icon: '◎' },
    { id: 'applications', label: 'Hồ sơ', icon: '▤' }, { id: 'sops', label: 'Thư viện SOP', icon: '▥' }, { id: 'tasks', label: 'Công việc', icon: '✓' }
  ];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = tab === 'leads' ? leads : tab === 'applications' ? applications : tab === 'sops' ? sops : tasks;
    return q ? rows.filter((row) => Object.values(row).some((value) => text(value).toLowerCase().includes(q))) : rows;
  }, [applications, leads, query, sops, tab, tasks]);

  return <div className={loading ? 'appShell loading' : 'appShell'}>
    <aside className="sidebar"><div className="brand"><span className="brandMark">S</span><span>SOP OS</span></div><nav className="nav" aria-label="Điều hướng chính">{navigation.map((item) => <button key={item.id} className={tab === item.id ? 'navItem active' : 'navItem'} onClick={() => { setTab(item.id); setQuery(''); }} type="button"><span className="navIcon">{item.icon}</span><span className="navLabel">{item.label}</span></button>)}</nav><div className="sideFoot"><strong>Nguyễn Minh Anh</strong><span>Admission Manager</span></div></aside>
    <main className="main"><header className="topbar"><span className="breadcrumb">SOP OS / {navigation.find((item) => item.id === tab)?.label}</span><div className="topActions"><select className="campusSelect" aria-label="Cơ sở"><option>Cơ sở Trung tâm</option></select><span className="avatar">MA</span></div></header><div className="content">{!connected && <div className="notice">Đang hiển thị dữ liệu demo. Khởi động API và PostgreSQL để thao tác dữ liệu thật.</div>}{tab === 'overview' ? <Overview summary={summary} tasks={tasks} onCreate={() => setLeadModal(true)} /> : <Records tab={tab} rows={filtered} query={query} setQuery={setQuery} onCreate={() => setLeadModal(true)} />}</div></main>
    {leadModal && <LeadModal connected={connected} onClose={() => setLeadModal(false)} onCreated={() => { setLeadModal(false); void refresh(); }} />}
  </div>;
}

function Overview({ summary, tasks, onCreate }: { summary: Summary; tasks: Row[]; onCreate: () => void }) {
  const funnelMax = Math.max(summary.leads.total, 1);
  const funnel = [['Lead', summary.leads.total], ['Qualified', summary.leads.qualified], ['Application', summary.applications.total], ['Offered', summary.applications.offered], ['Converted', summary.leads.converted]] as const;
  return <><div className="pageHead"><div><h1>Tổng quan vận hành</h1><p>Chào buổi sáng, Admission Manager. Đây là các việc cần ưu tiên hôm nay.</p></div><button className="primary" onClick={onCreate} type="button">+ Tạo Lead</button></div><section className="metrics" aria-label="Chỉ số chính"><Metric label="Cần xử lý hôm nay" value={summary.tasks.dueToday} note={`${summary.tasks.overdue} việc quá hạn`} icon="✓" warn /><Metric label="Lead mới" value={summary.leads.new} note={`${summary.leads.qualified} đã qualified`} icon="◎" /><Metric label="Application đang review" value={summary.applications.inReview} note={`${summary.applications.incomplete} hồ sơ thiếu`} icon="▤" warn /><Metric label="SOP Effective" value={summary.sops.effective} note={`${summary.sops.inReview} chờ duyệt`} icon="▥" /></section><div className="dashboardGrid"><section className="panel"><div className="panelHead"><h2>Funnel Lead-to-Enrollment</h2><small>Dữ liệu hiện tại</small></div><div className="funnel">{funnel.map(([label, value]) => <div className="funnelRow" key={label}><span>{label}</span><div className="bar"><span style={{ width: `${Math.max((value / funnelMax) * 100, value ? 7 : 0)}%` }} /></div><strong>{value}</strong></div>)}</div></section><section className="panel"><div className="panelHead"><h2>Ưu tiên xử lý</h2><small>{tasks.length} công việc</small></div>{tasks.slice(0, 4).map((task) => <div className="task" key={text(task.id)}><span className="taskMark" /><div className="taskText"><strong>{text(task.title)}</strong><span>{text(task.due_at)}</span></div><em className={`badge ${task.overdue ? 'overdue' : statusClass(task.status)}`}>{task.overdue ? 'Quá hạn' : text(task.status)}</em></div>)}</section></div></>;
}

function Metric({ label, value, note, icon, warn }: { label: string; value: number; note: string; icon: string; warn?: boolean }) {
  return <article className="metric"><div className="metricHead"><span>{label}</span><span className="metricIcon">{icon}</span></div><strong>{value}</strong><span className={warn ? 'trend warn' : 'trend'}>{note}</span></article>;
}

function Records({ tab, rows, query, setQuery, onCreate }: { tab: Exclude<Tab, 'overview'>; rows: Row[]; query: string; setQuery: (value: string) => void; onCreate: () => void }) {
  const config = {
    leads: { title: 'Quản lý Lead', subtitle: 'Tiếp nhận, phân loại và theo dõi cơ hội tuyển sinh.', action: '+ Tạo Lead', columns: ['Mã', 'Liên hệ', 'Nguồn', 'Trạng thái', 'Next action'] },
    applications: { title: 'Application', subtitle: 'Theo dõi hồ sơ từ Draft đến Offer.', action: '', columns: ['Mã hồ sơ', 'Học sinh', 'Chương trình', 'Trạng thái', 'Ngày tạo'] },
    sops: { title: 'Thư viện SOP', subtitle: 'Một nguồn sự thật cho quy trình vận hành đang hiệu lực.', action: '', columns: ['Mã SOP', 'Tiêu đề', 'Quy trình', 'Phiên bản', 'Trạng thái'] },
    tasks: { title: 'Công việc của tôi', subtitle: 'Danh sách công việc theo SLA và mức ưu tiên.', action: '', columns: ['Công việc', 'Đối tượng', 'Ưu tiên', 'Hạn xử lý', 'Trạng thái'] }
  }[tab];
  return <><div className="pageHead"><div><h1>{config.title}</h1><p>{config.subtitle}</p></div>{config.action && <button className="primary" onClick={onCreate} type="button">{config.action}</button>}</div><div className="toolbar"><input className="searchInput" placeholder="Tìm theo mã hoặc tên…" value={query} onChange={(event) => setQuery(event.target.value)} /><button className="secondary" type="button">Bộ lọc</button></div><section className="panel tablePanel"><div className="tableWrap"><table className="table"><thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <RecordCells key={text(row.id)} tab={tab} row={row} />)}</tbody></table></div>{rows.length === 0 && <div className="empty">Không có dữ liệu phù hợp.</div>}</section></>;
}

function RecordCells({ tab, row }: { tab: Exclude<Tab, 'overview'>; row: Row }) {
  if (tab === 'leads') return <tr><td><strong>{text(row.code)}</strong></td><td>{text(row.first_name)} {text(row.last_name)}</td><td>{text(row.source_type)}</td><td><em className={`badge ${statusClass(row.status)}`}>{text(row.status)}</em></td><td>{text(row.next_action_at)}</td></tr>;
  if (tab === 'applications') return <tr><td><strong>{text(row.code)}</strong></td><td>{text(row.first_name)} {text(row.last_name)}</td><td>{text(row.program_code)}</td><td><em className={`badge ${statusClass(row.status)}`}>{text(row.status)}</em></td><td>{text(row.created_at)}</td></tr>;
  if (tab === 'sops') return <tr><td><strong>{text(row.code)}</strong></td><td>{text(row.title)}</td><td>{text(row.process_code)}</td><td>{text(row.version_label)}</td><td><em className={`badge ${statusClass(row.version_status)}`}>{text(row.version_status)}</em></td></tr>;
  return <tr><td><strong>{text(row.title)}</strong></td><td>{text(row.related_object_type)}</td><td>{text(row.priority)}</td><td>{text(row.due_at)}</td><td><em className={`badge ${row.overdue ? 'overdue' : statusClass(row.status)}`}>{row.overdue ? 'Quá hạn' : text(row.status)}</em></td></tr>;
}

function LeadModal({ connected, onClose, onCreated }: { connected: boolean; onClose: () => void; onCreated: () => void }) {
  const [error, setError] = useState(''); const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); setError(''); if (!connected) { setError('Hãy khởi động API/PostgreSQL trước khi tạo dữ liệu thật.'); return; }
    setSubmitting(true); const data = new FormData(event.currentTarget);
    try { await api('/leads', { method: 'POST', body: JSON.stringify({ code: data.get('code'), firstName: data.get('firstName'), lastName: data.get('lastName'), email: data.get('email'), phone: data.get('phone'), sourceType: data.get('sourceType'), campusId }) }); onCreated(); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Không thể tạo Lead'); } finally { setSubmitting(false); }
  }
  return <div className="modalBackdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><form className="modal" onSubmit={(event) => { void submit(event); }}><div className="modalHead"><div><h2>Tạo Lead mới</h2><p>Thông tin liên hệ được phân loại HRI.</p></div><button className="closeButton" onClick={onClose} type="button" aria-label="Đóng">×</button></div><div className="formGrid"><label className="field"><span>Mã Lead</span><input name="code" defaultValue={`LEAD-${new Date().getFullYear()}-`} required /></label><label className="field"><span>Nguồn</span><select name="sourceType"><option value="WEBSITE">Website</option><option value="REFERRAL">Referral</option><option value="EVENT">Event</option></select></label><label className="field"><span>Họ</span><input name="firstName" required /></label><label className="field"><span>Tên</span><input name="lastName" required /></label><label className="field"><span>Email</span><input name="email" type="email" /></label><label className="field"><span>Điện thoại</span><input name="phone" /></label></div>{error && <div className="error">{error}</div>}<div className="modalActions"><button className="secondary" onClick={onClose} type="button">Hủy</button><button className="primary" disabled={submitting} type="submit">{submitting ? 'Đang tạo…' : 'Tạo Lead'}</button></div></form></div>;
}
