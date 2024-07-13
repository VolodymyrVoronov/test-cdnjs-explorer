import { useQuery } from "@tanstack/react-query";

import { getPackage } from "../services/api";

export const usePackage = (name: string) => {
  const {
    isLoading,
    data: packageItem,
    error,
  } = useQuery({
    queryKey: ["package-item", `package-item-${name}`],
    queryFn: () => getPackage(name),
  });

  return { isLoading, packageItem, error };
};
