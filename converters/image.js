// Image conversion utilities (ESM)
export async function loadImageFromBlob(blob){
  return new Promise((resolve, reject)=>{
    const url = URL.createObjectURL(blob);
    const img = new Image(); img.onload = ()=>{ URL.revokeObjectURL(url); resolve(img); }; img.onerror = reject; img.src = url;
  });
}

export async function webpToPng(blob, quality=0.92){
  const img = await loadImageFromBlob(blob);
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height;
  const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
  const blobOut = await new Promise((resolve)=> canvas.toBlob(resolve, 'image/png', 1));
  // If input was already PNG, this still produces PNG; for uniformity we return a Blob
  return blobOut;
}

export async function toJpeg(blob, quality=0.92){
  const img = await loadImageFromBlob(blob);
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); ctx.drawImage(img,0,0);
  const blobOut = await new Promise((resolve)=> canvas.toBlob(resolve, 'image/jpeg', quality));
  return blobOut;
}

export async function pngToWebp(blob, quality=0.92){
  const img = await loadImageFromBlob(blob);
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); ctx.drawImage(img,0,0);
  const blobOut = await new Promise((resolve)=> canvas.toBlob(resolve, 'image/webp', quality));
  return blobOut;
}
