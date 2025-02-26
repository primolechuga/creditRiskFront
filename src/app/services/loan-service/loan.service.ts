import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  // Variables observables para los datos principales
  private scoreSubject = new BehaviorSubject<any>(null);
  private riskCategorySubject = new BehaviorSubject<any>(null);
  private mostLikelyClassSubject = new BehaviorSubject<any>(null);

  // Variables observables para cada probabilidad individual
  private probabilityCurrentSubject = new BehaviorSubject<number | null>(null);
  private probabilityFullyPaidSubject = new BehaviorSubject<number | null>(
    null
  );
  private probabilityChargedOffSubject = new BehaviorSubject<number | null>(
    null
  );
  private probabilityLate31_120Subject = new BehaviorSubject<number | null>(
    null
  );
  private probabilityInGracePeriodSubject = new BehaviorSubject<number | null>(
    null
  );
  private probabilityLate16_30Subject = new BehaviorSubject<number | null>(
    null
  );
  private probabilityIssuedSubject = new BehaviorSubject<number | null>(null);
  private probabilityDefaultSubject = new BehaviorSubject<number | null>(null);
  private probabilityCreditPolicyFullyPaidSubject = new BehaviorSubject<
    number | null
  >(null);
  private probabilityCreditPolicyChargedOffSubject = new BehaviorSubject<
    number | null
  >(null);

  // Exponiendo los observables
  score$ = this.scoreSubject.asObservable();
  riskCategory$ = this.riskCategorySubject.asObservable();
  mostLikelyClass$ = this.mostLikelyClassSubject.asObservable();
  probabilityCurrent$ = this.probabilityCurrentSubject.asObservable();
  probabilityFullyPaid$ = this.probabilityFullyPaidSubject.asObservable();
  probabilityChargedOff$ = this.probabilityChargedOffSubject.asObservable();
  probabilityLate31_120$ = this.probabilityLate31_120Subject.asObservable();
  probabilityInGracePeriod$ =
    this.probabilityInGracePeriodSubject.asObservable();
  probabilityLate16_30$ = this.probabilityLate16_30Subject.asObservable();
  probabilityIssued$ = this.probabilityIssuedSubject.asObservable();
  probabilityDefault$ = this.probabilityDefaultSubject.asObservable();
  probabilityCreditPolicyFullyPaid$ =
    this.probabilityCreditPolicyFullyPaidSubject.asObservable();
  probabilityCreditPolicyChargedOff$ =
    this.probabilityCreditPolicyChargedOffSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para enviar datos al endpoint y actualizar las variables observables
  submitLoanData(loanData: any) {
    const endpoint = 'https://creditrisk.onrender.com/api/get-score';

    this.http.post<any>(endpoint, loanData).subscribe({
      next: (response) => {
        // Parseo de la respuesta en caso de ser una cadena JSON
        const jsonResponse =
          typeof response === 'string' ? JSON.parse(response) : response;
        console.log(jsonResponse);

        // Actualización de las variables principales
        this.scoreSubject.next(jsonResponse.score);
        this.riskCategorySubject.next(jsonResponse.risk_category);
        this.mostLikelyClassSubject.next(jsonResponse.most_likely_class);

        // Descomposición del subarreglo "probabilities" en variables individuales
        const probabilities = jsonResponse.probabilities;
        this.probabilityCurrentSubject.next(probabilities['Current']);
        this.probabilityFullyPaidSubject.next(probabilities['Fully Paid']);
        this.probabilityChargedOffSubject.next(probabilities['Charged Off']);
        this.probabilityLate31_120Subject.next(probabilities['Late (31-120)']);
        this.probabilityInGracePeriodSubject.next(
          probabilities['In Grace Period']
        );
        this.probabilityLate16_30Subject.next(probabilities['Late (16-30)']);
        this.probabilityIssuedSubject.next(probabilities['Issued']);
        this.probabilityDefaultSubject.next(probabilities['Default']);
        this.probabilityCreditPolicyFullyPaidSubject.next(
          probabilities['Does not meet the credit policy. Status: Fully Paid']
        );
        this.probabilityCreditPolicyChargedOffSubject.next(
          probabilities['Does not meet the credit policy. Status: Charged Off']
        );

        // Logs para verificar la actualización
        console.log('score actualizado:', jsonResponse.score);
        console.log('risk_category actualizado:', jsonResponse.risk_category);
        console.log(
          'most_likely_class actualizado:',
          jsonResponse.most_likely_class
        );
        console.log('Current actualizado:', probabilities['Current']);
        console.log('Fully Paid actualizado:', probabilities['Fully Paid']);
        console.log('Charged Off actualizado:', probabilities['Charged Off']);
        console.log(
          'Late (31-120) actualizado:',
          probabilities['Late (31-120)']
        );
        console.log(
          'In Grace Period actualizado:',
          probabilities['In Grace Period']
        );
        console.log('Late (16-30) actualizado:', probabilities['Late (16-30)']);
        console.log('Issued actualizado:', probabilities['Issued']);
        console.log('Default actualizado:', probabilities['Default']);
        console.log(
          'Does not meet the credit policy. Status: Fully Paid actualizado:',
          probabilities['Does not meet the credit policy. Status: Fully Paid']
        );
        console.log(
          'Does not meet the credit policy. Status: Charged Off actualizado:',
          probabilities['Does not meet the credit policy. Status: Charged Off']
        );
      },
      error: (error) => {
        console.error('Error al enviar datos del préstamo:', error);
        // Resetea todas las variables en caso de error
        this.scoreSubject.next(null);
        this.riskCategorySubject.next(null);
        this.mostLikelyClassSubject.next(null);
        this.probabilityCurrentSubject.next(null);
        this.probabilityFullyPaidSubject.next(null);
        this.probabilityChargedOffSubject.next(null);
        this.probabilityLate31_120Subject.next(null);
        this.probabilityInGracePeriodSubject.next(null);
        this.probabilityLate16_30Subject.next(null);
        this.probabilityIssuedSubject.next(null);
        this.probabilityDefaultSubject.next(null);
        this.probabilityCreditPolicyFullyPaidSubject.next(null);
        this.probabilityCreditPolicyChargedOffSubject.next(null);
      },
    });
  }
}
