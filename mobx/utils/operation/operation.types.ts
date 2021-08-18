export interface Operation {
  id: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  args?: any;
}
