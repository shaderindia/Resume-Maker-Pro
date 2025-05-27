
async function downloadCV(quality) {
  const element = document.getElementById('cv');
  const format = document.getElementById('formatSelect').value;
  const scale = quality === 'high' ? 4 : 2;

  const canvas = await html2canvas(element, { scale });
  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  if (format === 'pdf') {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 210;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cv.pdf");
  } else {
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "cv." + format;
    link.click();
  }
}
