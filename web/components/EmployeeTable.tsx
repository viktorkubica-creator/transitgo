type Employee = { id: string; name: string; email: string; passActive: boolean };

export function EmployeeTable({ items }: { items: Employee[] }) {
  return (
    <table role="table">
      <thead>
        <tr><th>Name</th><th>Email</th><th>Status</th></tr>
      </thead>
      <tbody>
        {items.map(e => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.passActive ? 'Active' : 'Inactive'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
