import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import the plugin

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor() {}

  generateInvoice(data: any): void {
    const doc = new jsPDF();
    const invoiceNumber = this.generateInvoiceNumber();

    // Add logo if provided
    if (data.logo) {
      doc.addImage(data.logo, 'PNG', 10, 10, 50, 20); // Logo at (10, 10), width: 50, height: 20
    }

    // Add title, adjusted to account for the logo
    doc.setFontSize(36);
    doc.text('Invoice', 105, 40, { align: 'center' }); // Adjusted Y position to avoid overlap with the logo

    // Add client and owner details
    doc.setFontSize(8);
    doc.text(`${data.ownerInfo.name || 'N/A'}`, 10, 60);
    doc.text(`Name: ${data.clientInfo.name || 'N/A'}`, 110, 60);

    doc.text(`${data.ownerInfo.surname || 'N/A'}`, 10, 65);
    doc.text(`Surname: ${data.clientInfo.surname || 'N/A'}`, 110, 65);

    doc.text(`${data.ownerInfo.number || 'N/A'}`, 10, 70);
    doc.text(`Number: ${data.clientInfo.number || 'N/A'}`, 110, 70);

    doc.text(`${data.ownerInfo.email || 'N/A'}`, 10, 75);
    doc.text(`Email: ${data.clientInfo.email || 'N/A'}`, 110, 75);
    doc.text(`Invoice #: ${invoiceNumber || 'N/A'}`, 110, 80);
    doc.text(`Issue Date: ${data.dateCreated || 'N/A'}`, 110, 85);

    // Add products table
    const products = data.products.rows.map((row: any) => [
      row.description,
      row.price,
      row.quantity,
      row.amount,
    ]);

    const total = data.products.rows.reduce(
      (sum: number, row: any) => sum + row.amount,
      0,
    );

    const productDetails = data.products.rows.map((row: any) => [
      row.description,
      `R${row.price.toFixed(2)}`, // Format price with "R" prefix and 2 decimal places
      row.quantity,
      `R${row.amount.toFixed(2)}`, // Format amount with "R" prefix and 2 decimal places
    ]);

    autoTable(doc, {
      startY: 95,
      head: [['Description', 'Price', 'Quantity', 'Amount']],
      body: productDetails,
      foot: [['', '', 'Total:', `R${total.toFixed(2)}`]],
      headStyles: {
        fillColor: [200, 200, 200],
      },
      footStyles: {
        fillColor: [200, 200, 200],
      },
    });

    const tableEndY = doc.lastAutoTable.finalY + 10;

    // Add banking details after the table
    doc.setFontSize(10);
    doc.text('Banking Details', 10, tableEndY);
    doc.setFontSize(8);
    doc.text(
      `Account Holder: ${data.bankingDetails.accountHolder || 'N/A'}`,
      10,
      tableEndY + 10,
    );
    doc.text(
      `Bank: ${data.bankingDetails.bankName.name || 'N/A'}`,
      10,
      tableEndY + 15,
    );
    doc.text(
      `Account Type: ${data.bankingDetails.accountType.name || 'N/A'}`,
      10,
      tableEndY + 20,
    );
    doc.text(
      `Account Number: ${data.bankingDetails.accountNumber || 'N/A'}`,
      10,
      tableEndY + 25,
    );
    doc.text(
      `Branch Code: ${data.bankingDetails.branchCode || 'N/A'}`,
      10,
      tableEndY + 30,
    );

    // Add footer notes
    doc.setFontSize(8);
    doc.text(
      'Please use your invoice number last 3 digits as reference.',
      10,
      tableEndY + 45,
    );
    doc.text('Proof of payment to be sent to owner email.', 10, tableEndY + 50);
    doc.text('Thank you for your business.', 10, tableEndY + 55);

    // Save the PDF
    doc.save('Invoice.pdf');
  }

  generateInvoiceNumber(): string {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');

    return `INV-${year}${month}${day}-${hours}${minutes}${seconds}-${randomNumber}`;
  }
}
