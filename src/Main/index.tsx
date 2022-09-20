import { Button, Upload } from "antd";
import React, { useState } from "react";
import { BaseEditor, Transforms } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { initialValue } from "./config";
import RichText from "../RichText/index";
import { fileToText, saveJSON, saveToHTML } from "../unit";
import styles from "./index.module.css";

function Main() {
  const [editor, setEditor] = useState<
    BaseEditor & ReactEditor & HistoryEditor
  >();
  const [sourceCode, setSourceCode] = useState("");

  // (window as any).editor = editor;
  // (window as any).Transforms = Transforms;
  // (window as any).eNode = Node;
  // (window as any).Editor = Editor;
  function handleSave() {
    saveJSON(JSON.stringify(editor?.children), "sf-rich-text");
  }
  function handleChange(v) {
    //这里可以接收到改变的值
  }

  async function handleUploadChange({ file, fileList }) {
    if (file.status !== "uploading") {
      const fileObj = file.originFileObj;
      const string: any = await fileToText(fileObj);
      const data = JSON.parse(string);
      if (editor) {
        editor.children.forEach((i, index) => {
          Transforms.removeNodes<any>(editor, {
            at: [0],
          });
        });
        Transforms.insertNodes(editor, data);
      }
    }
  }

  function handleSaveHTML() {
    const el = document.getElementById("slate");
    const node: any = el?.cloneNode(true);
    node.contentEditable = false;
    saveToHTML(node?.outerHTML || "", "SF_RICH");
  }

  function handleShowCode() {
    const el = document.getElementById("slate");
    const node: any = el?.cloneNode(true);
    node.contentEditable = false;
    setSourceCode(node?.outerHTML || "");
  }
  return (
    <div>
      <RichText
        setEditor={setEditor}
        onChange={handleChange}
        initialValue={initialValue}
      />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button onClick={handleSave}>保存</Button>
        &nbsp;
        <Upload onChange={handleUploadChange} showUploadList={false}>
          <Button>导入</Button>
        </Upload>
        &nbsp;
        <Button onClick={handleShowCode}>查看源码及预览</Button>
        &nbsp;
        <Button onClick={handleSaveHTML}>导出为HTML</Button>
      </div>
      {sourceCode && (
        <div
          className={styles.wrap}
          dangerouslySetInnerHTML={{ __html: sourceCode }}
        />
      )}
      {sourceCode && <div className={styles.wrap}>{sourceCode}</div>}
    </div>
  );
}

export default React.memo(Main);
