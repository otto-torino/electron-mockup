export default [
  {
    title: 'Otto Mockup Tour',
    text: 'Welcome to the <b>Otto Mockup Application</b>.<br />Let\'s have a tour covering the main functionalities of this application. You can follow it later if you want, by just clicking the help icon in the page footer.',
    selector: '.app-logo',
    position: 'top',
    type: 'click',
    name: 'otto-mockup-tour'
  },
  {
    title: 'User Area',
    text: 'Here is your user area, just click above your username to see the allowed options. You can access your settings page and logout from the application at any time.<br />The image shown is the <a href="https://en.gravatar.com/" target="_blank">gravatar</a> associated with your email address (you\'ll see a default icon if no image is associated).',
    selector: '.user-area',
    position: 'top-center',
    type: 'click',
    name: 'user-area'
  },
  {
    title: 'Projects Dashboard',
    text: 'In this table you can see all your active projects. You can search through a paginated list and perform actions. Clicking over a project name will take you to the project detail page of the last available revision.',
    selector: '.projects-dashboard',
    position: 'top',
    type: 'click',
    name: 'projects-dashboard'
  },
  {
    title: 'Archived Projects',
    text: 'Old projects are periodically archived, you can switch between published and archived projects just by pressing this button.',
    selector: '.switch-mockups-status',
    position: 'top',
    type: 'click',
    name: 'switch-mockups-status'
  },
  {
    title: 'Project Actions',
    text: 'The available actions for every project (if grayed out, then are not available):<ul><li>view changelog</li><li>view documents</li><li>view QR code that links to the raw mockup version</li></ul>',
    selector: '.first-row-actions',
    position: 'top',
    type: 'click',
    name: 'first-row-actions'
  },
  {
    title: 'Last Updates',
    text: 'A brief summary of the last updates occurred. Click a revision item to go to its detail page.',
    selector: '.last-updates-dashboard',
    position: 'top',
    type: 'click',
    name: 'last-updates-dashboard'
  },
  {
    title: 'Last Comments',
    text: 'Here you can find the last inserted comments, click the <i>thread</i> link to go to the revision detail page with the comments thread open.',
    selector: '.last-comments-dashboard',
    position: 'top',
    type: 'click',
    name: 'last-comments-dashboard'
  },
  {
    title: 'Restart your Tour',
    text: 'You can restart the tour at any time, just pressing the help icon.<br /><b>Have a nice day!</b>',
    selector: '.tour-icon',
    position: 'top-right',
    type: 'click',
    name: 'tour-icon'
  }
]
