import ky from "ky";


export interface APIError {
  status: number;
  message: string;
  data?: any;
}


export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}


const prefixUrl = import.meta.env.VITE_API_URL;


export const api = ky.extend({
  prefixUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;

        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { detail: response.statusText };
        }

        const customError: APIError = {
          status: response.status,
          data: errorData,
          message: errorData.detail || "Erro inesperado",
        };

        return Object.assign(error, { customError });
      },
    ],
  },
});


export const authApi = api.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});


export class BaseAPI {
  protected resource: string;
  protected client = api;

  constructor(resource: string, useAuth = false) {
    this.resource = resource;
    if (useAuth) {
      this.client = authApi;
    }
  }

  protected url(path?: string, withSlash = true) {
    const base = path ? `${this.resource}/${path}` : this.resource;
    return withSlash ? `${base}/` : base;
  }

  async list<T>(params?: Record<string, string>) {
    return this.client
      .get(this.url(), { searchParams: params })
      .json<PaginatedResponse<T>>();
  }

  async detail<T>(id: string | number) {
    return this.client.get(this.url(id.toString())).json<T>();
  }

  async create<TData, TResponse>(data: TData) {
    return this.client.post(this.url(), { json: data }).json<TResponse>();
  }

  async update<TData, TResponse>(id: string | number, data: TData) {
    return this.client.put(this.url(id.toString()), { json: data }).json<TResponse>();
  }

  async delete(id: string | number) {
    return this.client.delete(this.url(id.toString()));
  }


  async safeRequest<T>(fn: () => Promise<T>): Promise<[T | null, APIError | null]> {
    try {
      const data = await fn();
      return [data, null];
    } catch (err: any) {
      return [
        null,
        err.customError ?? { status: 500, message: "Erro desconhecido" },
      ];
    }
  }
}


export interface User {
  id: number;
  name: string;
  email: string;
}

class UsersAPI extends BaseAPI {
  constructor() {
    super("users", true);
  }

  async activateUser(id: number) {
    return this.client.post(this.url(`${id}/activate`)).json<{ success: boolean }>();
  }
}

export const usersApi = new UsersAPI();
