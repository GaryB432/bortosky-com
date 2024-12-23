# package-explorer

[registry/docs/responses/package-metadata.md at main · npm/registry](https://github.com/npm/registry/blob/main/docs/responses/package-metadata.md)

[Family Tree | Graphviz](https://graphviz.org/Gallery/directed/kennedyanc.html)

[Graphviz Visual Editor](http://magjac.com/graphviz-visual-editor/)

[Mermaid Cheat Sheet @ https://jojozhuang.github.io](https://jojozhuang.github.io/tutorial/mermaid-cheat-sheet/)

[Examples | Mermaid](https://mermaid.js.org/syntax/examples.html)

[registry.npmjs.com/venv](https://registry.npmjs.com/venv)

[registry.npmjs.com/venv/1.0.1](https://registry.npmjs.com/venv/1.0.1)

[node.js - Get versions from npm registry api - Stack Overflow](https://stackoverflow.com/questions/48180999/get-versions-from-npm-registry-api/61369205#61369205)

## Cytoscape

[Using layouts · Cytoscape.js](https://blog.js.cytoscape.org/2020/05/11/layouts/)

[cytoscape/cytoscape.js-dagre: The Dagre layout for DAGs and trees for Cytoscape.js](https://github.com/cytoscape/cytoscape.js-dagre)

[dagrejs/dagre: Directed graph layout for JavaScript](https://github.com/dagrejs/dagre)

## Context

```mermaid
graph TD
A[room]
A -.-> bathroom
A -.-> kitchen
B[bathing]
B -.-> bathroom
C[cooking]
C -.-> kitchen
```

## tplant

[tplant/test/Playground/RayTracer](https://github.com/bafolts/tplant/tree/67ceef69e2f9027270a022b985b24cee636dab25/test/Playground/RayTracer)

[tplant/test/mermaid/results/playground_raytracer](https://github.com/bafolts/tplant/blob/67ceef69e2f9027270a022b985b24cee636dab25/test/mermaid/results/playground_raytracer)

```mermaid
classDiagram
class Vector {
    +x: number
    +y: number
    +z: number
    +times(k: number, v: Vector)$: Vector
    +minus(v1: Vector, v2: Vector)$: Vector
    +plus(v1: Vector, v2: Vector)$: Vector
    +dot(v1: Vector, v2: Vector)$: number
    +mag(v: Vector)$: number
    +norm(v: Vector)$: Vector
    +cross(v1: Vector, v2: Vector)$: Vector
}
class Ray {
    +start: Vector
    +dir: Vector
}
<<Interface>> Ray
class Intersection {
    +thing: Thing
    +ray: Ray
    +dist: number
}
<<Interface>> Intersection
class Color {
    +r: number
    +g: number
    +b: number
    +scale(k: number, v: Color)$: Color
    +plus(v1: Color, v2: Color)$: Color
    +times(v1: Color, v2: Color)$: Color
    +white$: Color
    +grey$: Color
    +black$: Color
    +background$: Color
    +defaultColor$: Color
    +toDrawingColor(c: Color)$: Inline
}
class Surface {
    +diffuse: (pos: Vector) => Color
    +specular: (pos: Vector) => Color
    +reflect: (pos: Vector) => number
    +roughness: number
}
<<Interface>> Surface
class Thing {
    +intersect: (ray: Ray) => Intersection
    +normal: (pos: Vector) => Vector
    +surface: Surface
    +destroy(): void
    +destroy(name: string): void
}
<<Interface>> Thing
class Light {
    +pos: Vector
    +color: Color
}
<<Interface>> Light
class Camera {
    +forward: Vector
    +right: Vector
    +up: Vector
    +pos: Vector
}
class Scene {
    +things: Thing[]
    +lights: Light[]
    +camera: Camera
}
<<Interface>> Scene
Thing <|.. Plane
class Plane {
    +normal: (pos: Vector) => Vector
    +intersect: (ray: Ray) => Intersection
    +surface: Surface
}
Thing <|.. Sphere
class Sphere {
    +radius2: number
    +center: Vector
    +surface: Surface
    +normal(pos: Vector): Vector
    +intersect(ray: Ray): Inline
}
class RayTracer {
    -maxDepth: number
    -intersections(ray: Ray, scene: Scene): Intersection
    -testRay(ray: Ray, scene: Scene): number
    -traceRay(ray: Ray, scene: Scene, depth: number): Color
    -shade(isect: Intersection, scene: Scene, depth: number): Color
    -getReflectionColor(thing: Thing, pos: Vector, normal: Vector, rd: Vector, scene: Scene, depth: number): Color
    -getNaturalColor(thing: Thing, pos: Vector, norm: Vector, rd: Vector, scene: Scene): any
    +render(scene: any, ctx: any, screenWidth: any, screenHeight: any): void
}
Ray ..> "1" Vector
Intersection ..> "1" Thing
Intersection ..> "1" Ray
Surface ..> "1" Vector
Surface ..> "1" Color
Thing ..> "1" Ray
Thing ..> "1" Intersection
Thing ..> "1" Vector
Thing ..> "1" Surface
Light ..> "1" Vector
Light ..> "1" Color
Camera ..> "1" Vector
Scene ..> "*" Thing
Scene ..> "*" Light
Scene ..> "1" Camera
Plane ..> "1" Vector
Plane ..> "1" Ray
Plane ..> "1" Intersection
Plane ..> "1" Surface
Sphere ..> "1" Vector
Sphere ..> "1" Surface
Sphere ..> "1" Ray
RayTracer ..> "1" Ray
RayTracer ..> "1" Scene
RayTracer ..> "1" Intersection
RayTracer ..> "1" Color
RayTracer ..> "1" Thing
RayTracer ..> "1" Vector

```
