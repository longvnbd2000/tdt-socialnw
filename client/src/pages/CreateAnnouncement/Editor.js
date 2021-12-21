import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

function Editor() {
  const [value, setValue] = useState("");
  const editorRef = useRef();

  console.log(value);

  if (editorRef.current) console.log(editorRef.current.editor.getContents());

  return (
    <div style={{width:"100",height:'100%'}}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        style={{ height:"200px" }}
        ref={editorRef}
      />
    </div>
  );
}

export default Editor;