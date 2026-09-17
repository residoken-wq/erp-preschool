'use client';

export type DiscountDecision = 'APPROVED' | 'REJECTED';
export type ApprovalOffer = {
  id: string;
  code: string;
  status: string;
  pendingApproval: boolean | null;
  validUntil: string | null;
};

type Props = {
  offer: ApprovalOffer;
  canApprove: boolean;
  busy: boolean;
  error: string;
  timezone: string;
  onDecision: (offerId: string, decision: DiscountDecision) => Promise<void>;
};

function formatValidUntil(value: string | null, timezone: string): string {
  if (!value) return 'Chưa có thông tin hạn giữ chỗ';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Hạn giữ chỗ không hợp lệ';
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short', timeZone: timezone }).format(date);
}

export function DiscountApprovalPanel({ offer, canApprove, busy, error, timezone, onDecision }: Props) {
  function decide(decision: DiscountDecision): void {
    if (busy || !canApprove || offer.pendingApproval !== true) return;
    if (window.confirm(`${decision === 'APPROVED' ? 'Phê duyệt' : 'Từ chối'} chiết khấu cho Offer ${offer.code}?`)) void onDecision(offer.id, decision);
  }
  return <section aria-label="Duyệt chiết khấu Offer" aria-busy={busy} className="mt-4 min-w-0 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
    <h2 className="break-words text-lg font-semibold">Offer {offer.code}</h2>
    <p className="text-sm">Trạng thái: {offer.status}</p>
    {offer.pendingApproval === true && <span className="inline-flex rounded-xl bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">Chờ duyệt chiết khấu</span>}
    {offer.pendingApproval === null && <p className="text-sm text-slate-600 dark:text-slate-300">Chưa có thông tin yêu cầu duyệt chiết khấu.</p>}
    {offer.status === 'ISSUED' && <p className="text-sm">Hạn giữ chỗ: {formatValidUntil(offer.validUntil, timezone)}</p>}
    {error && <p aria-live="polite" className="break-words rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200" role="alert">{error}</p>}
    {offer.pendingApproval === true && canApprove && <div className="flex flex-wrap gap-2">{(['APPROVED', 'REJECTED'] as const).map((decision) => <button className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-blue-400" disabled={busy} key={decision} onClick={() => decide(decision)} type="button">{decision === 'APPROVED' ? 'Phê duyệt' : 'Từ chối'}</button>)}</div>}
  </section>;
}
