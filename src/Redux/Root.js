import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as startupReducer} from './Startup'
import {reducer as uiReducer} from './Ui'
import {reducer as authReducer} from './Auth'
import {reducer as profileReducer} from './Profile'
import {reducer as mockupsReducer} from './Mockups'
import {reducer as archivedMockupsReducer} from './ArchivedMockups'
import {reducer as lastCommentsReducer} from './LastComments'
import {reducer as commentsReducer} from './Comments'
import {reducer as LastUpdatesReducer} from './LastUpdates'
import {reducer as AnalyticsReducer} from './Analytics'

export default combineReducers({
  startup: startupReducer,
  routing: routerReducer,
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  mockups: mockupsReducer,
  archivedMockups: archivedMockupsReducer,
  lastComments: lastCommentsReducer,
  lastUpdates: LastUpdatesReducer,
  comments: commentsReducer,
  analytics: AnalyticsReducer
})
