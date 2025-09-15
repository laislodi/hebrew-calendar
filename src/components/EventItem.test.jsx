import { render, screen, fireEvent } from '@testing-library/react';
import EventItem from './EventItem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('EventItem', () => {
  const mockOnRemove = vi.fn();
  const testEvent = {
    id: 123,
    title: 'Test Event',
    time: '14:30'
  };

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  it('renders event title and time correctly', () => {
    render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('displays event title with correct styling', () => {
    render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    const titleElement = screen.getByText('Test Event');
    expect(titleElement).toHaveClass('font-medium', 'text-gray-800', 'text-sm');
  });

  it('displays event time with correct styling', () => {
    render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    const timeElement = screen.getByText('14:30');
    expect(timeElement).toHaveClass('text-gray-500', 'text-xs');
  });

  it('renders remove button', () => {
    render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    const removeButton = screen.getByText('Remove');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveClass('text-red-500');
  });

  it('calls onRemove with event id when remove button clicked', () => {
    render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(123);
  });

  it('has proper container styling', () => {
    const { container } = render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    const eventContainer = container.firstChild;
    expect(eventContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'p-3',
      'flex',
      'items-center',
      'justify-between',
      'border'
    );
  });

  it('remove button has hover effect', () => {
    render(<EventItem event={testEvent} onRemove={mockOnRemove} />);

    const removeButton = screen.getByText('Remove');
    expect(removeButton).toHaveClass('hover:text-red-700');
  });

  it('handles long event titles correctly', () => {
    const longTitleEvent = {
      ...testEvent,
      title: 'This is a very long event title that should be displayed properly'
    };

    render(<EventItem event={longTitleEvent} onRemove={mockOnRemove} />);

    expect(screen.getByText(longTitleEvent.title)).toBeInTheDocument();
  });

  it('handles different time formats', () => {
    const differentTimeEvent = {
      ...testEvent,
      time: '09:00'
    };

    render(<EventItem event={differentTimeEvent} onRemove={mockOnRemove} />);

    expect(screen.getByText('09:00')).toBeInTheDocument();
  });
});