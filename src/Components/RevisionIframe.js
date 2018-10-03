import React from 'react'
import PropTypes from 'prop-types'

const RevisionIframe = props => {
  return (
    <div
      className='iframe-container'
    >
      <iframe
        title={'Revision ' + props.revision.revision}
        src={props.revision.mainFileAbsUrl}
        frameBorder='0'
      />
    </div>
  )
}

RevisionIframe.propTypes = {
  mockup: PropTypes.object.isRequired,
  revision: PropTypes.object.isRequired
}

export default RevisionIframe
