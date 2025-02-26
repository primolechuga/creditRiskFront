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
      key: 'total_rev_hi_lim',
      label: 'Total Revolving High Limit',
      description: 'Total revolving high credit/credit limit.',
      defaultValue: 10000,
    },
    {
      key: 'tot_cur_bal',
      label: 'Total Current Balance',
      description: 'Total current balance of all accounts.',
      defaultValue: 100000,
    },
    {
      key: 'dti',
      label: 'Debt-to-Income Ratio',
      description: 'A unique LC assigned ID for the loan listing.',
      defaultValue: 19,
    },
    {
      key: 'revol_bal',
      label: 'Revolving Balance',
      description: 'Total credit revolving balance.',
      defaultValue: 0,
    },
    {
      key: 'months_until_2025',
      label: 'Months Until 2025',
      description:
        "The month the borrower's earliest reported credit line was opened.",
      defaultValue: 3,
    },
    {
      key: 'annual_inc',
      label: 'Annual Income',
      description:
        'The self-reported annual income provided by the borrower during registration.',
      defaultValue: 90,
    },
    {
      key: 'total_acc',
      label: 'Total Accounts',
      description:
        "The total number of credit lines currently in the borrower's credit file.",
      defaultValue: 12,
    },
    {
      key: 'open_acc',
      label: 'Open Accounts',
      description:
        "The total number of credit lines currently in the borrower's credit file.",
      defaultValue: 5,
    },
    {
      key: 'mths_since_last_delinq',
      label: 'Months Since Last Delinquency',
      description:
        "The number of months since the borrower's last delinquency.",
      defaultValue: 4,
    },
    {
      key: 'emp_length',
      label: 'Employment Length',
      description:
        'Employment length in years. Possible values are between 0 and 10 where 0 means less than one year and 10 means ten or more years.',
      defaultValue: 10,
    },
    {
      key: 'mths_since_last_major_derog',
      label: 'Months Since Last Major Derogatory',
      description: 'Months since most recent 90-day or worse rating.',
      defaultValue: 62,
    },
    {
      key: 'inq_last_6mths',
      label: 'Inquiries in Last 6 Months',
      description: 'Number of open trades in last 6 months.',
      defaultValue: 1,
    },
    {
      key: 'mths_since_last_record',
      label: 'Months Since Last Public Record',
      description: 'The number of months since the last public record.',
      defaultValue: 60,
    },
    {
      key: 'delinq_2yrs',
      label: 'Delinquencies in Last 2 Years',
      description:
        "The number of 30+ days past-due incidences of delinquency in the borrower's credit file for the past 2 years.",
      defaultValue: 0,
    },
    {
      key: 'pub_rec',
      label: 'Public Records',
      description: 'Number of derogatory public records.',
      defaultValue: 0,
    },
    {
      key: 'verification_status',
      label: 'Verification Status',
      description:
        "Verification status of the borrower: 'Not Verified' (0), 'Source Verified' (1), 'Verified' (2).",
      defaultValue: 2,
    },
    {
      key: 'home_ownership_MORTGAGE',
      label: 'Home Ownership MORTGAGE',
      description:
        'Indicates if the borrower has MORTGAGE as their home ownership status.',
      defaultValue: 1,
    },
    {
      key: 'home_ownership_RENT',
      label: 'Home Ownership RENT',
      description:
        'Indicates if the borrower has RENT as their home ownership status.',
      defaultValue: 0,
    },
    {
      key: 'purpose_credit_card',
      label: 'Purpose Credit Card',
      description:
        'A category provided by the borrower for the loan request indicating credit card.',
      defaultValue: 1,
    },
    {
      key: 'purpose_debt_consolidation',
      label: 'Purpose Debt Consolidation',
      description:
        'A category provided by the borrower for the loan request indicating debt consolidation.',
      defaultValue: 0,
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
