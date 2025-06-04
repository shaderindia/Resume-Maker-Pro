// Generate PDF from CV preview
function generatePDF() {
    const element = document.getElementById('cvPreview');
    const opt = {
        margin: [0, 0, 0, 0], // Remove all margins for A4 fit
        filename: `${formFields.fullName.value || 'my-cv'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    downloadBtn.disabled = true;

    // Generate and save the PDF
    html2pdf().from(element).set(opt).save().then(() => {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download CV';
        downloadBtn.disabled = false;
        showToast('CV downloaded successfully!');
    });
}
