import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor(private http: HttpClient) { }

    sendEmail(data: { name: string; email: string; message: string }): Observable<any> {
        // Simulación local para evitar el error mientras resolvemos el ciclo
        return of({ success: true });
        // Descomenta y configura cuando tengas un endpoint real
        // const url = 'https://your-email-api-endpoint.com/send';
        // return this.http.post(url, data);
    }
}