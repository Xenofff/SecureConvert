// PDF utilities (in-browser, using pdf.js and jsPDF)
export async function pdfToPng(pdfBlob, pageNumber=1){
  // Render first page to PNG using pdf.js
  const arrayBuffer = await pdfBlob.arrayBuffer();
  const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width; canvas.height = viewport.height;
  const renderContext = { canvasContext: context, viewport: viewport };
  await page.render(renderContext).promise;
  const blobOut = await new Promise((resolve)=> canvas.toBlob(resolve, 'image/png', 1));
  return blobOut;
}

export async function imageToPdfFromBlob(imageBlob){
  // Use jsPDF to embed the image into a single-page PDF and return as Blob
  const { jsPDF } = window.jspdf;
  // Convert image blob to data URL
  const dataUrl = await blobToDataURL(imageBlob);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  // Draw image to fit the page (roughly)
  pdf.addImage(dataUrl, 'PNG', 40, 40, 500, 700);
  const array = pdf.output('arraybuffer');
  return new Blob([array], { type: 'application/pdf' });
}

// helper to convert blob to data URL
function blobToDataURL(blob){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = ()=> resolve(reader.result);
    reader.onerror = reject; reader.readAsDataURL(blob);
  });
}
