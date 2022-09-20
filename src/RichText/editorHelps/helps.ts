import { Editor, Transforms, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
export const LIST_TYPES = ["numbered-list", "bulleted-list"];

export let editor;
export function setEditor(editor) {
  editor = editor;
}
export function getEditor() {
  return editor;
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const createParagraph = (text = "") => ({
  type: "paragraph",
  children: [
    {
      text: "",
    },
  ],
});

export const createImageNode = (alt, src, width, height) => ({
  type: "image",
  alt,
  src,
  width,
  height,
  dataId: "data_" + Date.now(),
  children: [{ text: " " }],
});

export const createMapNode = () => ({
  type: "map",
  children: [{ text: " " }],
});

export function insertGapLine(editor) {
  const node: any = { type: "gap-line", children: [{ text: "" }] };
  Transforms.insertNodes(editor, node);
}

export function createColumn() {
  return {
    type: "table-cell",
    children: [{ text: `SF` }],
  };
}

export function createRow(columns) {
  return {
    type: "table-row",
    children: createColumns(columns),
  };
}

export function createColumns(columns) {
  const list: any[] = [];
  while (columns--) {
    list.push(createColumn());
  }
  return list;
}
export function createRows(rows, columns) {
  const list: any = [];
  while (rows--) {
    list.push(createRow(columns));
  }
  return list;
}

export function createTable(rows, column) {
  return {
    type: "table",
    dataId: "data_" + Date.now(),
    children: createRows(rows, column),
  };
}
export const insertTable = (editor, rowCount, columnCount) => {
  Transforms.insertNodes<any>(
    editor,
    createTable(rowCount, columnCount) as any
  );
};

export function insertMap(editor) {
  const mapNode: any = createMapNode();
  Transforms.insertNodes<any>(editor, mapNode);
}

export const insertImg = (editor, src, width, height) => {
  ReactEditor.focus(editor);
  const imgNode: any = createImageNode("test", src, width, height);
  Transforms.insertNodes<any>(editor, imgNode);
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: any;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};
