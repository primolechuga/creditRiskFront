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
    {
      key: 'out_prncp',
      label: 'Outstanding Principal',
      description: 'Remaining balance of the loan that has not yet been paid.',
      defaultValue: 0.0,
    },
    {
      key: 'out_prncp_inv',
      label: 'Outstanding Principal Invested',
      description: 'Portion of the outstanding balance funded by investors.',
      defaultValue: 0.0,
    },
    {
      key: 'last_pymnt_amnt',
      label: 'Last Payment Amount',
      description: 'Amount of the last payment made by the borrower.',
      defaultValue: 171.62,
    },
    {
      key: 'total_rec_prncp',
      label: 'Total Received Principal',
      description: 'Total principal amount that has been repaid.',
      defaultValue: 5000.0,
    },
    {
      key: 'total_pymnt',
      label: 'Total Payment',
      description:
        'Total sum of all payments made, including principal and interest.',
      defaultValue: 5861.07141425,
    },
    {
      key: 'total_pymnt_inv',
      label: 'Total Payment Invested',
      description: 'Total payments received distributed to investors.',
      defaultValue: 5831.78,
    },
    {
      key: 'recoveries',
      label: 'Recoveries',
      description: 'Amount recovered from defaulted loans.',
      defaultValue: 0.0,
    },
    {
      key: 'collection_recovery_fee',
      label: 'Collection Recovery Fee',
      description: 'Fee charged for recovering delinquent debt.',
      defaultValue: 0.0,
    },
    {
      key: 'funded_amnt',
      label: 'Funded Amount',
      description: 'Total amount of the loan that was funded.',
      defaultValue: 5000.0,
    },
    {
      key: 'total_rec_int',
      label: 'Total Received Interest',
      description: 'Total interest received from the borrower.',
      defaultValue: 861.07,
    },
    {
      key: 'funded_amnt_inv',
      label: 'Funded Amount Invested',
      description: 'Amount funded directly by investors.',
      defaultValue: 4975.0,
    },
    {
      key: 'loan_amnt',
      label: 'Loan Amount',
      description: 'Original loan amount granted.',
      defaultValue: 5000.0,
    },
    {
      key: 'installment',
      label: 'Installment',
      description: 'Fixed monthly payment for the loan.',
      defaultValue: 162.87,
    },
    {
      key: 'total_rev_hi_lim',
      label: 'Total Revolving High Limit',
      description: 'Highest historical credit limit on revolving accounts.',
      defaultValue: 0,
    },
    {
      key: 'tot_cur_bal',
      label: 'Total Current Balance',
      description:
        "Sum of all current balances across the borrower's accounts.",
      defaultValue: 0,
    },
    {
      key: 'initial_list_status_w',
      label: 'Initial List Status W',
      description:
        'Initial listing status of the loan (indicates if it was listed on a secondary market).',
      defaultValue: 0,
    },
    {
      key: 'int_rate',
      label: 'Interest Rate',
      description: 'Interest rate applied to the loan.',
      defaultValue: 10.65,
    },
    {
      key: 'dti',
      label: 'Debt-to-Income Ratio',
      description: 'Percentage of income used for debt payments.',
      defaultValue: 27.65,
    },
    {
      key: 'revol_bal',
      label: 'Revolving Balance',
      description: 'Outstanding balance on revolving credit accounts.',
      defaultValue: 13648.0,
    },
    {
      key: 'revol_util',
      label: 'Revolving Utilization',
      description:
        'Percentage of revolving credit utilized compared to the available limit.',
      defaultValue: 83.7,
    },
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
