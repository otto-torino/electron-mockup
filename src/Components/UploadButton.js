import React from 'react'
import PropTypes from 'prop-types'

const UploadButton = ({label, onUpload, id}) => {
  let fileInput = null
  // If no id was specified, generate a random one
  const uid = id || Math.random().toString(36).substring(7)

  return (
    <span>
      <label htmlFor={uid} className='ui icon button'>
        <i className='upload icon' />
        {label}
      </label>
      <input type='file' id={uid}
        style={{display: 'none'}}
        onChange={() => {
          onUpload(fileInput.files[0])
        }}
        ref={input => {
          fileInput = input
        }}
      />
    </span>
  )
}

UploadButton.propTypes = {
  label: PropTypes.string,
  onUpload: PropTypes.func,
  id: PropTypes.string
}

export default UploadButton
