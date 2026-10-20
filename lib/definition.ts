/** Remove source list markers for display without changing the archived wording. */
export function displayDefinition(value: string | undefined): string {
  return (value ?? '').replace(/^\s*◦\s*(?:_\s+)?/, '').trim();
}
