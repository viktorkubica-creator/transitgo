import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Planner from '../pages/planner';

global.fetch = jest.fn(async (url: any) => {
  return {
    ok: true,
    json: async () => ({ options: [{ summary: 'Main → Tech', durationMinutes: 15 }] })
  } as any;
}) as any;

describe('Planner page', () => {
  it('renders and searches', async () => {
    render(<Planner />);
    fireEvent.click(screen.getByText(/Search/i));
    await waitFor(() => screen.getByTestId('journeys'));
    expect(screen.getByText(/Main → Tech/)).toBeInTheDocument();
  });
});
