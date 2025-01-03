import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@components/input/input.component';
import { InputNumberComponent } from '@components/input-number/input-number.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
    InputComponent,
    InputNumberComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  form: FormGroup;
  total: number = 0.0;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: this.fb.array([this.createRow()]),
    });
  }

  createRow(): FormGroup {
    const row = this.fb.group({
      description: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required]),
      quantity: this.fb.control(0, [Validators.required]),
      amount: this.fb.control(0, [Validators.required]),
    });

    row.get('price')?.valueChanges.subscribe(() => this.updateAmount(row));
    row.get('quantity')?.valueChanges.subscribe(() => this.updateAmount(row));

    return row;
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  addRow(): void {
    this.rows.push(this.createRow());
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  private updateAmount(row: FormGroup): void {
    const price = row.get('price')?.value || 0;
    const quantity = row.get('quantity')?.value || 0;
    const amount = price * quantity;
    row.get('amount')?.setValue(amount, { emitEvent: false });
    this.updateTotal();
  }

  private updateTotal(): void {
    this.total = this.rows.controls.reduce((sum: any, row: any) => {
      const amount = row.get('amount')?.value || 0;
      return sum + amount;
    }, 0);
  }
}
