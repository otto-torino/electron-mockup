export default (mockup) => {
  let steps = [
    {
      title: 'Revision Detail Page',
      text: 'This is the page where you can find all the information relevant to a mockup and a particular revision. The top toolbar contains all the buttons used to retrieve such information.',
      selector: '.app-logo',
      position: 'top',
      type: 'click',
      name: 'otto-mockup-tour'
    },
    {
      title: 'Revisions Sidebar',
      text: 'You can easily navigate between all the mockup revisions by opening the revisions sidebar, just press this button ;)',
      selector: '.menu-revisions-sidebar',
      position: 'top',
      type: 'click',
      name: 'menu-revisions-sidebar',
      allowClicksThruHole: true
    },
    {
      title: 'Comments sidebar',
      text: 'Pressing this button you\'ll open the comments sidebar. Here you can see the comments thread, reply or post a new comment, upload files and edit uploaded images.',
      selector: '.menu-comments-sidebar',
      position: 'top',
      type: 'click',
      name: 'menu-comments-sidebar',
      allowClicksThruHole: true
    }
  ]
  if (mockup.changelog) {
    steps.push(
      {
        title: 'Changelog Modal',
        text: 'Press this button to open the changelog modal. Do it later ;)',
        selector: '.menu-changelog-modal',
        position: 'top',
        type: 'click',
        name: 'menu-changelog-modal'
      }
    )
  }
  if (mockup.documents.length) {
    steps.push(
      {
        title: 'Documents Modal',
        text: 'Press this button to view all the documents attached to the mockup. Do it later ;)',
        selector: '.menu-documents-modal',
        position: 'top',
        type: 'click',
        name: 'menu-documents-modal'
      }
    )
  }
  if (mockup.rawFilePath) {
    steps.push(
      {
        title: 'QR Code Modal',
        text: 'Press this button to view the QR code which will take you to the raw revision page. Do it later ;)',
        selector: '.menu-raw-modal',
        position: 'top',
        type: 'click',
        name: 'menu-raw-modal'
      }
    )
  }
  steps.push(
    {
      title: 'Restart your Tour',
      text: 'You can restart the tour at any time, just pressing the help icon.<br /><b>Have a nice day!</b>',
      selector: '.tour-icon',
      position: 'top-right',
      type: 'click',
      name: 'tour-icon'
    }
  )
  return steps
}
