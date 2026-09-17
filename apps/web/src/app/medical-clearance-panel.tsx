'use client';

import { useState, type FormEvent } from 'react';

export type MedicalClearance = {
  applicationId: string;
  cleared: boolean;
  allergyFlags: string[];
  specialHealthNeeds: string | null;
  rowVersion: string;
};
export type ClearanceCommand = { cleared: boolean; allergyFlags: string[]; specialHealthNeeds: string };

type Props = {
  clearance: MedicalClearance | null;
  canRead: boolean;
  canEdit: boolean;
  loading: boolean;
  busy: boolean;
  error: string;
  onSave: (command: ClearanceCommand) => Promise<void>;
  onReload: () => Promise<void>;
};

const fieldStyle = 'w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-400';
const buttonStyle = 'rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-200 dark:focus:ring-blue-400';

function ClearanceForm({ clearance, busy, onSave }: Pick<Props, 'clearance' | 'busy' | 'onSave'>) {
  const [validationError, setValidationError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    const allergyInput = data.get('allergyFlags');
    const needsInput = data.get('specialHealthNeeds');
    const allergyFlags = (typeof allergyInput === 'string' ? allergyInput : '').split('\n').map((flag) => flag.trim()).filter(Boolean);
    if (allergyFlags.length > 100 || allergyFlags.some((flag) => flag.length > 200)) {
      setValidationError('Nhập tối đa 100 cảnh báo dị ứng, mỗi dòng tối đa 200 ký tự.');
      return;
    }
    setValidationError('');
    void onSave({ cleared: data.get('cleared') === 'on', allergyFlags, specialHealthNeeds: typeof needsInput === 'string' ? needsInput : '' });
  }
  return <form onSubmit={submit}>
    <fieldset className="min-w-0 space-y-4" disabled={busy}>
      <legend className="sr-only">Cập nhật xác nhận y tế</legend>
      <label className="flex items-center gap-2 text-sm"><input className="h-4 w-4" defaultChecked={clearance?.cleared ?? false} name="cleared" type="checkbox" />Đã xác nhận đủ điều kiện y tế</label>
      <label className="block space-y-1 text-sm"><span>Cảnh báo dị ứng (mỗi dòng một cảnh báo)</span><textarea className={fieldStyle} defaultValue={clearance?.allergyFlags.join('\n') ?? ''} name="allergyFlags" rows={3} /></label>
      <label className="block space-y-1 text-sm"><span>Nhu cầu sức khỏe đặc biệt</span><textarea className={fieldStyle} defaultValue={clearance?.specialHealthNeeds ?? ''} maxLength={4000} name="specialHealthNeeds" rows={3} /></label>
      {validationError && <p aria-live="polite" className="text-sm text-rose-700 dark:text-rose-200" role="alert">{validationError}</p>}
      <button className={buttonStyle} type="submit">{busy ? 'Đang lưu…' : 'Lưu xác nhận y tế'}</button>
    </fieldset>
  </form>;
}

export function MedicalClearancePanel({ clearance, canRead, canEdit, loading, busy, error, onSave, onReload }: Props) {
  if (!canRead && !canEdit) return null;
  return <section aria-label="Xác nhận y tế" aria-busy={loading || busy} className="mt-4 min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
    <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-semibold">Xác nhận y tế</h2>{!canEdit && <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">Chỉ đọc</span>}</div>
    {loading && <p role="status">Đang tải xác nhận y tế…</p>}
    {error && <div aria-live="polite" className="space-y-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200" role="alert"><p>{error}</p><button className={buttonStyle} disabled={loading || busy} onClick={() => { void onReload(); }} type="button">Tải lại dữ liệu</button></div>}
    {!loading && !error && <>
      <p className="text-sm">{clearance ? (clearance.cleared ? 'Đã xác nhận đủ điều kiện y tế' : 'Chưa xác nhận đủ điều kiện y tế') : 'Chưa có xác nhận y tế.'}</p>
      {Boolean(clearance?.allergyFlags.length) && <div className="break-words rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-200"><span>Cảnh báo dị ứng</span><ul className="mt-1 list-inside list-disc">{clearance?.allergyFlags.map((flag, index) => <li key={index}>{flag}</li>)}</ul></div>}
      {canEdit ? <ClearanceForm busy={busy} clearance={clearance} key={clearance?.rowVersion ?? 'new'} onSave={onSave} /> : <p className="whitespace-pre-wrap break-words text-sm">Nhu cầu sức khỏe đặc biệt: {clearance?.specialHealthNeeds || 'Chưa ghi nhận'}</p>}
    </>}
  </section>;
}
