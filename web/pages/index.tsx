import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>TransitGo Web (Training)</title>
      </Head>
      <main style={{ fontFamily: 'system-ui, Arial, sans-serif', padding: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--color-fg)' }}>TransitGo Web Portal (Training)</h1>
        <p style={{ color: 'var(--color-muted)' }}>
          Design tokens v1 applied. This is a minimal stub.
        </p>
        <div
          style={{
            display: 'inline-block',
            padding: 'var(--space-4) var(--space-6)',
            background: 'var(--color-primary)',
            color: 'white',
            borderRadius: '8px'
          }}
        >
          Primary Button
        </div>
      </main>
    </>
  );
}
