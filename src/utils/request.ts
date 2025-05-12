//посмотреть как правильно конкатенировать
const BASE_URL = 'https://norma.nomoreparties.space/api';

type TSuccessResponse<T> = {
  success: true;
} & T;

type TApiResponse<T> =
  | ({ success: true } & T)
  | { success: false; message: string };

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

const checkSuccess = async <T>(data: TApiResponse<T>): Promise<T> => {
  if (!data.success) {
    throw new Error(data.message || 'Неуспешный ответ от сервера');
  }

  return data as T;
};

type RequestOptions = RequestInit & {
  token?: string;
};

export const request = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  const headers: HeadersInit = new Headers();

  if (options && options.token) {
    headers.set('Authorization', options.token);
  }

  if (!options || (options.method !== 'GET' && !headers.has('Content-Type'))) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const json = await checkResponse<TApiResponse<T>>(res);
    return await checkSuccess(json);
  } catch (error) {
    console.error(`Ошибка в запросе ${endpoint}:`, error);
    return Promise.reject(error);
  }
};
