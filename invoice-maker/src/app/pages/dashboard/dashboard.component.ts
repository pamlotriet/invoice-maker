import { Component, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { OwnerInfoComponent } from './forms/owner-info/owner-info.component';
import { ClientInfoComponent } from './forms/client-info/client-info.component';
import { ProductsComponent } from './forms/products/products.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InvoiceService } from '@app/shared/services/pdf-service.service';

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
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @ViewChild(OwnerInfoComponent) ownerInfoComponent!: OwnerInfoComponent;
  @ViewChild(ClientInfoComponent) clientInfoComponent!: ClientInfoComponent;
  @ViewChild(ProductsComponent) productsComponent!: ProductsComponent;

  uploadedFiles: any[] = [];
  parentForm!: FormGroup;

  invoiceService = inject(InvoiceService);

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.parentForm = this.fb.group({
      dateCreated: new FormControl(),
    });
  }

  onSubmit(): void {
    debugger
    const ownerFormValue = this.ownerInfoComponent?.ownerForm.value;
    const clientFormValue = this.clientInfoComponent?.clientForm.value;
    const productsFormValue = this.productsComponent?.form.value;

    const finalFormValue = {
      ...this.parentForm.value,
      ownerInfo: ownerFormValue,
      clientInfo: clientFormValue,
      products: productsFormValue,
    };

    this.invoiceService.generateInvoice(finalFormValue);

    console.log('Final Form Data:', finalFormValue);
  }
}
