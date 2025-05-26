// DOM Elements
const resumeForm = document.getElementById('resume-form');
const resumeOutput = document.getElementById('resume-output');
const resumeContent = document.getElementById('resume-content');
const downloadJpgBtn = document.getElementById('download-jpg');
const downloadPngBtn = document.getElementById('download-png');
const photoInput = document.getElementById('photo');

// Variable to hold selected photo
let uploadedPhoto = null;

// Handle Photo Upload
photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedPhoto = e.target.result; // Base64 string of the uploaded photo
        };
        reader.readAsDataURL(file);
    }
});

// Form Submission and Resume Generation
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const fullName = document.getElementById('full-name').value;
    const designation = document.getElementById('designation').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    // Populate resume content
    resumeContent.innerHTML = `
        <div class="text-center mb-4">
            ${uploadedPhoto ? `<img src="${uploadedPhoto}" alt="Profile Photo" class="w-24 h-24 rounded-full mx-auto mb-3">` : ''}
            <h1 class="text-3xl font-bold">${fullName}</h1>
            <p class="text-xl font-semibold">${designation}</p>
        </div>
        <div class="mb-4">
            <h2 class="font-bold text-lg">Contact Information</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>
        <div class="mb-4">
            <h2 class="font-bold text-lg">Skills</h2>
            <p>${skills}</p>
        </div>
        <div class="mb-4">
            <h2 class="font-bold text-lg">Experience</h2>
            <p>${experience}</p>
        </div>
        <div class="mb-4">
            <h2 class="font-bold text-lg">Education</h2>
            <p>${education}</p>
        </div>
    `;

    // Show resume output
    resumeOutput.classList.remove('hidden');
});

// Download Resume as JPG
downloadJpgBtn.addEventListener('click', () => {
    html2canvas(resumeContent, { scale: 2 }).then(canvas => {
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'resume.jpg';
            link.click();
        }, 'image/jpeg', 0.95);
    });
});

// Download Resume as PNG
downloadPngBtn.addEventListener('click', () => {
    html2canvas(resumeContent, { scale: 2 }).then(canvas => {
        canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'resume.png';
            link.click();
        }, 'image/png');
    });
});
