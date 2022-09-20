import React, { useCallback, useEffect, useMemo } from "react";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { Transforms, createEditor, Node as eNode, Text } from "slate";
import _ from "lodash";
import { withHistory } from "slate-history";
import Leaf from "./editorHelps/Leaf";
import Element from "./editorHelps/Element";
import Bar from "./Tools/Bar";
import styles from "./index.module.css";
import Prism from "./editorHelps/Prism";
import { createParagraph } from "./editorHelps/helps";

function RichText({ setEditor, onChange, initialValue }) {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  (window as any).editor = editor;
  function handleKeyDown(e) {
    if (e.code === "Enter") {
      const path = _.cloneDeep(editor.selection?.focus.path || []);
      const type = (eNode.parent(editor, path) as any)?.type || [];
      const node = eNode.get(editor, path);
      if (type === "table-cell") {
        e.preventDefault();
      }

      if (type === "list-item") {
        if (!(node as any).text) {
          e.preventDefault();
          Transforms.removeNodes(editor, { at: path.slice(0, -1) });
          let at = path.slice(0, -2);
          at[at.length - 1] = at[at.length - 1] + 1;
          Transforms.insertNodes<any>(editor, createParagraph(), {
            at,
            select: true,
          });
        }
        return;
      }

      if (type === "image" || type === "map" || type === "gap-line") {
        e.preventDefault();
        let at = path.slice(0, -1);
        at[at.length - 1] = at[at.length - 1] + 1;
        Transforms.insertNodes<any>(editor, createParagraph(), {
          at,
          select: true,
        });
        return;
      }
    }
  }
  const decorate = useCallback(([node, path]) => {
    const ranges = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;
    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        (ranges as any).push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }
    return ranges;
  }, []);

  useEffect(() => {
    setEditor(editor);
  }, [editor, setEditor]);

  function handleChange(value) {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    isAstChange && onChange && onChange(value);
  }

  function handleWhiteBoardClick(e) {
    e.preventDefault();
    Transforms.insertNodes(editor, createParagraph(), {
      at: [editor.children.length],
      select: true,
    });
    ReactEditor.focus(editor);
  }
  return (
    <div className={styles.wrapper}>
      <Bar editor={editor} />
      <Slate editor={editor} value={initialValue} onChange={handleChange}>
        <Editable
          id="slate"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          decorate={decorate}
          onKeyDown={handleKeyDown}
        />
        {/* 这是一个白板，点击白板就可以插入新的一行文本数据 */}
        <div onClick={handleWhiteBoardClick} className={styles.whiteBoard} />
      </Slate>
    </div>
  );
}

export default React.memo(RichText);
