/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import config from '@/lib/config';
import { cn } from '@/lib/utils';
import {
  IKImage,
  ImageKitProvider,
  IKUpload,
  IKVideo,
} from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: unknown) {
    throw new Error("Failed to authenticate with ImageKit");
  }
};

interface Props {
  type: "image" | "video";
  onFileChange: (filePath: string) => void;
  accept?: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
}

const ImageUpload = ({ onFileChange, type, accept, placeholder, folder, variant,value }: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>({filePath: value ?? ""});
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const variantStyles = {
    dark: {
      button: 'bg-gray-800 hover:bg-gray-700 border-gray-600',
      placeholder: 'text-gray-100',
      text: 'text-gray-100',
      progress: 'bg-gray-700',
    },
    light: {
      button: 'bg-white hover:bg-gray-50 border-gray-300',
      placeholder: 'text-gray-600',
      text: 'text-gray-600',
      progress: 'bg-gray-200',
    }
  };

  const currentStyle = variantStyles[variant];

  const onError = (error: any) => {
    console.error('Upload error:', error);
    setIsUploading(false);
    toast.error(`Failed to upload ${type} file`);
  };

  const onSuccess = (res: any) => {
    setFile(res);
    setIsUploading(false);
    setProgress(0);
    onFileChange(res.filePath);
    toast.success(`${type} uploaded successfully`);
  };

  const onUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ikUploadRef.current) {
      // @ts-expect-error
      ikUploadRef.current.click();
    }
  };

  const onValidate = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.error("Image size should be less than 20MB");
      return false;
    } else if (type === "video" && file.size > 100 * 1024 * 1024) {
      toast.error("Video size should be less than 100MB");
      return false;
    }
    return true;
  };

  const handleUploadProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    const percentage = Math.round((loaded / total) * 100);
    setProgress(percentage);
  };

  return (
    <ImageKitProvider 
      publicKey={config.env.imagekit.publicKey} 
      urlEndpoint={config.env.imagekit.urlEndpoint} 
      authenticator={authenticator}
    >
      <div className="space-y-4">
        {/* Hidden Upload Input */}
        <IKUpload 
          className="hidden" 
          ref={ikUploadRef} 
          onError={onError} 
          onSuccess={onSuccess}
          onUploadStart={onUploadStart}
          useUniqueFileName={true} 
          validateFile={onValidate} 
          onUploadProgress={handleUploadProgress}
          folder={folder} 
          accept={accept} 
        />

        {/* Upload Button */}
        <button
          type="button"
          disabled={isUploading}
          className={cn(
            'flex min-h-14 w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            currentStyle.button,
            isUploading ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:scale-[1.02]'
          )}
          onClick={handleUploadClick}
        >
          {isUploading ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
              <span className={cn('text-sm font-medium', currentStyle.text)}>
                Uploading... {progress}%
              </span>
            </div>
          ) : (
            <>
              <Image 
                src="/icons/upload.svg" 
                alt="Upload icon" 
                width={20} 
                height={20} 
                className="object-contain"
              />
              <span className={cn('text-sm font-medium', currentStyle.placeholder)}>
                {placeholder}
              </span>
            </>
          )}
        </button>

        {/* Progress Bar */}
        {isUploading && (
          <div className="space-y-2">
            <div className={cn('w-full h-2 rounded-full', currentStyle.progress)}>
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={cn('text-xs text-center', currentStyle.text)}>
              Upload progress: {progress}%
            </p>
          </div>
        )}

        {/* File Name */}
        {file && !isUploading && (
          <div className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <p className={cn('text-sm font-medium truncate', currentStyle.text)}>
              {file.filePath.split('/').pop()}
            </p>
          </div>
        )}

        {/* Preview */}
        {file && !isUploading && (
          <div className="rounded-lg overflow-hidden shadow-lg">
            {type === "image" ? (
              <IKImage
                alt={file.filePath}
                path={file.filePath}
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            ) : type === "video" ? (
              <IKVideo
                path={file.filePath}
                width={500}
                height={300}
                controls={true}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : null}
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default ImageUpload;