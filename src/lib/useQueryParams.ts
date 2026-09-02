import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryParam(
  key: string,
  defaultValue = "",
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) ?? defaultValue;

  const setValue = useCallback(
    (next: string) => {
      setSearchParams(
        (current) => {
          const params = new URLSearchParams(current);

          if (!next || next === defaultValue) {
            params.delete(key);
          } else {
            params.set(key, next);
          }

          return params;
        },
        { replace: true },
      );
    },
    [defaultValue, key, setSearchParams],
  );

  return [value, setValue];
}

export function useQueryParams(): [
  URLSearchParams,
  (update: (params: URLSearchParams) => void) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      setSearchParams(
        (current) => {
          const params = new URLSearchParams(current);
          update(params);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return [searchParams, updateParams];
}
