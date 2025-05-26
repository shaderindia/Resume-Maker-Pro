# Elite Resume Builder

Elite Resume Builder is a web application that allows users to create professional resumes effortlessly. The app offers customization options, including profile photo cropping, dynamic form fields, and high-quality exports in JPG and PNG formats. It ensures that the generated resume fits perfectly on an A4-sized layout.

## Features

- **Dynamic Resume Form**: Collects user details such as personal information, skills, education, experience, and more.
- **Profile Photo Cropping**: Allows users to upload and crop their profile photo with an easy-to-use interface.
- **A4-Optimized Layout**: Ensures the generated resumes fit perfectly on A4-sized dimensions.
- **High-Quality Exports**: Download resumes in either JPG or PNG format with options for high or normal quality.
- **Local Storage Support**: Save and load resume data directly in the browser's local storage.
- **Interactive Design**: Built with modern UI components for a seamless experience.
- **Responsive Design**: Fully responsive and works well on both desktop and mobile devices.

## Tech Stack

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Font Awesome](https://fontawesome.com/) for icons
  - [Cropper.js](https://fengyuanchen.github.io/cropperjs/) for image cropping
  - [html2canvas](https://html2canvas.hertzen.com/) for generating images
- **Build Tools**:
  - [jsPDF](https://github.com/parallax/jsPDF) for PDF handling (optional, if used in earlier versions)

## How to Use

1. **Fill Out the Form**: Enter your details into the form fields, including personal information, skills, education, and work experience.
2. **Upload and Crop Photo**:
   - Click on the profile photo area.
   - Upload a photo and crop it using the cropping tool.
3. **Generate Resume**:
   - Click the **Generate Resume** button to preview your resume.
   - The resume will be displayed in a perfectly formatted A4 layout.
4. **Download Resume**:
   - Choose between **JPG** or **PNG** formats.
   - Select **High Quality** for higher resolution (up to 5MB) or **Normal Quality** for smaller file sizes.
5. **Save/Load Data**:
   - Save your progress to local storage and reload it later for further editing.

## Installation

No setup or installation is required. Simply open the `index.html` file in your browser to get started.

## File Structure

```plaintext
├── index.html          # The main HTML file
├── style.css           # Optional: External CSS file if used
├── script.js           # Main JavaScript logic
├── assets/             # Folder for images or other static assets
├── README.md           # Project documentation
├── cropper.min.css     # Cropper.js styles
├── cropper.min.js      # Cropper.js library
├── html2canvas.min.js  # HTML to Canvas library
└── tailwind.css        # Tailwind CSS (via CDN or local build)
