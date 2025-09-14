import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from './EventForm';

describe('EventForm', () => {
  const mockOnTitleChange = vi.fn();
  const mockOnTimeChange = vi.fn();
  const mockOnAddEvent = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    newEventTitle: '',
    newEventTime: '',
    onTitleChange: mockOnTitleChange,
    onTimeChange: mockOnTimeChange,
    onAddEvent: mockOnAddEvent,
    onCancel: mockOnCancel
  };

  beforeEach(() => {
    mockOnTitleChange.mockClear();
    mockOnTimeChange.mockClear();
    mockOnAddEvent.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders title input with placeholder', () => {
    render(<EventForm {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('Event title');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute('type', 'text');
  });

  it('renders time input', () => {
    const { container } = render(<EventForm {...defaultProps} />);

    const timeInput = container.querySelector('input[type="time"]');
    expect(timeInput).toBeInTheDocument();
    expect(timeInput).toHaveAttribute('type', 'time');
  });

  it('displays current values correctly', () => {
    const propsWithValues = {
      ...defaultProps,
      newEventTitle: 'Meeting',
      newEventTime: '14:30'
    };

    render(<EventForm {...propsWithValues} />);

    expect(screen.getByDisplayValue('Meeting')).toBeInTheDocument();
    expect(screen.getByDisplayValue('14:30')).toBeInTheDocument();
  });

  it('calls onTitleChange when title input changes', () => {
    render(<EventForm {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('Event title');
    fireEvent.change(titleInput, { target: { value: 'New Event' } });

    expect(mockOnTitleChange).toHaveBeenCalledWith('New Event');
  });

  it('calls onTimeChange when time input changes', () => {
    const { container } = render(<EventForm {...defaultProps} />);

    const timeInput = container.querySelector('input[type="time"]');
    fireEvent.change(timeInput, { target: { value: '15:30' } });

    expect(mockOnTimeChange).toHaveBeenCalledWith('15:30');
  });

  it('renders Add Event button', () => {
    render(<EventForm {...defaultProps} />);

    const addButton = screen.getByText('Add Event');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveClass('bg-blue-500', 'text-white');
  });

  it('renders Cancel button', () => {
    render(<EventForm {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveClass('bg-gray-300', 'text-gray-700');
  });

  it('calls onAddEvent when Add Event button clicked', () => {
    render(<EventForm {...defaultProps} />);

    const addButton = screen.getByText('Add Event');
    fireEvent.click(addButton);

    expect(mockOnAddEvent).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel button clicked', () => {
    render(<EventForm {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('title input has autofocus', () => {
    render(<EventForm {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('Event title');
    expect(titleInput).toHaveFocus();
  });

  it('has proper container styling', () => {
    const { container } = render(<EventForm {...defaultProps} />);

    const formContainer = container.firstChild;
    expect(formContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'p-3',
      'mb-3',
      'border'
    );
  });

  it('buttons are arranged in flexbox', () => {
    render(<EventForm {...defaultProps} />);

    const buttonContainer = screen.getByText('Add Event').parentElement;
    expect(buttonContainer).toHaveClass('flex', 'gap-2');
  });

  it('inputs have proper styling classes', () => {
    const { container } = render(<EventForm {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText('Event title');
    const timeInput = container.querySelector('input[type="time"]');

    expect(titleInput).toHaveClass('w-full', 'p-2', 'border', 'rounded-md', 'text-sm');
    expect(timeInput).toHaveClass('w-full', 'p-2', 'border', 'rounded-md', 'text-sm');
  });
});