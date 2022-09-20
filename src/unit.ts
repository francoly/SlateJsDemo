export function saveJSON(data, filename) {
  if (!data) {
    alert("保存的数据为空");
    return;
  }
  if (!filename) filename = "json.json";
  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }
  var blob = new Blob([data], { type: "text/json" }),
    a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  a.click();
}
export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target?.result || "");
    };
  });
}

export function fileToText(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      resolve(e.target?.result || "");
    };
  });
}

export function saveToHTML(content, filename) {
  const data = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
    <script src="https://webapi.amap.com/maps?v=1.4.2&key=608d75903d29ad471362f8c58c550daf"></script>
    <script
      type="text/javascript"
      src="https://webapi.amap.com/demos/js/liteToolbar.js"
    ></script>
    <style>
    body{
      background: #e4e4e4!important;
    }
    html,
    input,
    textarea {
      font-family: 'Roboto', sans-serif;
      line-height: 1.4;
      background: #eee;
    }
  body {
    margin: 0;
    background: #e4e4e4!important;
    height:100vh;
  }
  p {
    margin: 0;
  }
  pre {
    padding: 10px;
    background-color: #eee;
    white-space: pre-wrap;
  }
  :not(pre) > code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }
  blockquote {
    border-left: 2px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 10px;
    color: #aaa;
    font-style: italic;
  }
  blockquote[dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }
  table {
    border-collapse: collapse;
  }
  td {
    padding: 10px;
    border: 2px solid #ddd;
  }
  input {
    box-sizing: border-box;
    font-size: 0.85em;
    width: 100%;
    padding: 0.5em;
    border: 2px solid #ddd;
    background: #fafafa;
  }
  input:focus {
    outline: 0;
    border-color: blue;
  }

  iframe {
    width: 100%;
    border: 1px solid #eee;
  }
  [data-slate-editor] > * + * {
    margin-top: 1em;
  }
    blockquote{
      border-left: 2px solid #ddd;
      margin-left: 0;
      margin-right: 0;
      padding-left: 10px;
      color: #aaa;
      font-style: italic;
    }
    .wrapper{
      width: 800px;
      padding: 20px;
      border: 1px solid #000;
      background:#fff;
      margin:0 auto;
      border-radius:5px;
    }
    </style>
  </head>
  <body>
    <div class='wrapper'>
    ${content}
    </div>
    <h5 style='text-align:center;'>
    备注：使用请在服务器打开预览，否则会导致某些资源加载失败
    </h5>
  </body>
</html>
`;
  var blob = new Blob([data], { type: "text/html" }),
    a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  a.click();
}
