import React, { useState } from "react";

const DragAndDrop = () => {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();


  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png", "application/pdf"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted"); 
      }
    }
  };

  console.log(files);

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  return (
    <>
        <div className="p-3 rounded-md col-span-full">
          <span className="flex justify-center items-center bg-white text-md mb-1 text-red-500">
            {message}
          </span>
          <div className="h-32 w-full overflow-hidden relative shadow-md items-center rounded-lg border border-dashed border-gray-900/25">
            <input
              type="file"
              onChange={handleFile}
              className="h-full w-full opacity-0 z-10 absolute cursor-pointer"
              name="files[]"
            />
            <div className="h-full w-full bg-white absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                <span className="text-md">{`Drag and Drop a file`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file, key) => {
              return (
                <div
                  key={key}
                  className="w-full h-16 flex items-center justify-between rounded p-3 bg-white"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-12 w-12 ">
                      <img
                        alt=''
                        className="w-full h-full rounded"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                    <span className="truncate w-44">{file.name}</span>
                  </div>
                  <div
                    onClick={() => {
                      removeImage(file.name);
                    }}
                    className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                  >
                    <i className="mdi mdi-trash-can text-white text-[14px]"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </>
  );
};

export default DragAndDrop;
