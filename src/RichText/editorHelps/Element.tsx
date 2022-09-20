import React, { useEffect } from "react";
import { Transforms } from "slate";
import _ from "lodash";
import { Icon } from "../../components";
import { createColumn, createRow, getEditor } from "./helps";

const Element = ({ attributes, children, element, ...reset }) => {
  const style = { textAlign: element.align };

  return (
    {
      "block-quote": (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      ),
      "bulleted-list": (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      ),
      "heading-one": (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      ),
      "heading-two": (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      ),
      "list-item": (
        <li style={style} {...attributes}>
          {children}
        </li>
      ),
      "numbered-list": (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      ),
      "gap-line": (
        <div
          style={{
            width: "100%",
            height: "0",
            border: "1px solid #979797",
            margin: "10px 0 ",
          }}
          {...attributes}
        >
          {children}
        </div>
      ),
      table: (
        <CTable
          style={style}
          attributes={attributes}
          children={children}
          element={element}
        />
      ),
      "table-row": <tr {...attributes}>{children}</tr>,
      "table-cell": <td {...attributes}>{children}</td>,
      image: (
        <Image
          style={style}
          attributes={attributes}
          children={children}
          element={element}
        />
      ),
      map: <Map style={style} attributes={attributes} children={children} />,
    }[element.type] || (
      <p style={style} {...attributes}>
        {children}
      </p>
    )
  );
};

function CTable({ attributes, children, style, element }) {
  const addStyle: any = {
    background: "#a2a2a2",
    height: "20px",
    width: "20px",
    lineHeight: "20px",
    color: "white",
    textAlign: "center",
    borderRadius: "50%",
    cursor: "pointer",
  };
  function handleAddColumns(dataId) {
    const editor = (window as any).editor;
    let path;
    const node = editor.children.find((item, index) => {
      if (item.dataId === dataId) {
        path = [index];
        return true;
      }
    });
    if (node && path) {
      const newNode = _.cloneDeep(node);
      newNode.children.forEach((item, index) => {
        item.children.push(createColumn());
      });
      Transforms.removeNodes(editor, { at: path });
      Transforms.insertNodes<any>(editor, newNode, {
        at: path,
      });
    }
  }

  function handleAddRows(dataId) {
    const editor = getEditor();
    let path;
    const node = editor.children.find((item, index) => {
      if (item.dataId === dataId) {
        path = [index];
        return true;
      }
    });
    if (node && path) {
      const newNode = _.cloneDeep(node);
      newNode.children.push(createRow(newNode.children[0].children.length));
      Transforms.removeNodes(editor, { at: path });
      Transforms.insertNodes<any>(editor, newNode, {
        at: path,
      });
    }
  }
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <table>
        <tbody {...attributes}>{children}</tbody>
      </table>
      <div
        contentEditable={false}
        onClick={handleAddColumns.bind(null, element.dataId)}
        style={{
          position: "absolute",
          right: "-10px",
          top: "45%",
          ...addStyle,
        }}
      >
        +
      </div>
      <div
        contentEditable={false}
        onClick={handleAddRows.bind(null, element.dataId)}
        style={{
          position: "absolute",
          right: "45%",
          bottom: "-12px",
          ...addStyle,
        }}
      >
        +
      </div>
    </div>
  );
}

function Map({ attributes, children, style }) {
  const id = "map";
  useEffect(() => {
    setTimeout(() => {
      const map = new AMap.Map("map", {
        resizeEnable: true,
        center: [116.480983, 39.989628],
        zoom: 11,
      });
      AMap.plugin("AMap.ToolBar", function () {
        const toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
      });
    }, 100);
  }, []);

  return (
    <div {...attributes} style={{ ...style }}>
      <div
        id={id}
        contentEditable={false}
        style={{ width: "300px", height: "300px", display: "inline-block" }}
      />
      {children}
    </div>
  );
}

function Image({ attributes, children, element, style }) {
  function handleImageMouseDown(dataId) {
    const editor = getEditor();
    let imgPath;
    const imageNode = editor.children.find((item, index) => {
      if (item.dataId === dataId) {
        imgPath = [index];
        return true;
      }
    });

    let { width, height } = imageNode;
    function handleMouseMove(e) {
      width += e.movementX;
      height += e.movementY;
      if (imageNode) {
        Transforms.setNodes<any>(
          editor,
          {
            width,
            height,
          },
          {
            at: imgPath,
          }
        );
      }
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", handleMouseMove);
      },
      { once: true }
    );
  }
  return (
    <div style={{ ...style }} {...attributes}>
      <p
        style={{ ...style, position: "relative", display: "inline-block" }}
        contentEditable={false}
      >
        <img
          alt={element.alt}
          src={element.src}
          style={{
            width: element.width + "px",
            height: element.height + "px",
          }}
        />
        <Icon
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            transform: "rotate(90deg)",
            background: " #4a4545",
            borderRadius: "5px",
            color: "#ffff",
            cursor: "nwse-resize",
          }}
          onMouseDown={handleImageMouseDown.bind(null, element.dataId)}
        >
          open_in_full
        </Icon>
      </p>
      {children}
    </div>
  );
}
export default Element;
