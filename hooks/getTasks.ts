import useSWR, { useSWRConfig } from 'swr';

import { TTaskList } from '../types/types';
import fetcher from '../utils/fetcher';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const GetTasks = () => {
  const { data, error } = useSWR<TTaskList>(TODOS_URL, fetcher);
  const { mutate } = useSWRConfig();

  return {
    tasks: data,
    isLoading: !error && !data,
    isError: error,
    refetch: () => mutate(TODOS_URL),
  }
};

export default GetTasks;