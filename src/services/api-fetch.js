import { baseUrl, tokenKey } from "../constants";

export async function apiFetch(endopoint, { method, headers, body } = {}) {
  const token = localStorage.getItem(tokenKey);

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  if (body) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  const options = {
    method: method || (body ? "POST" : "GET"),
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  //llamado a la API
  const response = await fetch(baseUrl + endopoint, options);

  if (response.status === 401) {
    localStorage.removeItem(tokenKey);
    location.assign(location);
    return;
  }

  // Manejar respuesta exitosa
  if (response.ok) {
    // Verificar si la respuesta tiene contenido antes de intentar analizarla
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return null; // No hay JSON en la respuesta
  }

  // Manejo de respuesta de error
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const errorData = await response.json();
    const error =
      errorData.errors instanceof Array
        ? errorData.errors.join(", ")
        : errorData.errors;
    return Promise.reject(new Error(error));
  } else {
    return Promise.reject(new Error("Unexpected response format"));
  }
}
