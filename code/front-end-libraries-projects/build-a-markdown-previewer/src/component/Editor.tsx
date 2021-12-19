import Tab from "./Tab";

const Editor: React.FC<{
  onChange: (value: string) => void;
  markdown: string;
  width: string | number;
  onZoom: (isZoomed: boolean) => void;
}> = (props) => {
  const { onChange, markdown, width, onZoom } = props;

  return (
    <Tab icon="📝" title="Editor" width={width} onZoom={onZoom}>
      <textarea
        name="markdown"
        id="editor"
        value={markdown}
        style={{
          display: "flex",
          padding: '1rem'
        }}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </Tab>
  );
};

export default Editor;
