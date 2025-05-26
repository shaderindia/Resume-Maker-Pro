// DOM Elements
const resumeForm = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
const resumeContent = document.getElementById('resume-content');
const downloadJpgBtn = document.getElementById('download-jpg');
const downloadPngBtn = document.getElementById('download-png');

// Form Submission and Resume Generation
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Populate Resume Content (Add your logic here)
    resumeOutput.classList.remove('hidden');
});

// Download Resume as JPG
downloadJpgBtn.addEventListener('click', () => {
    html2canvas(resumeContent, {
        scale: 2, // High resolution
        useCORS: true,
    }).then(canvas => {
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'resume.jpg';
            link.click();
        }, 'image/jpeg', 0.95); // Adjust quality for high resolution
    });
});

// Download Resume as PNG
downloadPngBtn.addEventListener('click', () => {
    html2canvas(resumeContent, {
        scale: 2, // High resolution
        useCORS: true,
    }).then(canvas => {
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'resume.png';
            link.click();
        }, 'image/png');
    });
});
