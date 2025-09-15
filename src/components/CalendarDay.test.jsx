import { render, screen, fireEvent } from '@testing-library/react';
import CalendarDay from './CalendarDay';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CalendarDay', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders empty cell when isEmpty is true', () => {
    const { container } = render(<CalendarDay isEmpty={true} />);

    const cell = container.firstChild;
    expect(cell).toHaveClass('h-12');
    expect(cell).toBeEmptyDOMElement();
  });

  it('renders day number correctly', () => {
    render(
      <CalendarDay
        day={15}
        isToday={false}
        isSelected={false}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('applies today styling when isToday is true', () => {
    const { container } = render(
      <CalendarDay
        day={15}
        isToday={true}
        isSelected={false}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    const dayElement = container.firstChild;
    expect(dayElement).toHaveClass('bg-blue-500', 'text-white');
  });

  it('applies selected styling when isSelected is true', () => {
    const { container } = render(
      <CalendarDay
        day={15}
        isToday={false}
        isSelected={true}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    const dayElement = container.firstChild;
    expect(dayElement).toHaveClass('bg-blue-100', 'text-blue-600');
  });

  it('shows event indicator when hasEvents is true', () => {
    const { container } = render(
      <CalendarDay
        day={15}
        isToday={false}
        isSelected={false}
        hasEvents={true}
        onClick={mockOnClick}
      />
    );

    const eventIndicator = container.querySelector('.bg-red-500');
    expect(eventIndicator).toBeInTheDocument();
  });

  it('calls onClick with day number when clicked', () => {
    render(
      <CalendarDay
        day={15}
        isToday={false}
        isSelected={false}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText('15'));
    expect(mockOnClick).toHaveBeenCalledWith(15);
  });

  it('has hover styling for non-today, non-selected days', () => {
    const { container } = render(
      <CalendarDay
        day={15}
        isToday={false}
        isSelected={false}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    const dayElement = container.firstChild;
    expect(dayElement).toHaveClass('hover:bg-gray-100');
  });

  it('is clickable and has cursor pointer', () => {
    const { container } = render(
      <CalendarDay
        day={15}
        isToday={false}
        isSelected={false}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    const dayElement = container.firstChild;
    expect(dayElement).toHaveClass('cursor-pointer');
  });

  it('today styling takes precedence over selected styling', () => {
    const { container } = render(
      <CalendarDay
        day={15}
        isToday={true}
        isSelected={true}
        hasEvents={false}
        onClick={mockOnClick}
      />
    );

    const dayElement = container.firstChild;
    expect(dayElement).toHaveClass('bg-blue-500', 'text-white');
    expect(dayElement).not.toHaveClass('bg-blue-100', 'text-blue-600');
  });
});