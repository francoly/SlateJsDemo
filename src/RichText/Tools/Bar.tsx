import {
  Form,
  Input,
  Modal,
  Upload,
  Button as AnButton,
  InputNumber,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { Button, Icon, Toolbar } from "../../components";
import { fileToBase64 } from "../../unit";
import {
  toggleBlock,
  toggleMark,
  insertImg,
  insertMap,
  insertGapLine,
  insertTable,
} from "../editorHelps/helps";

interface props {
  editor: BaseEditor & ReactEditor & HistoryEditor;
}

export function Bar({ editor }: props) {
  const [extendBtn, setExtendBtn] = useState<any>([]);
  function handleAdd() {
    const list = [
      <BlockBtn format="left" icon="format_align_left" editor={editor} />,
      <BlockBtn format="center" icon="format_align_center" editor={editor} />,
      <BlockBtn format="right" icon="format_align_right" editor={editor} />,
      <BlockBtn format="justify" icon="format_align_justify" editor={editor} />,
    ];
    setExtendBtn([...extendBtn, list[extendBtn.length]]);
  }
  return (
    <Toolbar>
      <MarkBtn format="bold" icon="format_bold" editor={editor} />
      <MarkBtn format="italic" icon="format_italic" editor={editor} />
      <MarkBtn format="underline" icon="format_underlined" editor={editor} />
      <MarkBtn format="code" icon="code" editor={editor} />
      <BlockBtn format="heading-one" icon="looks_one" editor={editor} />
      <BlockBtn format="heading-two" icon="looks_two" editor={editor} />
      <BlockBtn format="block-quote" icon="format_quote" editor={editor} />
      <BlockBtn
        format="numbered-list"
        icon="format_list_numbered"
        editor={editor}
      />
      <BlockBtn
        format="bulleted-list"
        icon="format_list_bulleted"
        editor={editor}
      />
      <></>
      <GapLineBtn editor={editor} />
      <TableBtn editor={editor} />

      <ImgBtn editor={editor} />
      <MapBtn editor={editor} />
      {extendBtn}
      <strong style={{ cursor: "pointer", color: "red" }} onClick={handleAdd}>
        +功能*
      </strong>
      <div style={{ float: "right" }}>
        <RedoUndoBtn icon="undo" type="undo" editor={editor} />
        &nbsp;
        <RedoUndoBtn icon="redo" type="redo" editor={editor} />
      </div>
    </Toolbar>
  );
}

export default React.memo(Bar);

const TableBtn = ({ editor }) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleClick() {
    setIsModalOpen(true);
  }
  function handleOk() {
    const { rowCount, columnCount } = form.getFieldsValue();
    setIsModalOpen(false);
    insertTable(editor, rowCount || 3, columnCount || 3);
  }
  return (
    <>
      <Button onMouseDown={handleClick}>
        <Icon>table_view</Icon>
      </Button>
      <Modal
        title="设置表格行列"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <Form form={form}>
          <Form.Item label="行数" name="rowCount">
            <Input />
          </Form.Item>
          <Form.Item label="列数" name="columnCount">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const GapLineBtn = ({ editor }) => {
  function handleClick() {
    insertGapLine(editor);
  }
  return (
    <Button onMouseDown={handleClick}>
      <Icon>power_input</Icon>
    </Button>
  );
};

const MapBtn = ({ editor }) => {
  function handleClick() {
    insertMap(editor);
  }
  return (
    <Button onMouseDown={handleClick}>
      <Icon>location_on</Icon>
    </Button>
  );
};

const ImgBtn = ({
  editor,
}: {
  editor: BaseEditor & ReactEditor & HistoryEditor;
}) => {
  const [form] = useForm();
  const [src, setSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function handleChange({ file, fileList }) {
    if (file.status !== "uploading") {
      const fileObj = file.originFileObj;
      const base64: any = await fileToBase64(fileObj);
      setSrc(base64);
      setIsModalOpen(true);
    }
  }

  function handleOk() {
    const { width, height } = form.getFieldsValue();
    setIsModalOpen(false);
    insertImg(editor, src, width || 100, height || 100);
  }
  return (
    <>
      <Upload onChange={handleChange} showUploadList={false}>
        <Icon style={{ cursor: "pointer" }}>{"image"}</Icon>
      </Upload>
      <Modal
        title="设置图片宽高"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        width={200}
      >
        <Form form={form}>
          <Form.Item label="宽" name="width">
            <InputNumber />
          </Form.Item>
          <Form.Item label="高" name="height">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const RedoUndoBtn = ({
  type,
  editor,
  icon,
}: {
  type: "redo" | "undo";
  editor: BaseEditor & ReactEditor & HistoryEditor;
  icon: string;
}) => {
  return (
    <Button
      onMouseDown={() => {
        editor[type]();
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkBtn = ({ format, icon, editor }: any) => {
  return (
    <Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
const BlockBtn = ({ format, icon, editor }) => {
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
