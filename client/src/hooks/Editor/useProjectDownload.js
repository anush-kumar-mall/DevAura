export const useProjectDownload = ({ files, roomId }) => {
  const handleDownloadProject = async () => {
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      Object.keys(files).forEach(name => zip.file(name, files[name]));
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project-${roomId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download project.');
    }
  };

  return { handleDownloadProject };
};