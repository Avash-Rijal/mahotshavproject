"use client";
import React, { useState, useEffect, useRef, useMemo, forwardRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Bookmark,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  RemoveFormat,
  SpecialCharacters,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const LICENSE_KEY = "GPL";

const CKeditor = forwardRef(({ data, onChange }, ref) => {
  const editorRef = useRef(null);
  
  const [editorData, setEditorData] = useState(data);

  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      // Update editor data only if necessary (i.e., data changes externally)
      const currentEditorData = editorRef.current.editor.getData();
      if (currentEditorData !== data) {
        editorRef.current.editor.setData(data);
      }
    }
  }, [data]);

  const editorConfig = useMemo(() => ({
    toolbar: [
      "heading",
      "|",
      "fontSize",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "code",
      "removeFormat",
      "|",
      "specialCharacters",
      "horizontalLine",
      "link",
      "insertTable",
      "highlight",
      "blockQuote",
      "codeBlock",
      "|",
      "alignment",
      "|",
      "outdent",
      "indent",
    ],
    plugins: [
      Alignment,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      Indent,
      IndentBlock,
      Italic,
      Link,
      Paragraph,
      RemoveFormat,
      SpecialCharacters,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      Underline,
    ],
    licenseKey: LICENSE_KEY,
    placeholder: "Type or paste your content here!",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
    },
  }), []);

  const handleChange = (event, editor) => {
    const editorData = editor.getData();
    setEditorData(editorData);  // Keep local editorData state to avoid resets
    onChange(editorData); // Pass the data to parent
  };

  const resetForm = () => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.setData("");  // Reset the editor content
    }
  };

  React.useImperativeHandle(ref, () => ({
    resetForm,
  }));

  return (
    <div className="container p-4">
      <div className="editor-container editor-container_classic-editor">
        <div className="editor-container__editor">
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={editorData}
            ref={editorRef}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
});

export default CKeditor;
