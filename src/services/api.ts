const URL = "https://api.cdnjs.com/libraries/";

export const getPackages = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

export const getPackage = async (name: string) => {
  const response = await fetch(URL + name);
  const data = await response.json();

  return data;
};
