import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoanService } from '../../services/loan-service/loan.service'; // Importa el servicio LoanService
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-card',
  standalone: true,
  imports: [CommonModule, ChartModule, ProgressBarModule],
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
})
export class ScoreCardComponent implements OnInit {
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

  failure: number = 0;
  current: number = 0;
  paid: number = 0;
  defaulter: number = 0;
  issued: number = 0;
  score: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.loanService.pagados$.subscribe(
        (data) => (this.paid = data * 100 || 0)
      ),
      this.loanService.activos$.subscribe(
        (data) => (this.current = data * 100 || 0)
      ),
      this.loanService.incumplidos$.subscribe(
        (data) => (this.failure = data * 100 || 0)
      ),
      this.loanService.morosos$.subscribe(
        (data) => (this.defaulter = data * 100 || 0)
      ),
      this.loanService.emitidos$.subscribe(
        (data) => (this.issued = data * 100 || 0)
      ),
      this.loanService.score$.subscribe((data) => (this.score = data || 0))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
