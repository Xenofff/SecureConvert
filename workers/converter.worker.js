// Web Worker: heavy image conversions (image -> image) using OffscreenCanvas
self.onmessage = async function(e){
  const msg = e.data;
  if(!msg || !msg.action) return;
  if(msg.action === 'imageConvert'){
    const blob = msg.blob;
    const targetMime = msg.targetMime || 'image/png';
    const quality = (typeof msg.quality === 'number') ? msg.quality : 0.92;
    const id = msg.id || 'worker';
    try {
      const imageBitmap = await createImageBitmap(blob);
      const w = imageBitmap.width;
      const h = imageBitmap.height;
      const off = new OffscreenCanvas(w, h);
      const ctx = off.getContext('2d');
      ctx.drawImage(imageBitmap, 0, 0);
      const convertedBlob = await off.convertToBlob({ type: targetMime, quality: quality });
      self.postMessage({ id, blob: convertedBlob }, [ convertedBlob ]);
    } catch(err){
      self.postMessage({ id, error: err && err.message ? err.message : String(err) });
    }
  }
};
