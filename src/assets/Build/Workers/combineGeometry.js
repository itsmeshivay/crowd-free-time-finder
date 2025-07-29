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
  PrimitivePipeline_default
} from "./chunk-KGB6H3RI.js";
import {
  createTaskProcessorWorker_default
} from "./chunk-S2BFGC4W.js";
import "./chunk-NZVPOOOT.js";
import "./chunk-QXOWDZYZ.js";
import "./chunk-E7KSST7M.js";
import "./chunk-UXCG22U4.js";
import "./chunk-AZK5KSZ4.js";
import "./chunk-ILTPHRDS.js";
import "./chunk-6FY4D6KD.js";
import "./chunk-BF2HFWMG.js";
import "./chunk-QKYGO6XL.js";
import "./chunk-76WKZOUK.js";
import "./chunk-3UEVA4NO.js";
import "./chunk-XLDLCV2F.js";
import "./chunk-Z2GDV3MT.js";
import "./chunk-Q6SJKTTQ.js";
import "./chunk-ADA7OX2I.js";
import "./chunk-G2VBRELF.js";
import "./chunk-UX2S2KIQ.js";
import "./chunk-SKVVOFGK.js";

// packages/engine/Source/Workers/combineGeometry.js
function combineGeometry(packedParameters, transferableObjects) {
  const parameters = PrimitivePipeline_default.unpackCombineGeometryParameters(packedParameters);
  const results = PrimitivePipeline_default.combineGeometry(parameters);
  return PrimitivePipeline_default.packCombineGeometryResults(
    results,
    transferableObjects
  );
}
var combineGeometry_default = createTaskProcessorWorker_default(combineGeometry);
export {
  combineGeometry_default as default
};
