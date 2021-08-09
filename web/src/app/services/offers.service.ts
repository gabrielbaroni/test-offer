import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OffersService {

  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient
  ) { }


  getOffers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/offers`, { headers: this.headers });
  }

  getOffer(idOffer): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/offers/${idOffer}`, { headers: this.headers });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/offers`, data, { headers: this.headers });
  }

  update(idOffer: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/offers/${idOffer}`, data, { headers: this.headers });
  }

  delete(idOffer: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/offers/${idOffer}`, { headers: this.headers });
  }

  patchStatus(idOffer: number, status: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/offers/${idOffer}`, { status }, { headers: this.headers });
  }
}
