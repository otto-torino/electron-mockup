import React from 'react'
import PropTypes from 'prop-types'

import { SketchField, Tools } from '../../Lib/react-sketch'

import SketchToolbar from '../ImageSketch/Toolbar'

import './styles.css'

class ImageSketch extends React.Component {
  constructor () {
    super()
    this.state = {
      lineColor: '#000',
      lineWidth: 10,
      tool: Tools.Pencil,
      canUndo: false,
      canRedo: false
    }
    this.onSketchChange = this.onSketchChange.bind(this)
    this.changeTool = this.changeTool.bind(this)
    this.changeLineColor = this.changeLineColor.bind(this)
    this.undo = this.undo.bind(this)
    this.redo = this.redo.bind(this)
    this.save = this.save.bind(this)
  }

  // set image as background
  componentDidMount (prevProps) {
    if (this.props.image && this.refs['sketch']) {
      this._sketch = this.refs['sketch']
      this._sketch.setBackgroundFromDataUrl(this.props.image.dataUri, false)
    }
  }

  changeTool (tool) {
    this.setState({ tool: tool })
  }

  changeLineColor (color) {
    this.setState({ lineColor: color.color })
  }

  undo () {
    this._sketch.undo()
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo()
    })
  }

  redo () {
    this._sketch.redo()
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo()
    })
  }

  onSketchChange () {
    let prev = this.state.canUndo
    let now = this._sketch.canUndo()
    if (prev !== now) {
      this.setState({canUndo: now})
    }
  }

  save () {
    let image = this._sketch.toDataURL()
    this.props.onSave(image)
  }

  render () {
    return (
      <div className='sketch'>
        <SketchToolbar
          tool={this.state.tool}
          lineColor={this.state.lineColor}
          canUndo={this.state.canUndo}
          canRedo={this.state.canRedo}
          onChangeTool={this.changeTool}
          onChangeLineColor={this.changeLineColor}
          onUndo={this.undo}
          onRedo={this.redo}
          onSave={this.save}
        />
        <SketchField
          ref='sketch'
          width={this.props.image.dimensions.width + 'px'}
          height={this.props.image.dimensions.height + 'px'}
          tool={this.state.tool}
          lineColor={this.state.lineColor}
          lineWidth={3}
          onChange={this.onSketchChange}
        />
      </div>
    )
  }
}

ImageSketch.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    dimensions: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }),
    dataUri: PropTypes.string
  }),
  onSave: PropTypes.func
}

export default ImageSketch
