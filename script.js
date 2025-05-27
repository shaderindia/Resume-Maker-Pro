
function updatePreview() {
  document.getElementById("namePreview").innerText = document.getElementById("nameInput").value;
  document.getElementById("titlePreview").innerText = document.getElementById("titleInput").value;
  document.getElementById("emailPreview").innerText = document.getElementById("emailInput").value;
  document.getElementById("phonePreview").innerText = document.getElementById("phoneInput").value;
  document.getElementById("addressPreview").innerText = document.getElementById("addressInput").value;
  document.getElementById("summaryPreview").innerText = document.getElementById("summaryInput").value;
  document.getElementById("declarationPreview").innerText = document.getElementById("declarationInput").value;

  let skills = document.getElementById("skillsInput").value.split(",");
  let skillsHTML = "";
  skills.forEach(skill => {
    if (skill.trim()) skillsHTML += `<li>${skill.trim()}</li>`;
  });
  document.getElementById("skillsPreview").innerHTML = skillsHTML;
}

async function downloadCV(quality) {
  const element = document.getElementById("cv");
  const format = document.getElementById("formatSelect").value;
  const scale = quality === 'high' ? 4 : 2;

  const canvas = await html2canvas(element, { scale });
  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  if (format === "pdf") {
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
