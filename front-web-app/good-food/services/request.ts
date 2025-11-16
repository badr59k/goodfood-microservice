type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

const PUBLIC_ROUTES = ["/api/auth/login", "/api/auth/register"];

function isPublic(url: string) {
  return PUBLIC_ROUTES.some((u) => url.includes(u));
}

export async function http<T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const fullUrl = `localhost:8081${url}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  if (!isPublic(url)) {
    const token = "";
    headers.Autorization = `Bearer ${token}`;
  }

  const resultat = await fetch(fullUrl, {
    method: options.method ?? "GET",
    headers,
    body: options.body,
    signal: options.signal,
    cache: "no-store",
  });

  if (!resultat.ok) {
    const textError = await resultat.text();
    throw new Error(textError);
  }

  try {
    return (await resultat.json()) as T;
  } catch {
    return undefined as T;
  }
}

export const get = <T = unknown>(url: string, options: RequestOptions = {}) =>
  http<T>(url, { ...options, method: "GET" });

export const post = <T = unknown>(
  url: string,
  body?: unknown,
  options: RequestOptions = {}
) =>
  http<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });
