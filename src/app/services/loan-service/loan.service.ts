import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  // Variables observables para cada clave del JSON
  private pagadosSubject = new BehaviorSubject<any>(null);
  private activosSubject = new BehaviorSubject<any>(null);
  private incumplidosSubject = new BehaviorSubject<any>(null);
  private morososSubject = new BehaviorSubject<any>(null);
  private emitidosSubject = new BehaviorSubject<any>(null);
  private scoreSubject = new BehaviorSubject<any>(null);

  // Exponiendo como observables
  pagados$ = this.pagadosSubject.asObservable();
  activos$ = this.activosSubject.asObservable();
  incumplidos$ = this.incumplidosSubject.asObservable();
  morosos$ = this.morososSubject.asObservable();
  emitidos$ = this.emitidosSubject.asObservable();
  score$ = this.scoreSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para enviar datos al endpoint y actualizar las variables observables
  submitLoanData(loanData: any) {
    let endpoint = process.env['BACK_URL'] || 'http://127.0.0.1:4321' ;
    endpoint += '/api/get-score';

    this.http.post<any>(endpoint, loanData).subscribe({
      next: (response) => {
        // Actualiza las variables observables con las claves del JSON recibido
        let jsonResponse =
          typeof response === 'string' ? JSON.parse(response) : response;

        console.log(jsonResponse);
        // Actualiza las variables observables con las claves del JSON recibido
        this.pagadosSubject.next(jsonResponse.Pagados);
        this.activosSubject.next(jsonResponse.Activos);
        this.incumplidosSubject.next(jsonResponse.Incumplidos);
        this.morososSubject.next(jsonResponse.Morosos);
        this.emitidosSubject.next(jsonResponse.Emitidos);
        this.scoreSubject.next(jsonResponse.score);

        // Console logs para verificar las actualizaciones
        console.log('pagados actualizado:', jsonResponse.Pagados);
        console.log('activos actualizado:', jsonResponse.Activos);
        console.log('incumplidos actualizado:', jsonResponse.Incumplidos);
        console.log('morosos actualizado:', jsonResponse.Morosos);
        console.log('emitidos actualizado:', jsonResponse.Emitidos);
        console.log('score actualizado:', jsonResponse.score);
      },

      error: (error) => {
        console.error('Error al enviar datos del préstamo:', error);
        // En caso de error, resetea los valores de las variables observables
        this.pagadosSubject.next(null);
        this.activosSubject.next(null);
        this.incumplidosSubject.next(null);
        this.morososSubject.next(null);
        this.emitidosSubject.next(null);
        this.scoreSubject.next(null);
      },
    });
  }
}
