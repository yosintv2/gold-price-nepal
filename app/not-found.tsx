import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="state-center">
      <div className="state-icon">📊</div>
      <div className="state-title">Page Not Found</div>
      <div className="state-sub" style={{ marginBottom: 20 }}>
        The page you are looking for does not exist.
      </div>
      <Link href="/" className="btn-back">← Back to Today&apos;s Gold Price</Link>
    </div>
  );
}
