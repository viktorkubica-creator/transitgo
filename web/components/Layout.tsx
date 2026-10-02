import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif' }}>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <strong>TransitGo</strong>
      </header>
      <main style={{ padding: 16 }}>{children}</main>
    </div>
  );
}
