import { Viewer, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";
import "../styles/IndiaMap3D.css";

export default function IndiaMap3D() {
  const indiaPosition = Cartesian3.fromDegrees(78.9629, 22.5937, 2000000);

  return (
    <div style={{ height: "200px", width: "50%", marginLeft:"20px" ,   }}>
      <Viewer
        animation={false}
        timeline={false}
        fullscreenButton={false}
        baseLayerPicker={true}
        homeButton={true}
        navigationHelpButton={true}
      >
        <CameraFlyTo destination={indiaPosition} duration={2} />
      </Viewer>
    </div>
  );
}
