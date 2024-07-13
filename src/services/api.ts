import { REQUEST_ERROR, URL } from "../constants/constants";
import { IPackage, IPackages } from "../types/types";

export const getPackages = async (): Promise<IPackages> => {
  const response = await fetch(URL);
  const data = await response.json();

  if (data.error || data.status === REQUEST_ERROR) {
    throw new Error(data.message);
  }

  return data;
};

export const getPackage = async (name: string): Promise<IPackage> => {
  const response = await fetch(URL + name);
  const data = await response.json();

  if (data.error || data.status === REQUEST_ERROR) {
    throw new Error(data.message);
  }

  return data;
};
