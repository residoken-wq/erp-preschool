'use client';

import { applicationActionForStatus, leadActionForStatus, type JourneyAction } from './demo-journey-state';

export type { JourneyAction } from './demo-journey-state';

type Row = Record<string, unknown>;

function value(row: Row, key: string): string {
  const item = row[key];
  return typeof item === 'string' || typeof item === 'number' ? String(item) : '—';
}

function ActionButton({ action, label, onAction, disabled, primary = false }: { action: JourneyAction; label: string; onAction: (action: JourneyAction) => void; disabled: boolean; primary?: boolean }) {
  return <button className={primary ? 'primary' : 'secondary'} disabled={disabled} onClick={() => onAction(action)} type="button">{label}</button>;
}

function LeadActions({ row, busy, onAction }: { row: Row; busy: boolean; onAction: (action: JourneyAction) => void }) {
  const status = value(row, 'status');
  const next = leadActionForStatus(status);
  return <div className="journeyActions">
    {next && <ActionButton action={next[0]} disabled={busy} label={next[1]} onAction={onAction} primary />}
    {status === 'CONVERTED' && <span className="journeyDone">Lead đã chuyển thành Application</span>}
  </div>;
}

function ApplicationActions({ row, busy, onAction, roleName }: { row: Row; busy: boolean; onAction: (action: JourneyAction) => void; roleName: string }) {
  const status = value(row, 'status');
  const offerStatus = value(row, 'offer_status');
  const enrollmentId = value(row, 'enrollment_id');
  const contractStatus = value(row, 'contract_status');
  const handoverStatus = value(row, 'handover_status');
  const next = applicationActionForStatus(status);

  return <div className="journeyActions">
    {next && <ActionButton action={next[0]} disabled={busy} label={next[1]} onAction={onAction} primary />}
    {status === 'DECISION_PENDING' && offerStatus === '—' && <ActionButton action="offer.create" disabled={busy} label="Tạo Offer simulated" onAction={onAction} primary />}
    {offerStatus === 'DRAFT' && <ActionButton action="offer.submit" disabled={busy} label="Gửi duyệt Offer" onAction={onAction} primary />}
    {offerStatus === 'PENDING_APPROVAL' && <><ActionButton action="offer.approve" disabled={busy || roleName !== 'Admission Manager'} label="Manager duyệt Offer" onAction={onAction} primary />{roleName !== 'Admission Manager' && <span className="journeyHint">Chuyển persona sang Admission Manager để duyệt.</span>}</>}
    {offerStatus === 'APPROVED' && <ActionButton action="offer.issue" disabled={busy} label="Issue Offer" onAction={onAction} primary />}
    {offerStatus === 'ISSUED' && <ActionButton action="offer.accept" disabled={busy} label="Ghi nhận phụ huynh chấp nhận" onAction={onAction} primary />}
    {offerStatus === 'ACCEPTED' && enrollmentId === '—' && <ActionButton action="enrollment.create" disabled={busy} label="Xác nhận Enrollment" onAction={onAction} primary />}
    {enrollmentId !== '—' && contractStatus === '—' && <ActionButton action="enrollment.finance" disabled={busy} label="Tạo Contract/Fee Plan Draft" onAction={onAction} primary />}
    {handoverStatus === 'NOT_READY' && <ActionButton action="handover.ready" disabled={busy} label="Hoàn tất checklist" onAction={onAction} primary />}
    {handoverStatus === 'READY' && <ActionButton action="handover.submit" disabled={busy} label="Gửi Handover" onAction={onAction} primary />}
    {handoverStatus === 'SUBMITTED' && <ActionButton action="handover.accept" disabled={busy} label="Academic nhận Handover" onAction={onAction} primary />}
    {handoverStatus === 'ACCEPTED' && <span className="journeyDone">Golden path đã hoàn tất</span>}
  </div>;
}

export function DemoJourney({ kind, row, busy, error, roleName, onAction, onClose, onOpenSop }: { kind: 'lead' | 'application'; row: Row; busy: boolean; error: string; roleName: string; onAction: (action: JourneyAction) => void; onClose: () => void; onOpenSop: (code: string) => void }) {
  return <section aria-label="Demo journey" className="journeyPanel">
    <div className="journeyHead"><div><span className="eyebrow">GOLDEN DEMO PATH</span><h2>{value(row, 'code')}</h2><p>{kind === 'lead' ? 'Đi từ Lead mới đến Application.' : 'Đi từ hồ sơ đến Offer, Enrollment và Handover.'}</p></div><button aria-label="Đóng demo journey" className="closeButton" onClick={onClose} type="button">×</button></div>
    <div className="journeyFacts"><span>Trạng thái <strong>{value(row, 'status')}</strong></span>{kind === 'application' && <><span>Offer <strong>{value(row, 'offer_status')}</strong></span><span>Enrollment <strong>{value(row, 'enrollment_status')}</strong></span><span>Handover <strong>{value(row, 'handover_status')}</strong></span></>}</div>
    {error && <div className="error" role="alert">{error}</div>}
    {kind === 'lead' ? <LeadActions busy={busy} onAction={onAction} row={row} /> : <ApplicationActions busy={busy} onAction={onAction} roleName={roleName} row={row} />}
    {kind === 'application' && <button className="sopLink" onClick={() => onOpenSop('ADM-010')} type="button">Mở SOP ADM-010 liên quan →</button>}
    <small className="simulatedNote">Toàn bộ dữ liệu và external outcome trong flow này là synthetic/simulated.</small>
  </section>;
}
