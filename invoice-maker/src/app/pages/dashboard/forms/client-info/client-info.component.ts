import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FloatLabel],
  templateUrl: './client-info.component.html',
})
export class ClientInfoComponent {}
