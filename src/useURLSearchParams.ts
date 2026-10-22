export type Params = {
  q: string;
  amount: string;
};

export const useGetURLSearchParams = () => {
  const params = new URLSearchParams(window.location.search);

  const parsedParams: Partial<Params> = {};

  for (const [key, value] of params) {
    parsedParams[key as keyof Params] = value;
  }

  return parsedParams;
};

export const useWriteURLSearchParams = (newParams: Partial<Params>) => {
  const params = new URLSearchParams(newParams).toString();
  if (!!params) {
    window.history.replaceState(null, "", `?${params}`);
  }
};
