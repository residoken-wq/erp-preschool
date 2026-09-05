'use client';

import { type FormEvent, useState } from 'react';

type Row = Record<string, unknown>;

function text(value: unknown): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return '—';
}

export function SopWorkspace({ detail, audit, busy, error, roleName, onTransition, onComment, onClose }: {
  detail: Row;
  audit: Row[];
  busy: boolean;
  error: string;
  roleName: string;
  onTransition: (status: string) => void;
  onComment: (body: string) => Promise<void>;
  onClose: () => void;
}) {
  const [commenting, setCommenting] = useState(false);
  const versions = Array.isArray(detail.versions) ? detail.versions as Row[] : [];
  const sections = Array.isArray(detail.sections) ? detail.sections as Row[] : [];
  const steps = Array.isArray(detail.steps) ? detail.steps as Row[] : [];
  const comments = Array.isArray(detail.comments) ? detail.comments as Row[] : [];
  const version = versions[0];
  const status = text(version?.status);

  async function submitComment(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new FormData(form).get('comment');
    if (typeof body !== 'string' || !body.trim()) return;
    setCommenting(true);
    try { await onComment(body.trim()); form.reset(); } finally { setCommenting(false); }
  }

  return <section className="sopWorkspace" aria-label="SOP workspace">
    <div className="journeyHead"><div><span className="eyebrow">SOP-TO-EXECUTION</span><h2>{text(detail.code)} · {text(detail.title)}</h2><p>{text(detail.process_name)} · {text(version?.version_label)}</p></div><button aria-label="Đóng SOP workspace" className="closeButton" onClick={onClose} type="button">×</button></div>
    <div className="journeyFacts"><span>Trạng thái <strong>{status}</strong></span><span>Loại <strong>{text(detail.sop_type)}</strong></span><span>Ưu tiên <strong>{text(detail.priority)}</strong></span></div>
    {error && <div className="error" role="alert">{error}</div>}
    <div className="journeyActions">
      {status === 'DRAFT' && <button className="primary" disabled={busy} onClick={() => onTransition('IN_REVIEW')} type="button">Gửi review</button>}
      {status === 'IN_REVIEW' && roleName === 'Admission Manager' && <button className="primary" disabled={busy} onClick={() => onTransition('APPROVED')} type="button">Approve SOP</button>}
      {status === 'IN_REVIEW' && roleName !== 'Admission Manager' && <span className="journeyHint">Chuyển persona sang Admission Manager để approve.</span>}
      {status === 'APPROVED' && <button className="primary" disabled={busy} onClick={() => onTransition('EFFECTIVE')} type="button">Đưa vào Effective</button>}
      {status === 'EFFECTIVE' && <span className="journeyDone">Phiên bản Effective đang read-only</span>}
    </div>
    <div className="sopGrid">
      <div><h3>Structured content</h3>{sections.map((section) => <article className="sopCard" key={text(section.id)}><strong>{text(section.title)}</strong><p>{JSON.stringify(section.content_json)}</p></article>)}{steps.map((step) => <article className="sopStep" key={text(step.id)}><span>{text(step.step_no)}</span><div><strong>{text(step.name)}</strong><p>{text(step.action_text)}</p><small>{text(step.actor_role_code)} · {text(step.automation_type)}</small></div></article>)}</div>
      <div><h3>Review & audit</h3>{status === 'IN_REVIEW' && <form className="commentForm" onSubmit={(event) => { void submitComment(event); }}><label htmlFor="sop-comment">Review comment</label><textarea id="sop-comment" name="comment" placeholder="Nhập nhận xét synthetic…" required /><button className="secondary" disabled={commenting} type="submit">{commenting ? 'Đang lưu…' : 'Thêm comment'}</button></form>}{comments.map((comment) => <article className="auditItem" key={text(comment.id)}><strong>{text(comment.author_name)}</strong><span>{text(comment.body)}</span></article>)}{audit.map((event) => <article className="auditItem" key={text(event.id)}><strong>{text(event.action)}</strong><span>{text(event.occurred_at)}</span></article>)}{comments.length === 0 && audit.length === 0 && <p>Chưa có review/audit event cho version này.</p>}</div>
    </div>
  </section>;
}
