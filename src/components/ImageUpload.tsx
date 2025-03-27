import React, { useState, useRef } from 'react';
import { UploadIcon, CameraIcon } from 'lucide-react';
interface ImageUploadProps {
  onImageSelect: (image: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCameraClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return <div className="space-y-4">
      {preview && <div className="relative w-full h-48">
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          <button onClick={() => {
        setPreview(null);
        onImageSelect('');
      }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
            ×
          </button>
        </div>}
      <div className="flex space-x-4">
        <button type="button" onClick={handleFileClick} className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          <UploadIcon size={20} />
          <span>Upload Image</span>
        </button>
        <button type="button" onClick={handleCameraClick} className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white p-2 rounded hover:bg-green-700">
          <CameraIcon size={20} />
          <span>Take Photo</span>
        </button>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
    </div>;
};
export default ImageUpload;