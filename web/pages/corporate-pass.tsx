import Head from 'next/head';
import Layout from '../components/Layout';
import { EmployeeTable } from '../components/EmployeeTable';

export default function CorporatePass() {
  return (
    <Layout>
      <Head><title>Corporate Pass • TransitGo</title></Head>
      <h1>Corporate Pass Overview</h1>
      <p>Employers can allocate monthly passes to employee accounts.</p>
      <EmployeeTable items={[
        { id: 'e1', name: 'Alice K.', email: 'alice@example.com', passActive: true },
        { id: 'e2', name: 'Bob M.', email: 'bob@example.com', passActive: false },
      ]} />
    </Layout>
  );
}
