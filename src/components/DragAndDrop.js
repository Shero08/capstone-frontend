import React, { useState } from "react";
import {
  TrashIcon,
  FolderOpenIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const DragAndDrop = ({ formData, onFormDataChange }) => {
  const [message, setMessage] = useState();
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setMessage("");
    let newFile = e.target.files;

    if (newFile.length > 1) {
      setMessage("Puoi caricare un solo file alla volta");
    }

    const fileType = newFile[0]["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
    ];

    if (validImageTypes.includes(fileType)) {
      onFormDataChange(newFile[0]);
      setFile(newFile[0]);
    } else {
      setMessage("Sono accettati solo file PDF o in Word");
    }
  };

  console.log(file);

  const removeImage = () => {
    onFormDataChange(null);
  };

  return (
    <>
      <div className="rounded-md col-span-full">
        <span className="flex justify-center items-center bg-white text-md mb-1 text-red-500">
          {message}
        </span>
        <div className="h-32 w-full overflow-hidden relative items-center rounded-lg border-2 border-dashed border-gray-900/25">
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full opacity-0 z-10 absolute cursor-pointer"
            name="file"
          />
          <div className="h-full w-full bg-white absolute z-1 flex justify-center items-center top-0">
            <div className="flex items-center gap-2">
              <FolderOpenIcon className="w-6" />
              <span className="text-md">{`Drag and Drop a file`}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {file && (
            <div className="w-full h-16 flex items-center justify-between rounded-lg p-3 bg-gray-50 border border-gray-300">
              <div className="flex flex-row items-center gap-2">
                <div className="h-12 w-12 ">
                  <DocumentCheckIcon className="w-10" />
                </div>
                <span className="truncate w-44">{file.name}</span>
              </div>
              <div
                onClick={() => {
                  removeImage(file.name);
                }}
                className="bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
              >
                <TrashIcon className="w-8 p-2 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
