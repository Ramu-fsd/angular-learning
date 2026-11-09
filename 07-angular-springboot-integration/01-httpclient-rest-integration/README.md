# HttpClient and REST integration

Keep HTTP calls in injectable API services rather than embedding URLs and request logic throughout components.

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  fullName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/customers';

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  create(request: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, request);
  }

  update(id: number, request: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

Enable HttpClient in standalone applications with `provideHttpClient()` in application providers.

## Exercises

- Add customer lookup by ID.
- Add account endpoints.
- Model API errors explicitly.
- Add unit tests using Angular's HTTP testing utilities.
