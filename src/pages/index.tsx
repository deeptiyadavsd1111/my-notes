import React from 'react';
import Layout from '@theme/Layout';
export default function Home() {
  return (
    <Layout title="My Notes" description="My personal knowledge base">
      <main style={{ padding: '2rem' }}>
        <h1>My Notes</h1>
        <p>Select a topic from the sidebar to get started.</p>
      </main>
    </Layout>
  );
}
