/* eslint no-unused-vars: 0 */
import FabricCanvasTool from './fabrictool'
const fabric = require('fabric').fabric

class Rectangle extends FabricCanvasTool {
  configureCanvas (props) {
    let canvas = this._canvas
    canvas.isDrawingMode = canvas.selection = false
    canvas.forEachObject(o => (o.selectable = o.evented = false))
    this._width = props.lineWidth
    this._color = props.lineColor
    this._fill = props.fillColor
  }

  doMouseDown (o) {
    let canvas = this._canvas
    this.isDown = true
    let pointer = canvas.getPointer(o.e)
    this.startX = pointer.x
    this.startY = pointer.y
    let text = window.prompt('Text')

    if (text) {
      let iText = new fabric.IText(text)
      iText.set({
        'left': this.startX,
        'top': this.startY,
        'stroke': this._color,
        'fill': this._color,
        'fontFamily': 'arial'
      })
      canvas.add(iText)
    }
  }
}

export default Rectangle
