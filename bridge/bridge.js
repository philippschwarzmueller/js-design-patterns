/*
* kinda pseudo code
*/

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
  draw() {/* implement */ }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }
  this.renderer.drawCircle(this.radius);
}

class Square extends Shape {
}

class Renderer {
  drawCircle() {/* implement */ }
}

class RasterRenderer extends Renderer {

}

class RasterRenderer extends Renderer {

}

// now with different rendering (vector, raster)
// -> CircleVector CircleRaster etc. => STATE SPACE EXPLOSION

// Shape(renderer)
// Renderer
