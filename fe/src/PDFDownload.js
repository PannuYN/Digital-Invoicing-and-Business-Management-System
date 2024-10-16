import React from 'react';
import jsPDF from 'jspdf';
class PDFDownload extends React.Component {
 downloadPDF = async () => {
   try {
     const response = await fetch('InvoiceForm.js'); // Fetch the JavaScript file
     const jsFileContent = await response.text(); // Get the content of the JavaScript file
     const doc = new jsPDF();
     doc.text(jsFileContent, 10, 10); // Render the JavaScript file content
     doc.save('downloaded_file.pdf'); // Save the PDF
   } catch (error) {
     console.error('Error downloading PDF:', error);
   }
 };
 render() {
   return (
<div>
<button onClick={this.downloadPDF}>Download PDF</button>
</div>
   );
 }
}
export default PDFDownload;