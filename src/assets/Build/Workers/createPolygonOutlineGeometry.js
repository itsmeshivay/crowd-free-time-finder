/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.131.1-ion
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  PolygonGeometryLibrary_default
} from "./chunk-52DTHTKR.js";
import {
  ArcType_default
} from "./chunk-FKO2XRXZ.js";
import {
  GeometryInstance_default
} from "./chunk-7G2O6QH3.js";
import {
  GeometryPipeline_default
} from "./chunk-QXOWDZYZ.js";
import "./chunk-E7KSST7M.js";
import "./chunk-UXCG22U4.js";
import {
  GeometryOffsetAttribute_default
} from "./chunk-QREBKKN5.js";
import {
  EllipsoidTangentPlane_default
} from "./chunk-AX3B4SGH.js";
import "./chunk-IDHHSZTD.js";
import {
  PolygonPipeline_default,
  WindingOrder_default
} from "./chunk-HTB5PIYZ.js";
import "./chunk-B3LHDD7Q.js";
import "./chunk-2Y2IF6ZP.js";
import "./chunk-AZK5KSZ4.js";
import "./chunk-ILTPHRDS.js";
import {
  IndexDatatype_default
} from "./chunk-6FY4D6KD.js";
import {
  GeometryAttributes_default
} from "./chunk-BF2HFWMG.js";
import {
  GeometryAttribute_default,
  Geometry_default,
  PrimitiveType_default
} from "./chunk-QKYGO6XL.js";
import {
  BoundingSphere_default
} from "./chunk-76WKZOUK.js";
import "./chunk-3UEVA4NO.js";
import {
  ComponentDatatype_default
} from "./chunk-XLDLCV2F.js";
import {
  Cartesian3_default,
  Ellipsoid_default,
  Frozen_default
} from "./chunk-Z2GDV3MT.js";
import {
  Math_default
} from "./chunk-Q6SJKTTQ.js";
import "./chunk-ADA7OX2I.js";
import "./chunk-G2VBRELF.js";
import {
  Check_default,
  DeveloperError_default
} from "./chunk-UX2S2KIQ.js";
import {
  defined_default
} from "./chunk-SKVVOFGK.js";

// packages/engine/Source/Core/PolygonOutlineGeometry.js
var createGeometryFromPositionsPositions = [];
var createGeometryFromPositionsSubdivided = [];
function createGeometryFromPositions(ellipsoid, positions, minDistance, perPositionHeight, arcType) {
  const tangentPlane = EllipsoidTangentPlane_default.fromPoints(positions, ellipsoid);
  const positions2D = tangentPlane.projectPointsOntoPlane(
    positions,
    createGeometryFromPositionsPositions
  );
  const originalWindingOrder = PolygonPipeline_default.computeWindingOrder2D(positions2D);
  if (originalWindingOrder === WindingOrder_default.CLOCKWISE) {
    positions2D.reverse();
    positions = positions.slice().reverse();
  }
  let subdividedPositions;
  let i;
  let length = positions.length;
  let index = 0;
  if (!perPositionHeight) {
    let numVertices = 0;
    if (arcType === ArcType_default.GEODESIC) {
      for (i = 0; i < length; i++) {
        numVertices += PolygonGeometryLibrary_default.subdivideLineCount(
          positions[i],
          positions[(i + 1) % length],
          minDistance
        );
      }
    } else if (arcType === ArcType_default.RHUMB) {
      for (i = 0; i < length; i++) {
        numVertices += PolygonGeometryLibrary_default.subdivideRhumbLineCount(
          ellipsoid,
          positions[i],
          positions[(i + 1) % length],
          minDistance
        );
      }
    }
    subdividedPositions = new Float64Array(numVertices * 3);
    for (i = 0; i < length; i++) {
      let tempPositions;
      if (arcType === ArcType_default.GEODESIC) {
        tempPositions = PolygonGeometryLibrary_default.subdivideLine(
          positions[i],
          positions[(i + 1) % length],
          minDistance,
          createGeometryFromPositionsSubdivided
        );
      } else if (arcType === ArcType_default.RHUMB) {
        tempPositions = PolygonGeometryLibrary_default.subdivideRhumbLine(
          ellipsoid,
          positions[i],
          positions[(i + 1) % length],
          minDistance,
          createGeometryFromPositionsSubdivided
        );
      }
      const tempPositionsLength = tempPositions.length;
      for (let j = 0; j < tempPositionsLength; ++j) {
        subdividedPositions[index++] = tempPositions[j];
      }
    }
  } else {
    subdividedPositions = new Float64Array(length * 2 * 3);
    for (i = 0; i < length; i++) {
      const p0 = positions[i];
      const p1 = positions[(i + 1) % length];
      subdividedPositions[index++] = p0.x;
      subdividedPositions[index++] = p0.y;
      subdividedPositions[index++] = p0.z;
      subdividedPositions[index++] = p1.x;
      subdividedPositions[index++] = p1.y;
      subdividedPositions[index++] = p1.z;
    }
  }
  length = subdividedPositions.length / 3;
  const indicesSize = length * 2;
  const indices = IndexDatatype_default.createTypedArray(length, indicesSize);
  index = 0;
  for (i = 0; i < length - 1; i++) {
    indices[index++] = i;
    indices[index++] = i + 1;
  }
  indices[index++] = length - 1;
  indices[index++] = 0;
  return new GeometryInstance_default({
    geometry: new Geometry_default({
      attributes: new GeometryAttributes_default({
        position: new GeometryAttribute_default({
          componentDatatype: ComponentDatatype_default.DOUBLE,
          componentsPerAttribute: 3,
          values: subdividedPositions
        })
      }),
      indices,
      primitiveType: PrimitiveType_default.LINES
    })
  });
}
function createGeometryFromPositionsExtruded(ellipsoid, positions, minDistance, perPositionHeight, arcType) {
  const tangentPlane = EllipsoidTangentPlane_default.fromPoints(positions, ellipsoid);
  const positions2D = tangentPlane.projectPointsOntoPlane(
    positions,
    createGeometryFromPositionsPositions
  );
  const originalWindingOrder = PolygonPipeline_default.computeWindingOrder2D(positions2D);
  if (originalWindingOrder === WindingOrder_default.CLOCKWISE) {
    positions2D.reverse();
    positions = positions.slice().reverse();
  }
  let subdividedPositions;
  let i;
  let length = positions.length;
  const corners = new Array(length);
  let index = 0;
  if (!perPositionHeight) {
    let numVertices = 0;
    if (arcType === ArcType_default.GEODESIC) {
      for (i = 0; i < length; i++) {
        numVertices += PolygonGeometryLibrary_default.subdivideLineCount(
          positions[i],
          positions[(i + 1) % length],
          minDistance
        );
      }
    } else if (arcType === ArcType_default.RHUMB) {
      for (i = 0; i < length; i++) {
        numVertices += PolygonGeometryLibrary_default.subdivideRhumbLineCount(
          ellipsoid,
          positions[i],
          positions[(i + 1) % length],
          minDistance
        );
      }
    }
    subdividedPositions = new Float64Array(numVertices * 3 * 2);
    for (i = 0; i < length; ++i) {
      corners[i] = index / 3;
      let tempPositions;
      if (arcType === ArcType_default.GEODESIC) {
        tempPositions = PolygonGeometryLibrary_default.subdivideLine(
          positions[i],
          positions[(i + 1) % length],
          minDistance,
          createGeometryFromPositionsSubdivided
        );
      } else if (arcType === ArcType_default.RHUMB) {
        tempPositions = PolygonGeometryLibrary_default.subdivideRhumbLine(
          ellipsoid,
          positions[i],
          positions[(i + 1) % length],
          minDistance,
          createGeometryFromPositionsSubdivided
        );
      }
      const tempPositionsLength = tempPositions.length;
      for (let j = 0; j < tempPositionsLength; ++j) {
        subdividedPositions[index++] = tempPositions[j];
      }
    }
  } else {
    subdividedPositions = new Float64Array(length * 2 * 3 * 2);
    for (i = 0; i < length; ++i) {
      corners[i] = index / 3;
      const p0 = positions[i];
      const p1 = positions[(i + 1) % length];
      subdividedPositions[index++] = p0.x;
      subdividedPositions[index++] = p0.y;
      subdividedPositions[index++] = p0.z;
      subdividedPositions[index++] = p1.x;
      subdividedPositions[index++] = p1.y;
      subdividedPositions[index++] = p1.z;
    }
  }
  length = subdividedPositions.length / (3 * 2);
  const cornersLength = corners.length;
  const indicesSize = (length * 2 + cornersLength) * 2;
  const indices = IndexDatatype_default.createTypedArray(
    length + cornersLength,
    indicesSize
  );
  index = 0;
  for (i = 0; i < length; ++i) {
    indices[index++] = i;
    indices[index++] = (i + 1) % length;
    indices[index++] = i + length;
    indices[index++] = (i + 1) % length + length;
  }
  for (i = 0; i < cornersLength; i++) {
    const corner = corners[i];
    indices[index++] = corner;
    indices[index++] = corner + length;
  }
  return new GeometryInstance_default({
    geometry: new Geometry_default({
      attributes: new GeometryAttributes_default({
        position: new GeometryAttribute_default({
          componentDatatype: ComponentDatatype_default.DOUBLE,
          componentsPerAttribute: 3,
          values: subdividedPositions
        })
      }),
      indices,
      primitiveType: PrimitiveType_default.LINES
    })
  });
}
function PolygonOutlineGeometry(options) {
  Check_default.typeOf.object("options", options);
  Check_default.typeOf.object("options.polygonHierarchy", options.polygonHierarchy);
  if (options.perPositionHeight && defined_default(options.height)) {
    throw new DeveloperError_default(
      "Cannot use both options.perPositionHeight and options.height"
    );
  }
  if (defined_default(options.arcType) && options.arcType !== ArcType_default.GEODESIC && options.arcType !== ArcType_default.RHUMB) {
    throw new DeveloperError_default(
      "Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB."
    );
  }
  const polygonHierarchy = options.polygonHierarchy;
  const ellipsoid = options.ellipsoid ?? Ellipsoid_default.default;
  const granularity = options.granularity ?? Math_default.RADIANS_PER_DEGREE;
  const perPositionHeight = options.perPositionHeight ?? false;
  const perPositionHeightExtrude = perPositionHeight && defined_default(options.extrudedHeight);
  const arcType = options.arcType ?? ArcType_default.GEODESIC;
  let height = options.height ?? 0;
  let extrudedHeight = options.extrudedHeight ?? height;
  if (!perPositionHeightExtrude) {
    const h = Math.max(height, extrudedHeight);
    extrudedHeight = Math.min(height, extrudedHeight);
    height = h;
  }
  this._ellipsoid = Ellipsoid_default.clone(ellipsoid);
  this._granularity = granularity;
  this._height = height;
  this._extrudedHeight = extrudedHeight;
  this._arcType = arcType;
  this._polygonHierarchy = polygonHierarchy;
  this._perPositionHeight = perPositionHeight;
  this._perPositionHeightExtrude = perPositionHeightExtrude;
  this._offsetAttribute = options.offsetAttribute;
  this._workerName = "createPolygonOutlineGeometry";
  this.packedLength = PolygonGeometryLibrary_default.computeHierarchyPackedLength(
    polygonHierarchy,
    Cartesian3_default
  ) + Ellipsoid_default.packedLength + 8;
}
PolygonOutlineGeometry.pack = function(value, array, startingIndex) {
  Check_default.typeOf.object("value", value);
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  startingIndex = PolygonGeometryLibrary_default.packPolygonHierarchy(
    value._polygonHierarchy,
    array,
    startingIndex,
    Cartesian3_default
  );
  Ellipsoid_default.pack(value._ellipsoid, array, startingIndex);
  startingIndex += Ellipsoid_default.packedLength;
  array[startingIndex++] = value._height;
  array[startingIndex++] = value._extrudedHeight;
  array[startingIndex++] = value._granularity;
  array[startingIndex++] = value._perPositionHeightExtrude ? 1 : 0;
  array[startingIndex++] = value._perPositionHeight ? 1 : 0;
  array[startingIndex++] = value._arcType;
  array[startingIndex++] = value._offsetAttribute ?? -1;
  array[startingIndex] = value.packedLength;
  return array;
};
var scratchEllipsoid = Ellipsoid_default.clone(Ellipsoid_default.UNIT_SPHERE);
var dummyOptions = {
  polygonHierarchy: {}
};
PolygonOutlineGeometry.unpack = function(array, startingIndex, result) {
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  const polygonHierarchy = PolygonGeometryLibrary_default.unpackPolygonHierarchy(
    array,
    startingIndex,
    Cartesian3_default
  );
  startingIndex = polygonHierarchy.startingIndex;
  delete polygonHierarchy.startingIndex;
  const ellipsoid = Ellipsoid_default.unpack(array, startingIndex, scratchEllipsoid);
  startingIndex += Ellipsoid_default.packedLength;
  const height = array[startingIndex++];
  const extrudedHeight = array[startingIndex++];
  const granularity = array[startingIndex++];
  const perPositionHeightExtrude = array[startingIndex++] === 1;
  const perPositionHeight = array[startingIndex++] === 1;
  const arcType = array[startingIndex++];
  const offsetAttribute = array[startingIndex++];
  const packedLength = array[startingIndex];
  if (!defined_default(result)) {
    result = new PolygonOutlineGeometry(dummyOptions);
  }
  result._polygonHierarchy = polygonHierarchy;
  result._ellipsoid = Ellipsoid_default.clone(ellipsoid, result._ellipsoid);
  result._height = height;
  result._extrudedHeight = extrudedHeight;
  result._granularity = granularity;
  result._perPositionHeight = perPositionHeight;
  result._perPositionHeightExtrude = perPositionHeightExtrude;
  result._arcType = arcType;
  result._offsetAttribute = offsetAttribute === -1 ? void 0 : offsetAttribute;
  result.packedLength = packedLength;
  return result;
};
PolygonOutlineGeometry.fromPositions = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.positions", options.positions);
  const newOptions = {
    polygonHierarchy: {
      positions: options.positions
    },
    height: options.height,
    extrudedHeight: options.extrudedHeight,
    ellipsoid: options.ellipsoid,
    granularity: options.granularity,
    perPositionHeight: options.perPositionHeight,
    arcType: options.arcType,
    offsetAttribute: options.offsetAttribute
  };
  return new PolygonOutlineGeometry(newOptions);
};
PolygonOutlineGeometry.createGeometry = function(polygonGeometry) {
  const ellipsoid = polygonGeometry._ellipsoid;
  const granularity = polygonGeometry._granularity;
  const polygonHierarchy = polygonGeometry._polygonHierarchy;
  const perPositionHeight = polygonGeometry._perPositionHeight;
  const arcType = polygonGeometry._arcType;
  const polygons = PolygonGeometryLibrary_default.polygonOutlinesFromHierarchy(
    polygonHierarchy,
    !perPositionHeight,
    ellipsoid
  );
  if (polygons.length === 0) {
    return void 0;
  }
  let geometryInstance;
  const geometries = [];
  const minDistance = Math_default.chordLength(
    granularity,
    ellipsoid.maximumRadius
  );
  const height = polygonGeometry._height;
  const extrudedHeight = polygonGeometry._extrudedHeight;
  const extrude = polygonGeometry._perPositionHeightExtrude || !Math_default.equalsEpsilon(height, extrudedHeight, 0, Math_default.EPSILON2);
  let offsetValue;
  let i;
  if (extrude) {
    for (i = 0; i < polygons.length; i++) {
      geometryInstance = createGeometryFromPositionsExtruded(
        ellipsoid,
        polygons[i],
        minDistance,
        perPositionHeight,
        arcType
      );
      geometryInstance.geometry = PolygonGeometryLibrary_default.scaleToGeodeticHeightExtruded(
        geometryInstance.geometry,
        height,
        extrudedHeight,
        ellipsoid,
        perPositionHeight
      );
      if (defined_default(polygonGeometry._offsetAttribute)) {
        const size = geometryInstance.geometry.attributes.position.values.length / 3;
        let offsetAttribute = new Uint8Array(size);
        if (polygonGeometry._offsetAttribute === GeometryOffsetAttribute_default.TOP) {
          offsetAttribute = offsetAttribute.fill(1, 0, size / 2);
        } else {
          offsetValue = polygonGeometry._offsetAttribute === GeometryOffsetAttribute_default.NONE ? 0 : 1;
          offsetAttribute = offsetAttribute.fill(offsetValue);
        }
        geometryInstance.geometry.attributes.applyOffset = new GeometryAttribute_default({
          componentDatatype: ComponentDatatype_default.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: offsetAttribute
        });
      }
      geometries.push(geometryInstance);
    }
  } else {
    for (i = 0; i < polygons.length; i++) {
      geometryInstance = createGeometryFromPositions(
        ellipsoid,
        polygons[i],
        minDistance,
        perPositionHeight,
        arcType
      );
      geometryInstance.geometry.attributes.position.values = PolygonPipeline_default.scaleToGeodeticHeight(
        geometryInstance.geometry.attributes.position.values,
        height,
        ellipsoid,
        !perPositionHeight
      );
      if (defined_default(polygonGeometry._offsetAttribute)) {
        const length = geometryInstance.geometry.attributes.position.values.length;
        offsetValue = polygonGeometry._offsetAttribute === GeometryOffsetAttribute_default.NONE ? 0 : 1;
        const applyOffset = new Uint8Array(length / 3).fill(offsetValue);
        geometryInstance.geometry.attributes.applyOffset = new GeometryAttribute_default({
          componentDatatype: ComponentDatatype_default.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: applyOffset
        });
      }
      geometries.push(geometryInstance);
    }
  }
  const geometry = GeometryPipeline_default.combineInstances(geometries)[0];
  const boundingSphere = BoundingSphere_default.fromVertices(
    geometry.attributes.position.values
  );
  return new Geometry_default({
    attributes: geometry.attributes,
    indices: geometry.indices,
    primitiveType: geometry.primitiveType,
    boundingSphere,
    offsetAttribute: polygonGeometry._offsetAttribute
  });
};
var PolygonOutlineGeometry_default = PolygonOutlineGeometry;

// packages/engine/Source/Workers/createPolygonOutlineGeometry.js
function createPolygonOutlineGeometry(polygonGeometry, offset) {
  if (defined_default(offset)) {
    polygonGeometry = PolygonOutlineGeometry_default.unpack(polygonGeometry, offset);
  }
  polygonGeometry._ellipsoid = Ellipsoid_default.clone(polygonGeometry._ellipsoid);
  return PolygonOutlineGeometry_default.createGeometry(polygonGeometry);
}
var createPolygonOutlineGeometry_default = createPolygonOutlineGeometry;
export {
  createPolygonOutlineGeometry_default as default
};
