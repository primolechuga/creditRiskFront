import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoanService } from '../../services/loan-service/loan.service';
import { ScoreCardComponent } from '../scorecard/scorecard.component';

@Component({
  selector: 'loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ScoreCardComponent,
  ],
})
export class LoanFormComponent {
  loanFields = [
    { key: 'out_prncp', label: 'Outstanding Principal' },
    { key: 'out_prncp_inv', label: 'Outstanding Principal Invested' },
    { key: 'last_pymnt_amnt', label: 'Last Payment Amount' },
    { key: 'total_rec_prncp', label: 'Total Received Principal' },
    { key: 'total_pymnt', label: 'Total Payment' },
    { key: 'total_pymnt_inv', label: 'Total Payment Invested' },
    { key: 'recoveries', label: 'Recoveries' },
    { key: 'collection_recovery_fee', label: 'Collection Recovery Fee' },
    { key: 'funded_amnt', label: 'Funded Amount' },
    { key: 'total_rec_int', label: 'Total Received Interest' },
    { key: 'funded_amnt_inv', label: 'Funded Amount Invested' },
    { key: 'loan_amnt', label: 'Loan Amount' },
    { key: 'installment', label: 'Installment' },
    { key: 'total_rev_hi_lim', label: 'Total Revolving High Limit' },
    { key: 'tot_cur_bal', label: 'Total Current Balance' },
    { key: 'initial_list_status_w', label: 'Initial List Status W' },
    { key: 'int_rate', label: 'Interest Rate' },
    { key: 'dti', label: 'Debt-to-Income Ratio' },
    { key: 'revol_bal', label: 'Revolving Balance' },
    { key: 'revol_util', label: 'Revolving Utilization' },
  ];

  formData: { [key: string]: number } = {};

  constructor(private loanService: LoanService) {}

  onSubmit(form: any) {
    if (form.valid) {
      const orderedData = this.loanFields.reduce((acc, field) => {
        acc[field.key] = this.formData[field.key] || 0;
        return acc;
      }, {} as { [key: string]: number });

      console.log('Formulario enviado en orden específico:', orderedData);
      this.loanService.submitLoanData(orderedData);
    }
  }
}
