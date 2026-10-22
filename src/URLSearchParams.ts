export type Params = {
  q: string;
  amount: string;
};

export const getURLSearchParams = () => {
  const params = new URLSearchParams(window.location.search);

  const parsedParams: Partial<Params> = {};

  for (const [key, value] of params) {
    parsedParams[key as keyof Params] = value;
  }

  return parsedParams;
};

export const writeURLSearchParams = (newParams: Partial<Params>) => {
  const params = new URLSearchParams(newParams).toString();
  if (!!params) {
    window.history.replaceState(null, "", `?${params}`);
  }
};

export const getSizeOfSearchParameters = (existingParams: Partial<Params>) => {
  const params = new URLSearchParams(existingParams);
  return params.size;
};

export const appendParams = (
  newParams: Partial<Params>,
  param: string,
  value: string,
  handleChange: (key: string, value: string) => void,
) => {
  const params = new URLSearchParams(newParams);
  params.append(param, value);
  window.history.replaceState(null, "", `?${params}`);
  handleChange(param, value);
};

export const deleteAppendedParam = (
  newParams: Partial<Params>,
  paramToDelete: string,
  handleChange: React.Dispatch<React.SetStateAction<Partial<Params>>>,
) => {
  const params = new URLSearchParams(newParams);
  params.delete(paramToDelete);
  window.history.replaceState(null, "", `?${params}`);
  handleChange(getURLSearchParams());
};

export const getEntries = (newParams: Partial<Params>) => {
  const params = new URLSearchParams(newParams);
  let list = [];
  for (const [key, value] of params.entries()) {
    list.push({ [key]: value });
  }
  return list;
};

export const getForEach = (newParams: Partial<Params>) =>
  new URLSearchParams(newParams);

export const getParam = (paramToGet: string): string => {
  const res = new URLSearchParams(window.location.search);
  return res.get(paramToGet) ?? "Param does not exist";
};

export const clearParams = () => window.history.replaceState(null, "", "?");
