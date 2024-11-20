"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useState, useRef } from "react";

const ImageUploadButton = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    return (
        <div className="">
            <Button className="bg-black dark:bg-white" onClick={handleUploadClick}>
                <UploadIcon className="size-4 mr-2" /> Upload Avatar
            </Button>

            {/* Hidden File Input */}
            <input
                ref={inputRef}
                type="file"
                accept=".jpg, .jpeg, .png, .svg"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Display Selected File or Image Preview */}
            {selectedFile && (
                <div className="mt-2 text-center">
                    <p className="text-gray-700">
                        Selected File: <strong>{selectedFile.name}</strong>
                    </p>
                    {selectedFile.type.startsWith("image/") && (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                            className="mt-2 w-32 h-32 object-cover rounded"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUploadButton;
