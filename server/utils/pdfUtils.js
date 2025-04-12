const { PDFDocument, rgb } = require('pdf-lib');

exports.generatePDFContent = async (bill) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont('Helvetica');
  const textColor = rgb(0, 0, 0);

  page.drawText('Bill Details', { x: 50, y: 750, font, size: 24, color: textColor });
  page.drawText(`Bill Name: ${bill.name}`, { x: 50, y: 700, font, size: 12, color: textColor });
  page.drawText(`Bill Number: ${bill.number}`, { x: 50, y: 680, font, size: 12, color: textColor });
  page.drawText(`Customer: ${bill.customer}`, { x: 50, y: 660, font, size: 12, color: textColor });
  page.drawText(`Delivery Date: ${bill.deliveryDate}`, { x: 50, y: 640, font, size: 12, color: textColor });
  page.drawText('Line Items:', { x: 50, y: 620, font, size: 12, color: textColor });

  let y = 600;
  bill.lineItems.forEach((item) => {
    page.drawText(`${item.itemName} - Quantity: ${item.quantity}, Price: ${item.price}`, {
      x: 50,
      y,
      font,
      size: 10,
      color: textColor,
    });
    y -= 20;
  });

  page.drawText(`Total Amount: ${bill.amount}`, { x: 50, y: y - 20, font, size: 12, color: textColor });

  return await pdfDoc.save();
};