import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PrescriptionDTO {
  id?: number;
  prescriptionDate: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  diagnosis?: string;
  medicines?: string;
  nextVisitDate?: string | null;
}

interface ApiResponse<T> { success:boolean; message:string; obj:T; count?:number; id?:number; }

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  base = `${environment.apiBase}/prescriptions`;
  constructor(private http: HttpClient) {}

  list(startDate?: string, endDate?: string, page=0, size=10){
    let params = new HttpParams().set('page', page).set('size', size);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this.http.get<ApiResponse<PrescriptionDTO[]>>(`${this.base}/list`, { params });
  }
  getById(id: number){ return this.http.get<ApiResponse<PrescriptionDTO>>(`${this.base}/${id}`); }
  create(dto: PrescriptionDTO){ return this.http.post<ApiResponse<PrescriptionDTO>>(`${this.base}/create`, dto); }
  update(id: number, dto: PrescriptionDTO){ return this.http.put<ApiResponse<PrescriptionDTO>>(`${this.base}/${id}`, dto); }
  delete(id: number){ return this.http.delete<ApiResponse<number>>(`${this.base}/${id}`); }
}
