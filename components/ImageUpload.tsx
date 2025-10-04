/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import config from '@/lib/config';
import ImageKit from 'imagekit';
import {
    IKImage,

    ImageKitProvider,
    IKUpload,

} from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { set } from 'zod';


const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`);

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;

        return { token, expire, signature }
    } catch (error: unknown) {
        throw new Error("Failed to authenticate with ImageKit");
    }
}


const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {

    const ikUploadRef = useRef(null)
    const [file, setFile] = useState<{ filePath: string } | null>()

    const onError = (error: any) => {
        console.log(error)
        toast.error('Failed to upload file')
    }

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath)
        toast.success(`${res.filePath} uploaded successfully`)
    }

    const uploadButton = (e: any) => {
        e.preventDefault();

        if (ikUploadRef.current) {

            // @ts-expect-error
            ikUploadRef.current.click()
        }
    }
    return (
        <ImageKitProvider publicKey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint} authenticator={authenticator}>
            <IKUpload className='hidden' ref={ikUploadRef} onError={onError} onSuccess={onSuccess} fileName='test-upload.png' />
            <button className='flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md bg-gray-600' onClick={uploadButton}>
                <p className='mt-1 text-center text-sm'>Upload a File</p>
                <Image src="/icons/upload.svg" alt='upload-icon' width={20} height={20} className='object-contain' onClick={uploadButton} />


                {file && <p className='upload-filename'>
                    {file.filePath}
                </p>}
            </button>

            {file && (

                <IKImage
                    alt={file.filePath}
                    path={file.filePath}
                    width={500}
                    height={300}
                />

            )}
        </ImageKitProvider>
    )
}

export default ImageUpload
