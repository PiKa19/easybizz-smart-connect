import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Generic hook for API calls with loading, error handling, and caching
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = [],
  options: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    successMessage?: string;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const {
    immediate = true,
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation completed successfully'
  } = options;

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (showSuccessToast) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      
      if (onError) {
        onError(error);
      }
      
      if (showErrorToast) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  };
}

// Hook for paginated API calls
export function usePaginatedApi<T>(
  apiCall: (params: { page: number; per_page: number; [key: string]: any }) => Promise<{
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
  }>,
  initialParams: { page?: number; per_page?: number; [key: string]: any } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchData = async (params: typeof initialParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...initialParams,
        ...params,
      };
      
      const result = await apiCall(mergedParams);
      
      setData(result.data);
      setPagination({
        current_page: result.current_page,
        last_page: result.last_page,
        total: result.total,
        per_page: mergedParams.per_page,
      });
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    setPagination(prev => ({ ...prev, current_page: page }));
    fetchData({ page });
  };

  const nextPage = () => {
    if (pagination.current_page < pagination.last_page) {
      goToPage(pagination.current_page + 1);
    }
  };

  const prevPage = () => {
    if (pagination.current_page > 1) {
      goToPage(pagination.current_page - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchData,
    goToPage,
    nextPage,
    prevPage,
  };
}

// Hook for mutations (POST, PUT, DELETE operations)
export function useMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    successMessage?: string;
  } = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = true,
    successMessage = 'Operation completed successfully'
  } = options;

  const mutate = async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await mutationFn(variables);
      
      if (onSuccess) {
        onSuccess(result, variables);
      }
      
      if (showSuccessToast) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      
      if (onError) {
        onError(error, variables);
      }
      
      if (showErrorToast) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error,
  };
}