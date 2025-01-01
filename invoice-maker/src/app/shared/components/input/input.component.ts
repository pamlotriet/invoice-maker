import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTextModule, FloatLabel, ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() labelText: string = '';
}
