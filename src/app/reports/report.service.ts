import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface DayWiseReportDTO { day: string; count: number; }

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient){}
  dayCount(startDate?: string, endDate?: string){
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<DayWiseReportDTO[]>(`${environment.apiBase}/reports/day-count`, { params });
  }
}
