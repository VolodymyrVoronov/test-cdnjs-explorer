import { useQuery } from "@tanstack/react-query";

import { getPackages } from "../services/api";

export const usePackages = () => {
  const {
    isLoading,
    data: packageItems,
    error,
  } = useQuery({
    queryKey: ["package-items"],
    queryFn: () => getPackages(),
  });

  return { isLoading, packageItems, error };
};
