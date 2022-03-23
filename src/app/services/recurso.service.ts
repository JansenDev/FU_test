import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs';

const URL_BASE = `https://623a579d5f037c13621677b0.mockapi.io`;
const URL = `${URL_BASE}/mapa_recursos`;

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  constructor(private httpClient: HttpClient) {}

  findResourceMap(page = 0, limit = 5) {
    let start = page * limit;
    let end = (page + 1) * limit;

    return this.httpClient.get<any>(URL).pipe(
      map((resource) => {
        if (limit == 0) end = resource.length;

        let documents = resource.slice(start, end);
        let total_documents = resource.length;
        let total_pages = Math.trunc(total_documents / limit);

        return {
          limit,
          documents,
          page,
          total_documents,
          total_pages,
        };
      })
    );
  }

  getAllPeriods() {
    return this.findResourceMap(0, 0).pipe(
      map((data) => {
        return data.documents;
      })
    );
  }
}
