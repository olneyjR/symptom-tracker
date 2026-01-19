import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  isToday,
  isFuture
} from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function getMonthDays(date: Date): Date[] {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
}

export function getCalendarDays(date: Date): Date[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  // Get all days of the month
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Pad with previous month days to align with week start
  const firstDayOfWeek = monthStart.getDay();
  const previousMonthDays = firstDayOfWeek > 0 
    ? eachDayOfInterval({
        start: new Date(monthStart.getFullYear(), monthStart.getMonth(), -firstDayOfWeek + 1),
        end: new Date(monthStart.getFullYear(), monthStart.getMonth(), 0)
      })
    : [];
  
  // Pad with next month days to complete the grid
  const lastDayOfWeek = monthEnd.getDay();
  const nextMonthDays = lastDayOfWeek < 6
    ? eachDayOfInterval({
        start: new Date(monthEnd.getFullYear(), monthEnd.getMonth() + 1, 1),
        end: new Date(monthEnd.getFullYear(), monthEnd.getMonth() + 1, 6 - lastDayOfWeek)
      })
    : [];
  
  return [...previousMonthDays, ...days, ...nextMonthDays];
}

export function isSameDayHelper(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(d1, d2);
}

export function isDateToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isToday(d);
}

export function isDateFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isFuture(d);
}

export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function getPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

export function parseISODate(dateString: string): Date {
  return parseISO(dateString);
}
