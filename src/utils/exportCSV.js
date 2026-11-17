// CSV Export Utility for Tele-ICU Command Center

export const exportToCSV = (filename, data, headers) => {
  if (!data || !data.length) return;

  const headerRow = headers.map(h => `"${h.label}"`).join(',');
  const rows = data.map(item => {
    return headers.map(h => {
      let val = item[h.key];
      if (typeof val === 'object' && val !== null) {
        val = JSON.stringify(val);
      }
      val = val === undefined || val === null ? '' : String(val).replace(/"/g, '""');
      return `"${val}"`;
    }).join(',');
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headerRow, ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
