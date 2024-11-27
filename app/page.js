// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [draggingFile, setDraggingFile] = useState(null);

//   // Create a new folder
//   const createFolder = () => {
//     const folderName = prompt("Enter folder name:");
//     if (folderName) {
//       setFolders([...folders, { name: folderName, items: [] }]);
//     }
//   };

//   // Rename a folder
//   const renameFolder = (index) => {
//     const newName = prompt("Enter new folder name:");
//     if (newName) {
//       const updatedFolders = [...folders];
//       updatedFolders[index].name = newName;
//       setFolders(updatedFolders);
//     }
//   };

//   // Add files
//   const uploadFiles = (e) => {
//     const uploadedFiles = Array.from(e.target.files).map((file) => ({
//       name: file.name,
//       id: Date.now() + file.name,
//     }));
//     setFiles([...files, ...uploadedFiles]);
//   };

//   // Drag and drop functionality
//   const onDragStart = (file) => {
//     setDraggingFile(file);
//   };

//   const onDrop = (folderIndex) => {
//     if (draggingFile) {
//       const updatedFolders = [...folders];
//       updatedFolders[folderIndex].items.push(draggingFile);
//       setFolders(updatedFolders);

//       // Remove the file from the main files list
//       setFiles(files.filter((file) => file.id !== draggingFile.id));
//       setDraggingFile(null);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Folder Manager</h1>
//       <button onClick={createFolder}>Create Folder</button>
//       <input
//         type="file"
//         multiple
//         onChange={uploadFiles}
//         style={{ marginLeft: "10px" }}
//       />

//       <div style={{ display: "flex", marginTop: "20px" }}>
//         <div style={{ flex: 1, marginRight: "20px" }}>
//           <h2>Files</h2>
//           <ul>
//             {files.map((file) => (
//               <li
//                 key={file.id}
//                 draggable
//                 onDragStart={() => onDragStart(file)}
//                 style={{
//                   padding: "5px",
//                   border: "1px solid #ccc",
//                   marginBottom: "5px",
//                   cursor: "move",
//                 }}
//               >
//                 {file.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div style={{ flex: 2 }}>
//           <h2>Folders</h2>
//           {folders.map((folder, index) => (
//             <div
//               key={index}
//               onDrop={() => onDrop(index)}
//               onDragOver={(e) => e.preventDefault()}
//               style={{
//                 border: "1px solid #000",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <strong>{folder.name}</strong>
//                 <button onClick={() => renameFolder(index)}>Rename</button>
//               </div>
//               <ul>
//                 {folder.items.map((item) => (
//                   <li key={item.id}>{item.name}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedFolder !== null && (
//         <div style={{ marginTop: "20px", color: "#333" }}>
//           <h3 className="text-gray-700">
//             Contents of Folder: {folders[selectedFolder]?.name}
//           </h3>
//           <ul>
//             {folders[selectedFolder]?.items.map((item, idx) => (
//               <li key={idx} className="text-gray-700">
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Folder, File, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [draggingFile, setDraggingFile] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  const createFolder = () => {
    if (newFolderName) {
      setFolders([...folders, { name: newFolderName, items: [] }]);
      setNewFolderName("");
    }
  };

  const renameFolder = (index, newName) => {
    const updatedFolders = [...folders];
    updatedFolders[index].name = newName;
    setFolders(updatedFolders);
  };

  // const uploadFiles = (e) => {
  //   if (e.target.files) {
  //     const uploadedFiles = Array.from(e.target.files).map((file) => ({
  //       name: file.name,
  //       id: Date.now() + file.name,
  //     }));
  //     setFiles([...files, ...uploadedFiles]);
  //   }
  // };

  // Add files
  const uploadFiles = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      id: Date.now() + file.name,
    }));
    setFiles([...files, ...uploadedFiles]);
  };

  const onDragStart = (file) => {
    setDraggingFile(file);
  };

  const onDrop = (folderIndex) => {
    if (draggingFile) {
      const updatedFolders = [...folders];
      updatedFolders[folderIndex].items.push(draggingFile);
      setFolders(updatedFolders);
      setFiles(files.filter((file) => file.id !== draggingFile.id));
      setDraggingFile(null);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Folder Manager</h1>
      <div className="flex space-x-4 mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <Button onClick={createFolder}>Create</Button>
          </DialogContent>
        </Dialog>
        <Input
          type="file"
          multiple
          onChange={uploadFiles}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          {/* <Button as="span">
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button> */}

          <input
            type="file"
            multiple
            onChange={uploadFiles}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {files.map((file) => (
                <li
                  key={file.id}
                  draggable
                  onDragStart={() => onDragStart(file)}
                  className="flex items-center p-2 bg-white rounded shadow cursor-move"
                >
                  <File className="mr-2 h-4 w-4" />
                  {file.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {folders.map((folder, index) => (
          <Card
            key={index}
            onDrop={() => onDrop(index)}
            onDragOver={(e) => e.preventDefault()}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center">
                  <Folder className="mr-2 h-4 w-4" />
                  {folder.name}
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Rename
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rename Folder</DialogTitle>
                    </DialogHeader>
                    <Input
                      placeholder="New folder name"
                      defaultValue={folder.name}
                      onChange={(e) => renameFolder(index, e.target.value)}
                    />
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {folder.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center p-2 bg-white rounded shadow"
                  >
                    <File className="mr-2 h-4 w-4" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
