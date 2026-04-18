type DownloadFileOptions = {
  blob: Blob;
  fileName: string;
};

export function downloadFile({ blob, fileName }: DownloadFileOptions) {
  const objectUrl = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    link.click();
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
