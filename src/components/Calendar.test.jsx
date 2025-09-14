import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HDate } from '@hebcal/core';
import Calendar from './Calendar';

// Mock the HDate to ensure consistent test results
vi.mock('@hebcal/core', () => ({
  HDate: vi.fn().mockImplementation((day, month, year) => {
    const mockDate = {
      getDate: vi.fn(() => day || 15),
      getMonth: vi.fn(() => month || 'Tishrei'),
      getFullYear: vi.fn(() => year || 5785),
      getMonthName: vi.fn(() => month || 'Tishrei'),
      daysInMonth: vi.fn(() => 30),
      greg: vi.fn(() => new Date(2024, 8, 15)), // September 15, 2024
      add: vi.fn((days) => {
        const newDate = { ...mockDate };
        if (days > 0) {
          newDate.getMonth = vi.fn(() => 'Cheshvan');
        } else {
          newDate.getMonth = vi.fn(() => 'Elul');
        }
        return newDate;
      })
    };
    return mockDate;
  })
}));

describe('Calendar Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the complete calendar interface', () => {
    render(<Calendar />);

    // Check header elements
    expect(screen.getByText(/Tishrei 5785/)).toBeInTheDocument();
    expect(screen.getByText(/Selected:/)).toBeInTheDocument();

    // Check calendar grid
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();

    // Check events panel
    expect(screen.getByText(/Events for/)).toBeInTheDocument();
  });

  it('allows navigation between months', async () => {
    render(<Calendar />);

    const nextButton = screen.getByLabelText('Next month');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Cheshvan/)).toBeInTheDocument();
    });
  });

  it('allows date selection', async () => {
    render(<Calendar />);

    // Find a calendar day and click it
    const dayButton = screen.getByText('20');
    fireEvent.click(dayButton);

    await waitFor(() => {
      expect(screen.getByText(/Selected:.*20/)).toBeInTheDocument();
    });
  });

  it('can add and display events', async () => {
    render(<Calendar />);

    // Open event form
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    // Fill in event details
    const titleInput = screen.getByPlaceholderText('Event title');
    const timeInput = screen.getByDisplayValue('');

    fireEvent.change(titleInput, { target: { value: 'Test Event' } });
    fireEvent.change(timeInput, { target: { value: '14:30' } });

    // Submit event
    const submitButton = screen.getByText('Add Event');
    fireEvent.click(submitButton);

    // Check event appears
    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('14:30')).toBeInTheDocument();
    });
  });

  it('can remove events', async () => {
    render(<Calendar />);

    // Add an event first
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    const titleInput = screen.getByPlaceholderText('Event title');
    fireEvent.change(titleInput, { target: { value: 'Test Event' } });

    const submitButton = screen.getByText('Add Event');
    fireEvent.click(submitButton);

    // Wait for event to appear
    await waitFor(() => {
      expect(screen.getByText('Test Event')).toBeInTheDocument();
    });

    // Remove the event
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    // Check event is removed
    await waitFor(() => {
      expect(screen.queryByText('Test Event')).not.toBeInTheDocument();
    });
  });

  it('can cancel event creation', async () => {
    render(<Calendar />);

    // Open event form
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    // Fill in some data
    const titleInput = screen.getByPlaceholderText('Event title');
    fireEvent.change(titleInput, { target: { value: 'Test Event' } });

    // Cancel
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Check form is closed and event not added
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Event title')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Event')).not.toBeInTheDocument();
    });
  });

  it('shows no events message when no events exist', () => {
    render(<Calendar />);

    expect(screen.getByText('No events scheduled')).toBeInTheDocument();
  });

  it('maintains selected date when navigating months', async () => {
    render(<Calendar />);

    // Select a specific day
    const dayButton = screen.getByText('20');
    fireEvent.click(dayButton);

    // Navigate to next month
    const nextButton = screen.getByLabelText('Next month');
    fireEvent.click(nextButton);

    // Check that selected date indicator still shows the date
    await waitFor(() => {
      expect(screen.getByText(/Events for 20/)).toBeInTheDocument();
    });
  });

  it('has responsive mobile layout classes', () => {
    const { container } = render(<Calendar />);

    const mainContainer = container.querySelector('.max-w-md');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('mx-auto', 'bg-white', 'min-h-screen', 'flex', 'flex-col');
  });
});