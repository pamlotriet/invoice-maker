import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from "@components/input/input.component";

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [ButtonModule, InputTextModule,  ReactiveFormsModule, InputComponent],
  templateUrl: './client-info.component.html',
})
export class ClientInfoComponent {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.clientForm = this.fb.group({
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
