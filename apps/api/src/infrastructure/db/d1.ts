export type D1Result<T = unknown> = {
  results?: T[];
  success: boolean;
};

export type D1PreparedStatement = {
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
  run(): Promise<D1Result>;
};

export type D1Database = {
  prepare(query: string): D1PreparedStatement;
};
