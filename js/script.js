/**
 * Sincroniza en tiempo real los valores de los inputs del formulario
 * con las secciones correspondientes de la vista previa del CV.
 */
function updateCV() {
    document.getElementById('cv-name').innerText = document.getElementById('input-name').value;
    document.getElementById('cv-title').innerText = document.getElementById('input-title').value;
    document.getElementById('cv-email').innerText = document.getElementById('input-email').value;
    document.getElementById('cv-phone').innerText = document.getElementById('input-phone').value;
    document.getElementById('cv-location').innerText = document.getElementById('input-location').value;
    
    document.getElementById('cv-profile').innerText = document.getElementById('input-profile').value;
    document.getElementById('cv-experience').innerText = document.getElementById('input-experience').value;
    document.getElementById('cv-education').innerText = document.getElementById('input-education').value;
    document.getElementById('cv-skills').innerText = document.getElementById('input-skills').value;
}

/**
 * Captura exclusivamente el contenedor del diseño del CV,
 * lo procesa y fuerza la descarga en formato PDF (Tamaño A4).
 */
function downloadPDF() {
    const element = document.getElementById('cv-template');
    
    // Generar un nombre de archivo limpio basado en el nombre del usuario
    const usuarioNombre = document.getElementById('input-name').value.trim();
    const nombreArchivo = (usuarioNombre ? usuarioNombre.replace(/\s+/g, '_') : 'Curriculum') + '_CV.pdf';
    
    // Configuración óptima para impresión/descarga A4 profesional
    const opciones = {
        margin:       15,
        filename:     nombreArchivo,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Ejecución de la librería externa html2pdf
    html2pdf().set(opciones).from(element).save();
}