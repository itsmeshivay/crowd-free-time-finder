// src/components/PdfDownloadButton.jsx
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfDownloadButton = () => {
  const handleDownload = async () => {
    const reportElement = document.getElementById("report");

    if (!reportElement) {
      alert("❌ Report content not found.");
      return;
    }

    const canvas = await html2canvas(reportElement, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("crowd-report.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="download-btn"
    >
      📄 Download Report as PDF
    </button>
  );
};

export default PdfDownloadButton;
