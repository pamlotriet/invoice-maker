import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: this.fb.array([this.createRow()]), // Initialize with one row
    });
    console.log(this.form);
  }

  // Create a new row
  createRow(): FormGroup {
    const row = this.fb.group({
      description: this.fb.control(''),
      price: this.fb.control(0),
      quantity: this.fb.control(0),
      amount: this.fb.control({ value: 0, disabled: true }),
    });

    // Automatically calculate the amount when price or quantity changes
    row.get('price')?.valueChanges.subscribe(() => this.updateAmount(row));
    row.get('quantity')?.valueChanges.subscribe(() => this.updateAmount(row));

    return row;
  }

  // Access rows in the FormArray
  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  // Add a new row
  addRow(): void {
    this.rows.push(this.createRow());
  }

  // Remove a row by index
  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  // Calculate the amount (price * quantity)
  private updateAmount(row: FormGroup): void {
    const price = row.get('price')?.value || 0;
    const quantity = row.get('quantity')?.value || 0;
    const amount = price * quantity;
    row.get('amount')?.setValue(amount, { emitEvent: false });
  }
}
