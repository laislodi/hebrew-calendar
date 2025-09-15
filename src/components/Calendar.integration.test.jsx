import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from './Calendar';
import { describe, expect, it } from 'vitest';

describe('Calendar Basic Integration Tests', () => {
  it('renders the complete calendar interface', () => {
    render(<Calendar />);

    // Check that main elements are present
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText(/Events for/)).toBeInTheDocument();
    expect(screen.getByText('No events scheduled')).toBeInTheDocument();
  });

  it('can open and close event form', async () => {
    render(<Calendar />);

    // Open event form
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    // Check form appears
    expect(screen.getByPlaceholderText('Event title')).toBeInTheDocument();

    // Cancel form
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Check form disappears
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Event title')).not.toBeInTheDocument();
    });
  });

  it('can add and display an event', async () => {
    render(<Calendar />);

    // Open event form
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    // Fill in event details
    const titleInput = screen.getByPlaceholderText('Event title');
    fireEvent.change(titleInput, { target: { value: 'Test Meeting' } });

    // Submit event
    const submitButton = screen.getByText('Add Event');
    fireEvent.click(submitButton);

    // Check event appears and form closes
    await waitFor(() => {
      expect(screen.getByText('Test Meeting')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Event title')).not.toBeInTheDocument();
    });
  });

  it('can remove an event', async () => {
    render(<Calendar />);

    // Add an event first
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    const titleInput = screen.getByPlaceholderText('Event title');
    fireEvent.change(titleInput, { target: { value: 'Meeting to Remove' } });

    const submitButton = screen.getByText('Add Event');
    fireEvent.click(submitButton);

    // Wait for event to appear
    await waitFor(() => {
      expect(screen.getByText('Meeting to Remove')).toBeInTheDocument();
    });

    // Remove the event
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    // Check event is removed
    await waitFor(() => {
      expect(screen.queryByText('Meeting to Remove')).not.toBeInTheDocument();
      expect(screen.getByText('No events scheduled')).toBeInTheDocument();
    });
  });

  it('shows default time when not specified', async () => {
    render(<Calendar />);

    // Add event without time
    const addEventButton = screen.getByLabelText('Add event');
    fireEvent.click(addEventButton);

    const titleInput = screen.getByPlaceholderText('Event title');
    fireEvent.change(titleInput, { target: { value: 'No Time Event' } });

    const submitButton = screen.getByText('Add Event');
    fireEvent.click(submitButton);

    // Check event has default time
    await waitFor(() => {
      expect(screen.getByText('No Time Event')).toBeInTheDocument();
      expect(screen.getByText('12:00')).toBeInTheDocument();
    });
  });

  it('navigation buttons are present and labeled correctly', () => {
    render(<Calendar />);

    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
    expect(screen.getByLabelText('Add event')).toBeInTheDocument();
  });

  it('has mobile-first responsive layout', () => {
    const { container } = render(<Calendar />);

    const mainContainer = container.querySelector('.max-w-md');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('mx-auto', 'bg-white', 'min-h-screen');
  });
});