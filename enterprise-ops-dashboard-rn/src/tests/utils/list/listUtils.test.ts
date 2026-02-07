import { applyFilter, applyPagination, applySort } from '../../../utils/list';

describe('list utilities', () => {
  const rows = [
    {
      id: '1',
      name: 'Alpha Gateway',
      location: 'New York',
      status: 'OK',
      updatedAt: '2026-01-10T08:00:00Z',
      score: 91
    },
    {
      id: '2',
      name: 'beta edge',
      location: 'Berlin',
      status: 'WARN',
      updatedAt: '2026-01-12T08:00:00Z',
      score: 87
    },
    {
      id: '3',
      name: 'Core Node',
      location: 'Chicago',
      status: 'ERROR',
      updatedAt: '2026-01-02T08:00:00Z',
      score: 70
    },
    {
      id: '4',
      name: 'Delta Cache',
      location: 'New York',
      status: 'OK',
      updatedAt: '2026-01-05T08:00:00Z',
      score: 95
    }
  ];

  it('filters by name, location, or status (case insensitive)', () => {
    expect(applyFilter(rows, 'beta').map((r) => r.id)).toEqual(['2']);
    expect(applyFilter(rows, 'new york').map((r) => r.id)).toEqual(['1', '4']);
    expect(applyFilter(rows, 'error').map((r) => r.id)).toEqual(['3']);
    expect(applyFilter(rows, '  ')).toBe(rows);
  });

  it('sorts rows by key and direction while keeping stability', () => {
    const sortedByNameAsc = applySort(rows, 'name', 'asc');
    expect(sortedByNameAsc.map((r) => r.id)).toEqual(['1', '2', '3', '4']);

    const sortedByScoreDesc = applySort(rows, 'score', 'desc');
    expect(sortedByScoreDesc.map((r) => r.id)).toEqual(['4', '1', '2', '3']);

    const sortedByUpdated = applySort(rows, 'updatedAt', 'asc');
    expect(sortedByUpdated.map((r) => r.id)).toEqual(['3', '4', '1', '2']);
  });

  it('applies pagination as incremental pages', () => {
    expect(applyPagination(rows, 1, 2).map((r) => r.id)).toEqual(['1', '2']);
    expect(applyPagination(rows, 2, 2).map((r) => r.id)).toEqual(['1', '2', '3', '4']);
    expect(applyPagination(rows, 3, 2)).toHaveLength(4);
  });
});
