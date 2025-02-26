import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoanService } from '../../services/loan-service/loan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [CommonModule, ChartModule, ProgressBarModule],
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  pieChartData = {
    labels: ['Current', 'Fully Paid', 'Failure', 'Defaulter', 'Issued'],
    datasets: [
      {
        data: [68.52, 23.63, 5.32, 1.57, 0.95], // Ejemplo de datos
      },
    ],
  };

  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Variables para las probabilidades (en porcentaje)
  currentProbability: number = 0;
  fullyPaidProbability: number = 0;
  chargedOffProbability: number = 0;
  late31_120Probability: number = 0;
  inGracePeriodProbability: number = 0;
  late16_30Probability: number = 0;
  issuedProbability: number = 0;
  defaultProbability: number = 0;
  creditPolicyFullyPaidProbability: number = 0;
  creditPolicyChargedOffProbability: number = 0;

  // Variables adicionales del backend
  score: number = 0;
  riskCategory: string = '';
  mostLikelyClass: string = '';

  private subscriptions: Subscription[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    // Suscribirse a las probabilidades individuales (multiplicamos por 100 para mostrar porcentajes)
    this.subscriptions.push(
      this.loanService.probabilityCurrent$.subscribe((data) => {
        this.currentProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityFullyPaid$.subscribe((data) => {
        this.fullyPaidProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityChargedOff$.subscribe((data) => {
        this.chargedOffProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityLate31_120$.subscribe((data) => {
        this.late31_120Probability = (data || 0) * 100;
      }),
      this.loanService.probabilityInGracePeriod$.subscribe((data) => {
        this.inGracePeriodProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityLate16_30$.subscribe((data) => {
        this.late16_30Probability = (data || 0) * 100;
      }),
      this.loanService.probabilityIssued$.subscribe((data) => {
        this.issuedProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityDefault$.subscribe((data) => {
        this.defaultProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityCreditPolicyFullyPaid$.subscribe((data) => {
        this.creditPolicyFullyPaidProbability = (data || 0) * 100;
      }),
      this.loanService.probabilityCreditPolicyChargedOff$.subscribe((data) => {
        this.creditPolicyChargedOffProbability = (data || 0) * 100;
      }),
      // Suscripciones adicionales para score, risk category y most likely class
      this.loanService.score$.subscribe((data) => (this.score = data || 0)),
      this.loanService.riskCategory$.subscribe(
        (data) => (this.riskCategory = data || '')
      ),
      this.loanService.mostLikelyClass$.subscribe(
        (data) => (this.mostLikelyClass = data || '')
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
