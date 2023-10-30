import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function useQueryWrapper(queryArgs: QueryArgs) {
    return useQuery(queryArgs.queryKey, queryArgs.queryFunction, {
      onSuccess: (data: responseData) => {
        ////console.log("success")
        // queryClient.invalidateQueries(queryArgs.queryKey);
        // queryArgs.options?.onSuccess && queryArgs.options?.onSuccess(data);
      },
      onError: (error: any) => {
        ////console.log("error")
        queryArgs.options?.onError && queryArgs.options?.onError(error);
        ////console.log (error)
        // ** display error message in ui
      },
    });
  }

  function useMutateWrapper(mutationArgs: MutationArgs) {
    return useMutation({
      mutationFn: mutationArgs.mutationFunction,
      onSettled: () => queryClient.invalidateQueries(mutationArgs.mutationKey),
      onSuccess: () => {
        mutationArgs.options?.onSuccess && mutationArgs.options?.onSuccess();
      },
      onError: (error: any) => {
        mutationArgs.options?.onError && mutationArgs.options?.onError(error);
      },
    });
  }

  return { useQueryWrapper, useMutateWrapper };
}
