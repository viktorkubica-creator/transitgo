import { render, screen } from '@testing-library/react';
import { EmployeeTable } from '../components/EmployeeTable';

describe('EmployeeTable', () => {
  it('renders rows', () => {
    render(<EmployeeTable items={[{ id: '1', name: 'A', email: 'a@b', passActive: true }]} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
