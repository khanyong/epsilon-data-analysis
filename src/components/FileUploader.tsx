import React from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

interface FileUploaderProps {
  onData: (data: any[]) => void;
}

export function FileUploader({ onData }: FileUploaderProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      onData(json);
    };
    reader.readAsArrayBuffer(file);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} style={{ border: '1px dashed #aaa', padding: 20 }}>
      <input {...getInputProps()} />
      <p>엑셀/CSV 파일을 드래그하거나 클릭해서 업로드하세요.</p>
    </div>
  );
}
