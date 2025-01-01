import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [FloatLabel, ReactiveFormsModule, InputNumberModule],
  templateUrl: './input-number.component.html',
})
export class InputNumberComponent {
  @Input() isReadonly: boolean = false;
  @Input() isCurrency: boolean = false;
  @Input() showButtons: boolean = false;
  @Input() control!: FormControl;
  @Input() minValue: number = 0;
  @Input() maxValue: number = 0;
  @Input() labelText: string = '';
}
