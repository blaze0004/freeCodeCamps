import Tab from "./Tab";
import marked from "marked";

const Preview: React.FC<{
  markdown: string;
  width: string | number;
  onZoom: (isZoomed: boolean) => void;
}> = (props) => {
  const { markdown, width, onZoom } = props;
  return (
    <Tab icon="📒" title="Preview" width={width} onZoom={onZoom}>
      <div
        style={{
          fontSize: ".8rem",
          width: "100%",
          height: "100vh",
          overflow: "auto",
          backgroundColor: "lavender" 
        }}
      >
        <div
          id="preview"
          style={{ padding: "0 1rem" }}
          dangerouslySetInnerHTML={{
            __html: marked(markdown, {
              breaks: true,
            }),
          }}
        ></div>
      </div>
    </Tab>
  );
};

export default Preview;
