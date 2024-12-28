import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { OwnerInfoComponent } from './forms/owner-info/owner-info.component';
import { ClientInfoComponent } from './forms/client-info/client-info.component';
import { ProductsComponent } from './forms/products/products.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabel,
    OwnerInfoComponent,
    ClientInfoComponent,
    ProductsComponent,
    DatePickerModule,
    FileUploadModule,
    ButtonModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  uploadedFiles: any[] = [];
}
