// Data conversion helpers (JSON <-> CSV) using PapaParse for CSV parsing
export function jsonToCsv(json){
  if(!Array.isArray(json) || json.length===0) return '';
  const headers = Object.keys(json[0]);
  const lines = [headers.join(',')];
  json.forEach(row => {
    const line = headers.map(h => {
      const v = row[h] != null ? row[h] : '';
      // Escape double quotes
      const s = String(v).replace(/"/g, '""');
      if (s.includes(',') || s.includes('\n')) return '"'+s+'"';
      return s;
    }).join(',');
    lines.push(line);
  });
  return lines.join('\n');
}

export function csvToJson(csvText){
  // Use PapaParse for robust parsing
  if(typeof PapaParse === 'undefined'){
    // Fallback simple parser
    const lines = csvText.split(/\r?\n/).filter(l=>l.trim().length>0);
    const headers = lines[0].split(',').map(h=>h.trim());
    const data = [];
    for(let i=1;i<lines.length;i++){
      const row = lines[i].split(',');
      const obj = {};
      headers.forEach((h,idx)=>{ obj[h] = row[idx] ? row[idx].replace(/^"|"$/g,'') : ''; });
      data.push(obj);
    }
    return data;
  }
  const results = PapaParse.parse(csvText, { header: true, skipEmptyLines: true, dynamicTyping: true });
  return results.data;
}
