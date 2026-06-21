// Valores iniciales por defecto si el almacenamiento está vacío
const defaultData = {
    name: "Juan Pérez",
    title: "Desarrollador Web Front-End",
    email: "juan.perez@email.com",
    phone: "+123 456 789",
    location: "Madrid, España",
    profile: "Profesional proactivo con experiencia en la creación de soluciones web interactivas y optimizadas. Apasionado por el código limpio y el diseño UX/UI.",
    experience: "• Desarrollador Senior en Tech Solutions (2023 - Presente)\nLideré el desarrollo de la nueva plataforma e-commerce aumentando las ventas en un 20%.\n\n• Desarrollador Junior en Web Agency (2021 - 2023)\nMantenimiento de aplicaciones críticas.",
    education: "• Grado en Ingeniería Informática\nUniversidad Tecnológica (2017 - 2021)",
    skills: "HTML5, CSS3, JavaScript, React, Git, Trabajo en equipo, Resolución de problemas."
};

// 1. COMPORTAMIENTO PARA PANEL DE EDICIÓN (container.html)
if (document.getElementById('input-name')) {
    const inputs = {
        name: document.getElementById('input-name'),
        title: document.getElementById('input-title'),
        email: document.getElementById('input-email'),
        phone: document.getElementById('input-phone'),
        location: document.getElementById('input-location'),
        profile: document.getElementById('input-profile'),
        experience: document.getElementById('input-experience'),
        education: document.getElementById('input-education'),
        skills: document.getElementById('input-skills')
    };

    // Cargar datos guardados previamente en los campos de texto
    const savedData = JSON.parse(localStorage.getItem('cv_data')) || defaultData;
    Object.keys(inputs).forEach(key => {
        if (inputs[key] && savedData[key]) {
            inputs[key].value = savedData[key];
        }
        
        // Escuchar cambios en tiempo real y guardar en localStorage
        inputs[key].addEventListener('input', () => {
            const currentData = {};
            Object.keys(inputs).forEach(k => currentData[k] = inputs[k].value);
            localStorage.setItem('cv_data', JSON.stringify(currentData));
        });
    });
}

// 2. COMPORTAMIENTO PARA LA VISTA PREVIA (index.html)
if (document.getElementById('cv-name')) {
    const savedData = JSON.parse(localStorage.getItem('cv_data')) || defaultData;
    
    document.getElementById('cv-name').innerText = savedData.name;
    document.getElementById('cv-title').innerText = savedData.title;
    document.getElementById('cv-email').innerText = savedData.email;
    document.getElementById('cv-phone').innerText = savedData.phone;
    document.getElementById('cv-location').innerText = savedData.location;
    document.getElementById('cv-profile').innerText = savedData.profile;
    document.getElementById('cv-experience').innerText = savedData.experience;
    document.getElementById('cv-education').innerText = savedData.education;
    document.getElementById('cv-skills').innerText = savedData.skills;
}

// 3. FUNCIÓN DE DESCARGA PDF (index.html)
function downloadPDF() {
    const element = document.getElementById('cv-template');
    const nameText = document.getElementById('cv-name').innerText.trim();
    const filename = (nameText ? nameText.replace(/\s+/g, '_') : 'Curriculum') + '_CV.pdf';
    
    const opt = {
        margin:       15,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}