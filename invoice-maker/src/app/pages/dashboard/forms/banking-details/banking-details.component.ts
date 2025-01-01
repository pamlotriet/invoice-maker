import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '@components/input/input.component';
import { DropdownComponent } from '@components/dropdown/dropdown.component';

@Component({
  selector: 'app-banking-details',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
    InputComponent,
    DropdownComponent,
  ],
  templateUrl: './banking-details.component.html',
})
export class BankingDetailsComponent {
  bankDetailsForm!: FormGroup;

  banks = [
    { name: 'ABSA', value: 'absa' },
    { name: 'Capitec Bank', value: 'capitec' },
    { name: 'First National Bank (FNB)', value: 'fnb' },
    { name: 'Nedbank', value: 'nedbank' },
    { name: 'Standard Bank', value: 'standard' },
    { name: 'Investec', value: 'investec' },
    { name: 'African Bank', value: 'african' },
    { name: 'TymeBank', value: 'tymebank' },
    { name: 'Discovery Bank', value: 'discovery' },
    { name: 'Bank Zero', value: 'bankzero' },
  ];

  accountTypes = [
    { name: 'Cheque', value: 'cheque' },
    { name: 'Savings', value: 'savings' },
    { name: 'Credit', value: 'credit' },
    { name: 'Current', value: 'current' },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.bankDetailsForm = this.fb.group({
      accountHolder: ['', [Validators.required, Validators.minLength(2)]],
      bankName: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      accountNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],

      branchCode: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],
    });
  }
}
