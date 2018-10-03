import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

class RevisionIframeFullscreen extends React.Component {
  componentDidMount (prevProps) {
    this.load()
  }

  load () {
    this.nodes = {}
    this.storeViewport()
    this.setFrameProps()
    this.storeRatio()
    this.styleNodes()
    this.sizeNodes()
    $(window).on('orientationchange', function () {
      window.location.reload()
    })
  }

  storeViewport () {
    this.viewport = {
      w: $(window).width(),
      h: $(window).height()
    }
    this.viewport.layout =
      this.viewport.w > this.viewport.h ? 'landscape' : 'portrait'
  }

  setFrameProps () {
    let {width, height} = this.props.mockup
    var layout = width > height ? 'landscape' : 'portrait'
    this.frameProps = {
      w: layout === this.viewport.layout ? width : height,
      h: layout === this.viewport.layout ? height : width
    }
    console.info('frame props: ', this.props)
  }

  storeRatio () {
    var viewportRatio = this.viewport.w / this.viewport.h
    var originalRatio = this.frameProps.w / this.frameProps.h

    let ratio
    if (originalRatio > viewportRatio) {
      ratio = this.frameProps.w / this.viewport.w
    } else {
      ratio = this.frameProps.h / this.viewport.h
    }
    console.info('viewport: ', this.viewport)
    console.info('frame: ', this.frameProps)
    console.info('ratio: ', ratio)
    this.ratio = ratio
  }

  styleNodes () {
    $('.iframe-container')
      .css({
        margin: 'auto',
        'transform-origin': 'center center 0',
        position: 'relative',
        overflow: 'hidden'
      })
    $('.iframe-body')
      .css({
        position: 'absolute',
        width: '100%',
        'transform-origin': '0 0 0'
      })
  }

  sizeNodes () {
    $('.iframe-container').css({
      width: Math.floor(this.frameProps.w / this.ratio) + 'px',
      height: Math.floor(this.frameProps.h / this.ratio) + 'px'
    })
    $('.iframe-body').css({
      transform: 'scale(' + Math.floor(100 / this.ratio) / 100 + ')'
    })

    $('iframe').css({
      width: this.frameProps.w + 'px',
      height: this.frameProps.h + 'px'
    })
  }

  render () {
    return (
      <div
        className='iframe-container'
        style={{ background: this.props.mockup.backgroundColor }}
      >
        <div className='iframe-body'>
          <iframe
            title={'Revision ' + this.props.revision.revision}
            src={this.props.revision.rawFileAbsUrl}
            style={{
              width: this.props.mockup.width,
              height: this.props.mockup.height
            }}
            frameBorder='0'
          />
        </div>
      </div>
    )
  }
}

RevisionIframeFullscreen.propTypes = {
  mockup: PropTypes.object.isRequired,
  revision: PropTypes.object.isRequired
}

export default RevisionIframeFullscreen
