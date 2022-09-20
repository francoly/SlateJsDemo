const Leaf = ({ attributes, children, leaf }) => {
  let style: any = {};
  leaf.bold && (style.fontWeight = "bold");
  leaf.italic && (style.fontStyle = "italic");
  leaf.underline && (style.textDecoration = "underline");
  if (leaf.title) {
    style = {
      ...style,
      display: "inline-block",
      fontWeight: "bold",
      fontSize: "20px",
      margin: "20px 0 10px 0",
    };
  }
  if (leaf.list) {
    style = {
      ...style,
      paddingLeft: "10px",
      fontSize: "20px",
      lineHeight: "10px",
    };
  }
  if (leaf.hr) {
    style = {
      ...style,
      display: "block",
      textAlign: "center",
      borderBottom: "2px solid #ddd",
    };
  }
  if (leaf.blockquote) {
    style = {
      ...style,
      display: "inline-block",
      borderLeft: "2px solid #ddd",
      paddingLeft: "10px",
      color: "#aaa",
      fontStyle: "italic",
    };
  }
  if (leaf.code) {
    style = {
      ...style,
      fontFamily: "monospace",
      backgroundColor: "#eee",
      padding: "3px",
    };
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

export default Leaf;
