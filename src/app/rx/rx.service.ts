import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RxService {
  constructor(private http: HttpClient) {}

  getInteractions(rxcui: string) {
    const safe = encodeURIComponent(rxcui.trim());
    return this.http.get<any>(`${environment.apiBase}/rxnav/interactions/${safe}`);
  }
}
