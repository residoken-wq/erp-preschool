'use client';

import { useMemo, useState } from 'react';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

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

type TaskBoardProps = {
  tasks: TaskItem[];
  query: string;
  setQuery: (value: string) => void;
  connected: boolean;
  updatingTaskId: string | null;
  error: string;
  onUpdate: (task: TaskItem, status: TaskStatus) => Promise<void>;
};

const statusLabels: Record<TaskStatus, string> = {
  OPEN: 'Chưa bắt đầu',
  IN_PROGRESS: 'Đang xử lý',
  DONE: 'Hoàn thành',
  CANCELLED: 'Đã hủy'
};

const priorityLabels: Record<TaskPriority, string> = {
  LOW: 'Thấp',
  NORMAL: 'Bình thường',
  HIGH: 'Cao',
  URGENT: 'Khẩn cấp'
};

const statusStyles: Record<TaskStatus, string> = {
  OPEN: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  IN_PROGRESS: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200',
  DONE: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  CANCELLED: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200'
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW: 'text-slate-500',
  NORMAL: 'text-slate-700 dark:text-slate-200',
  HIGH: 'text-amber-700 dark:text-amber-300',
  URGENT: 'text-rose-700 dark:text-rose-300'
};

function formatDueDate(value: string | null): string {
  if (!value) return 'Chưa có hạn';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}

function TaskActions({ task, disabled, onUpdate }: {
  task: TaskItem;
  disabled: boolean;
  onUpdate: (task: TaskItem, status: TaskStatus) => Promise<void>;
}) {
  if (task.status === 'CANCELLED') return null;
  return <div className="flex flex-wrap justify-end gap-2">
    {task.status === 'OPEN' && <button className="rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-200" disabled={disabled} onClick={() => { void onUpdate(task, 'IN_PROGRESS'); }} type="button">Bắt đầu</button>}
    {task.status !== 'DONE' && <button className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50" disabled={disabled} onClick={() => { void onUpdate(task, 'DONE'); }} type="button">Hoàn thành</button>}
    {task.status === 'DONE' && <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" disabled={disabled} onClick={() => { void onUpdate(task, 'OPEN'); }} type="button">Mở lại</button>}
  </div>;
}

export function TaskBoard({ tasks, query, setQuery, connected, updatingTaskId, error, onUpdate }: TaskBoardProps) {
  const [status, setStatus] = useState<'ALL' | TaskStatus>('ALL');
  const [priority, setPriority] = useState<'ALL' | TaskPriority>('ALL');
  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi');
    return tasks.filter((task) => {
      const matchesQuery = !normalizedQuery
        || task.title.toLocaleLowerCase('vi').includes(normalizedQuery)
        || task.relatedObjectType?.toLocaleLowerCase('vi').includes(normalizedQuery);
      return matchesQuery && (status === 'ALL' || task.status === status) && (priority === 'ALL' || task.priority === priority);
    });
  }, [priority, query, status, tasks]);

  const counts = {
    open: tasks.filter((task) => task.status === 'OPEN').length,
    inProgress: tasks.filter((task) => task.status === 'IN_PROGRESS').length,
    done: tasks.filter((task) => task.status === 'DONE').length
  };

  return <div className="space-y-5 text-slate-900 dark:text-slate-100">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
      <div><h1>Công việc của tôi</h1><p>Theo dõi và cập nhật tiến độ công việc được giao.</p></div>
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-500" />{connected ? 'Đã đồng bộ API' : 'Chế độ xem demo'}</div>
    </div>

    <section aria-label="Tổng hợp công việc" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[['Chưa bắt đầu', counts.open, 'bg-slate-500'], ['Đang xử lý', counts.inProgress, 'bg-blue-500'], ['Hoàn thành', counts.done, 'bg-emerald-500']].map(([label, value, dot]) => <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900" key={String(label)}><div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><span className={`h-2.5 w-2.5 rounded-full ${dot}`} />{label}</div><strong className="mt-2 block text-2xl">{value}</strong></article>)}
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-[minmax(220px,1fr)_180px_180px] dark:border-slate-800">
        <label className="sr-only" htmlFor="task-search">Tìm công việc</label>
        <input className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-blue-950" id="task-search" onChange={(event) => setQuery(event.target.value)} placeholder="Tìm công việc hoặc đối tượng…" type="search" value={query} />
        <label className="sr-only" htmlFor="task-status-filter">Lọc theo trạng thái</label>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950" id="task-status-filter" onChange={(event) => setStatus(event.target.value as 'ALL' | TaskStatus)} value={status}><option value="ALL">Mọi trạng thái</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <label className="sr-only" htmlFor="task-priority-filter">Lọc theo ưu tiên</label>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950" id="task-priority-filter" onChange={(event) => setPriority(event.target.value as 'ALL' | TaskPriority)} value={priority}><option value="ALL">Mọi ưu tiên</option>{Object.entries(priorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      </div>

      {error && <div aria-live="polite" className="mx-4 mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200" role="alert">{error}</div>}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead><tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-950 dark:text-slate-400"><th className="px-5 py-3">Công việc</th><th className="px-5 py-3">Ưu tiên</th><th className="px-5 py-3">Hạn xử lý</th><th className="px-5 py-3">Trạng thái</th><th className="px-5 py-3 text-right">Thao tác</th></tr></thead>
          <tbody>{visibleTasks.map((task) => <tr className="border-t border-slate-100 dark:border-slate-800" key={task.id}><td className="px-5 py-4"><strong className="block font-semibold">{task.title}</strong><span className="mt-1 block text-xs text-slate-500">{task.relatedObjectType ?? 'Công việc nội bộ'}</span></td><td className={`px-5 py-4 text-xs font-bold uppercase ${priorityStyles[task.priority]}`}>{priorityLabels[task.priority]}</td><td className="px-5 py-4"><span className="block">{formatDueDate(task.dueAt)}</span>{task.overdue && <span className="mt-1 block text-xs font-semibold text-rose-600">Quá hạn</span>}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>{statusLabels[task.status]}</span></td><td className="px-5 py-4"><TaskActions disabled={!connected || updatingTaskId === task.id} onUpdate={onUpdate} task={task} /></td></tr>)}</tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">{visibleTasks.map((task) => <article className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700" key={task.id}><div className="flex items-start justify-between gap-3"><div><strong className="block text-sm">{task.title}</strong><span className="mt-1 block text-xs text-slate-500">{task.relatedObjectType ?? 'Công việc nội bộ'}</span></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>{statusLabels[task.status]}</span></div><div className="my-4 flex items-center justify-between text-xs"><span className={`font-bold uppercase ${priorityStyles[task.priority]}`}>{priorityLabels[task.priority]}</span><span className={task.overdue ? 'font-semibold text-rose-600' : 'text-slate-500'}>{task.overdue ? 'Quá hạn · ' : ''}{formatDueDate(task.dueAt)}</span></div><TaskActions disabled={!connected || updatingTaskId === task.id} onUpdate={onUpdate} task={task} /></article>)}</div>

      {visibleTasks.length === 0 && <div className="px-5 py-12 text-center text-sm text-slate-500">Không có công việc phù hợp với bộ lọc.</div>}
    </section>
  </div>;
}
