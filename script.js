document.addEventListener('DOMContentLoaded', () => {
    const fullName = document.getElementById('fullName');
    const designation = document.getElementById('designation');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const skills = document.getElementById('skills');
    const languages = document.getElementById('languages');
    const experience = document.getElementById('experience');
    const education = document.getElementById('education');

    const cvName = document.getElementById('cvName');
    const cvDesignation = document.getElementById('cvDesignation');
    const cvEmail = document.getElementById('cvEmail');
    const cvPhone = document.getElementById('cvPhone');
    const cvAddress = document.getElementById('cvAddress');
    const cvSkills = document.getElementById('cvSkills');
    const cvLanguages = document.getElementById('cvLanguages');
    const cvExperience = document.getElementById('cvExperience');
    const cvEducation = document.getElementById('cvEducation');

    function updatePreview() {
        cvName.innerText = fullName.value || 'John Doe';
        cvDesignation.innerText = designation.value || 'Software Engineer';
        cvEmail.innerText = email.value || 'john.doe@example.com';
        cvPhone.innerText = phone.value || '+1 234 567 890';
        cvAddress.innerText = address.value || '123 Main St, City, Country';
        cvSkills.innerHTML = skills.value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
        cvLanguages.innerHTML = languages.value.split(',').map(lang => `<li>${lang.trim()}</li>`).join('');
        cvExperience.innerText = experience.value || 'No work experience provided.';
        cvEducation.innerText = education.value || 'No education details provided.';
    }

    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('cvPreview');
        const opt = {
            margin: 0,
            filename: 'CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    });
});
