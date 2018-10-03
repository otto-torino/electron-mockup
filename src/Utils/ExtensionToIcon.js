const dict = {
  'jpeg': 'file image outline',
  'jpg': 'file image outline',
  'png': 'file image outline',
  'gif': 'file image outline',
  'pdf': 'file pdf outline',
  'odt': 'file word outline',
  'doc': 'file word outline',
  'docx': 'file word outline',
  'xls': 'file excel outline',
  'xlsx': 'file excel outline',
  'ods': 'file excel outline',
  'csv': 'file excel outline',
  'ppt': 'file powerpoint outline',
  'zip': 'file archive outline',
  'rar': 'file archive outline',
  'tar': 'file archive outline',
  'gz': 'file archive outline'
}

export default (extension) => {
  return dict[extension] || 'file outline'
}
