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

    // Add title
    doc.setFontSize(22);
    doc.text('Invoice', 105, 20, { align: 'center' });

    // Add client and owner info in two columns
    doc.setFontSize(16);
    doc.text('Client Contact Info', 10, 40);
    doc.text('Owner Contact Info', 110, 40);

    doc.setFontSize(12);
    doc.text(`Name: ${data.clientInfo.name || 'N/A'}`, 10, 50);
    doc.text(`Name: ${data.ownerInfo.name || 'N/A'}`, 110, 50);

    doc.text(`Surname: ${data.clientInfo.surname || 'N/A'}`, 10, 55);
    doc.text(`Surname: ${data.ownerInfo.surname || 'N/A'}`, 110, 55);

    doc.text(`Number: ${data.clientInfo.number || 'N/A'}`, 10, 60);
    doc.text(`Number: ${data.ownerInfo.number || 'N/A'}`, 110, 60);

    doc.text(`Email: ${data.clientInfo.email || 'N/A'}`, 10, 65);
    doc.text(`Email: ${data.ownerInfo.email || 'N/A'}`, 110, 65);

    // Add products table
    const products = data.products.rows.map((row: any) => [
      row.description,
      row.price,
      row.quantity,
      row.amount,
    ]);

    autoTable(doc, {
      startY: 75,
      head: [['Description', 'Price', 'Quantity', 'Amount']],
      body: products,
    });

    // Add total
    const total = data.products.rows.reduce(
      (sum: number, row: any) => sum + row.amount,
      0,
    );
    doc.setFontSize(14);
    doc.text(`Total: ${total}`, 10, doc.lastAutoTable.finalY + 10);

    // Save the PDF
    doc.save('Invoice.pdf');
  }
}
