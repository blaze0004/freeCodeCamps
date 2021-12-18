import { useState } from "react";
import "./App.css";
import Editor from "./component/Editor";
import Preview from "./component/Preview";

const initialMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

const initialWidth = {
  editor: "40vw",
  preview: "40vw",
};

function App() {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [width, setWidth] =
    useState<{ editor: string | number; preview: string | number }>(
      initialWidth
    );
  const handleOnChange = (value: string) => {
    setMarkdown(value);
  };

  const handleOnZoom = (isZoomed: boolean, type: "editor" | "preview") => {
    const newWidth = isZoomed ? { ...width } : { ...initialWidth };
    if (isZoomed) {
      switch (type) {
        case "editor":
          newWidth.editor = "95vw";
          newWidth.preview = 0;
          break;
        case "preview":
          newWidth.editor = 0;
          newWidth.preview = "95vw";
          break;
      }
    }

    setWidth(newWidth);
  };

  return (
    <div className="App">
      <header
        style={{
          padding: 2,
          fontSize: 18,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "cursive",
          width: Object.values(width).every((x) => x) ? "80vw" : "95vw",
        }}
      >
        <span>Markdown Previewer</span>
        <span>
          <a
            style={{ color: "black", textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/blaze0004/freeCodeCamps"
          >
            GitHub | @Blaze0004
          </a>
        </span>
      </header>
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {width.editor ? (
          <Editor
            onChange={handleOnChange}
            markdown={markdown}
            onZoom={(isZoomed) => handleOnZoom(isZoomed, "editor")}
            width={width.editor}
          />
        ) : null}
        {width.preview ? (
          <Preview
            markdown={markdown}
            onZoom={(isZoomed) => handleOnZoom(isZoomed, "preview")}
            width={width.preview}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
