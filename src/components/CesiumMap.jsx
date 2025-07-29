// src/components/CesiumMap.jsx
import { Viewer, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";

const CesiumMap = ({ lat, lon }) => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Viewer full>
        <CameraFlyTo
          duration={2}
          destination={Cartesian3.fromDegrees(lon, lat, 1500000)}
        />
      </Viewer>
    </div>
  );
};

export default CesiumMap;
