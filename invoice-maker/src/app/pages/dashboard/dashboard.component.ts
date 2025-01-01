import { Component, inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { OwnerInfoComponent } from '@pages/dashboard/forms/owner-info/owner-info.component';
import { ClientInfoComponent } from '@pages/dashboard/forms//client-info/client-info.component';
import { ProductsComponent } from '@pages/dashboard/forms//products/products.component';
import { BankingDetailsComponent } from '@pages/dashboard/forms/banking-details/banking-details.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InvoiceService } from '@services/pdf-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabel,
    OwnerInfoComponent,
    ClientInfoComponent,
    ProductsComponent,
    DatePickerModule,
    FileUploadModule,
    ButtonModule,
    ReactiveFormsModule,
    BankingDetailsComponent,
  ],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @ViewChild(OwnerInfoComponent) ownerInfoComponent!: OwnerInfoComponent;
  @ViewChild(ClientInfoComponent) clientInfoComponent!: ClientInfoComponent;
  @ViewChild(ProductsComponent) productsComponent!: ProductsComponent;
  @ViewChild(BankingDetailsComponent)
  bankingDetailsComponent!: BankingDetailsComponent;

  uploadedFiles: any[] = [];
  uploadedLogoBase64: string = '';
  parentForm!: FormGroup;

  invoiceService = inject(InvoiceService);

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.createForm();
  }

  createForm() {
    this.parentForm = this.fb.group({
      dateCreated: new FormControl(Validators.required),
      logo: new FormControl(''),
    });
  }

  getFormattedDate(): string {
    const rawDate = this.parentForm.get('dateCreated')?.value;
    return this.datePipe.transform(rawDate, 'dd/MM/yy') || '';
  }

  onSubmit(): void {
    const ownerFormValue = this.ownerInfoComponent?.ownerForm.value;
    const clientFormValue = this.clientInfoComponent?.clientForm.value;
    const productsFormValue = this.productsComponent?.form.value;
    const bankingDetailsFormValue =
      this.bankingDetailsComponent?.bankDetailsForm.value;

    const formattedDate = this.getFormattedDate();

    this.parentForm.patchValue({
      dateCreated: formattedDate,
    });

    const finalFormValue = {
      ...this.parentForm.value,
      ownerInfo: ownerFormValue,
      clientInfo: clientFormValue,
      products: productsFormValue,
      bankingDetails: bankingDetailsFormValue,
    };

    this.invoiceService.generateInvoice(finalFormValue);
  }

  onLogoSelect(event: any): void {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.uploadedLogoBase64 = reader.result as string;
      this.parentForm.patchValue({
        logo: this.uploadedLogoBase64,
      });
    };

    reader.readAsDataURL(file);
  }

  isFormInvalid(): boolean {
    return (
      this.parentForm.invalid ||
      this.ownerInfoComponent?.ownerForm.invalid ||
      this.clientInfoComponent?.clientForm.invalid ||
      this.bankingDetailsComponent?.bankDetailsForm.invalid ||
      this.productsComponent?.form.invalid
    );
  }
}
