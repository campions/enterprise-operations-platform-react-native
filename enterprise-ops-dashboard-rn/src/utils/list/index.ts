import { useCallback, useMemo, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

type FilterableRow = {
  name?: string;
  location?: string;
  status?: string;
};

const normalizeString = (value: unknown) => (value ?? '').toString().toLowerCase();

export const applyFilter = <TRow extends FilterableRow>(rows: TRow[], filterText: string): TRow[] => {
  const query = filterText.trim().toLowerCase();
  if (!query) {
    return rows;
  }

  return rows.filter((row) => {
    const haystacks = [row.name, row.location, row.status].map(normalizeString);
    return haystacks.some((field) => field.includes(query));
  });
};

const getComparableValue = (value: unknown): number | string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number') {
    return value;
  }

  const asString = String(value);
  const parsedDate = Date.parse(asString);
  if (!Number.isNaN(parsedDate)) {
    return parsedDate;
  }

  const asNumber = Number(asString);
  if (!Number.isNaN(asNumber)) {
    return asNumber;
  }

  return asString.toLowerCase();
};

export const applySort = <TRow extends Record<string, unknown>>(
  rows: TRow[],
  sortKey: keyof TRow | null | undefined,
  sortDir: SortDirection = 'asc'
): TRow[] => {
  if (!sortKey) {
    return rows;
  }

  const direction = sortDir === 'asc' ? 1 : -1;

  return [...rows]
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      const aValue = getComparableValue(a.row[sortKey]);
      const bValue = getComparableValue(b.row[sortKey]);

      if (aValue < bValue) {
        return -1 * direction;
      }
      if (aValue > bValue) {
        return 1 * direction;
      }
      return a.index - b.index;
    })
    .map(({ row }) => row);
};

export const applyPagination = <TRow>(rows: TRow[], page: number, pageSize: number): TRow[] => {
  const safePage = Math.max(1, page);
  const safeSize = Math.max(1, pageSize);
  const end = safePage * safeSize;
  return rows.slice(0, end);
};

interface UseListStateOptions<TSortKey extends string> {
  initialSortKey?: TSortKey | null;
  initialSortDir?: SortDirection;
  initialPageSize?: number;
}

interface UseListState<TSortKey extends string> {
  page: number;
  pageSize: number;
  sortKey: TSortKey | null;
  sortDir: SortDirection;
  filterText: string;
  totalVisible: number;
  setFilterText: (text: string) => void;
  setSortKey: (key: TSortKey | null) => void;
  setSortDir: (dir: SortDirection) => void;
  toggleSortDir: () => void;
  setPageSize: (size: number) => void;
  loadMore: () => void;
  reset: () => void;
}

export const useListState = <TSortKey extends string>(
  options?: UseListStateOptions<TSortKey>
): UseListState<TSortKey> => {
  const { initialSortKey = null, initialSortDir = 'asc', initialPageSize = 10 } = options ?? {};
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [sortKey, setSortKeyState] = useState<TSortKey | null>(initialSortKey);
  const [sortDir, setSortDirState] = useState<SortDirection>(initialSortDir);
  const [filterText, setFilterTextState] = useState('');

  const setFilterText = useCallback((text: string) => {
    setFilterTextState(text);
    setPage(1);
  }, []);

  const setSortKey = useCallback((key: TSortKey | null) => {
    setSortKeyState(key);
    setPage(1);
  }, []);

  const setSortDir = useCallback((dir: SortDirection) => {
    setSortDirState(dir);
    setPage(1);
  }, []);

  const toggleSortDir = useCallback(() => {
    setSortDirState((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(Math.max(1, size));
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setPage(1);
    setPageSizeState(initialPageSize);
    setSortKeyState(initialSortKey);
    setSortDirState(initialSortDir);
    setFilterTextState('');
  }, [initialPageSize, initialSortDir, initialSortKey]);

  const totalVisible = useMemo(() => page * pageSize, [page, pageSize]);

  return {
    page,
    pageSize,
    sortKey,
    sortDir,
    filterText,
    totalVisible,
    setFilterText,
    setSortKey,
    setSortDir,
    toggleSortDir,
    setPageSize,
    loadMore,
    reset
  };
};
