import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-owner-info',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, InputComponent],
  templateUrl: './owner-info.component.html',
})
export class OwnerInfoComponent {
  ownerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.ownerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      number: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
