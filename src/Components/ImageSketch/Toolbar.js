import React from 'react'
import PropTypes from 'prop-types'

import { Menu, Icon } from 'semantic-ui-react'

import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/dist/rc-color-picker.css'

class Toolbar extends React.Component {
  /**
   * Adds a tool to the menu
   */
  addTool (name, icon, opts) {
    let iconProps = opts && opts.iconProps ? opts.iconProps : {}
    return (
      <Menu.Item
        name={name}
        active={this.props.tool === name}
        onClick={() => this.props.onChangeTool(name)}
      >
        <Icon name={icon} {...iconProps} />
      </Menu.Item>
    )
  }

  render () {
    return (
      <div className='sketch-toolbar'>
        <div>
          <Menu icon>
            {this.addTool('select', 'mouse pointer')}
            <Menu.Item name='lineColor' onClick={this.handleItemClick}>
              <ColorPicker
                color={this.props.lineColor}
                alpha={100}
                onClose={this.props.onChangeLineColor}
                placement='bottomLeft'
              />
            </Menu.Item>
            {this.addTool('pencil', 'pencil')}
            {this.addTool('line', 'window minimize')}
            {this.addTool('rectangle', 'square outline')}
            {this.addTool('circle', 'circle thin')}
            {this.addTool('text', 'font')}
            <Menu.Item
              name='undo'
              disabled={!this.props.canUndo}
              onClick={this.props.canUndo ? this.props.onUndo : null}
            >
              <Icon name='undo' color={this.props.canUndo ? 'black' : 'grey'} />
            </Menu.Item>
            <Menu.Item
              name='redo'
              disabled={!this.props.canRedo}
              onClick={this.props.canRedo ? this.props.onRedo : null}
            >
              <Icon name='undo' flipped='horizontally' color={this.props.canRedo ? 'black' : 'grey'} />
            </Menu.Item>
            <Menu.Item
              name='save'
              onClick={this.props.onSave}
            >
              <Icon name='save' />
            </Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}

Toolbar.propTypes = {
  tool: PropTypes.string,
  lineColor: PropTypes.string,
  canUndo: PropTypes.bool,
  canRedo: PropTypes.bool,
  onChangeTool: PropTypes.func,
  onChangeLineColor: PropTypes.func,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  onSave: PropTypes.func
}

export default Toolbar
