import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-info',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FloatLabel,ReactiveFormsModule],
  templateUrl: './owner-info.component.html',
})
export class OwnerInfoComponent {
  ownerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the form with default values and validators
  initializeForm(): void {
    this.ownerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      number: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
