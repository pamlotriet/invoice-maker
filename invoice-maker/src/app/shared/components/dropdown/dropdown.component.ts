import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FloatLabel, ReactiveFormsModule, SelectModule],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() control!: FormControl;
  @Input() options: any[] = [];
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
}
