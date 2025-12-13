type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

const PUBLIC_ROUTES = ["/login", "/register"];

function isPublic(url: string) {
  return PUBLIC_ROUTES.some((u) => url.includes(u));
}

export async function http<T = unknown>(
  url: string,
  options: RequestOptions = {},
  service: string
): Promise<T> {
  const fullUrl = `http://10.0.2.2/api/${service}/${url}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  console.log(fullUrl);
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
    console.log(textError);
    throw new Error(textError);
  }

  try {
    return (await resultat.json()) as T;
  } catch {
    return undefined as T;
  }
}

export const get = <T = unknown>(
  url: string,
  service: string,
  options: RequestOptions = {}
) => http<T>(url, { ...options, method: "GET" }, service);

export const post = <T = unknown>(
  url: string,
  service: string,
  body?: unknown,
  options: RequestOptions = {}
) =>
  http<T>(
    url,
    {
      ...options,
      method: "POST",
      body: JSON.stringify(body ?? {}),
    },
    service
  );
