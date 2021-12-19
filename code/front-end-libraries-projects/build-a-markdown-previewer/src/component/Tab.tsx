import { useEffect, useState } from "react";

const Tab: React.FC<{
  icon: string;
  title: string;
  width?: string | number;
  onZoom: (isZoomed: boolean) => void;
}> = (props) => {
  const { icon, title, width, onZoom } = props;
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    onZoom(isZoomed);
  }, [isZoomed])
  return (
    <div
      style={{ display: "flex", flexDirection: "column", width: width ?? '40vw', padding: 5 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "lightslategray",
          border: "1px solid black",
          padding: 2,
          color: "white"
        }}
      >
        <div>
          <span>{icon}</span>
          <span style={{ fontFamily: 'cursive'}}>{title}</span>
        </div>
        <div onClick={() => setIsZoomed(prev => !prev)} style={{ cursor: 'pointer'}}>{ isZoomed ? '🔍' : '🔎'}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default Tab;
