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
  Frozen_default
} from "./chunk-Z2GDV3MT.js";

// packages/engine/Source/Core/GeometryAttributes.js
function GeometryAttributes(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  this.position = options.position;
  this.normal = options.normal;
  this.st = options.st;
  this.bitangent = options.bitangent;
  this.tangent = options.tangent;
  this.color = options.color;
}
var GeometryAttributes_default = GeometryAttributes;

export {
  GeometryAttributes_default
};
