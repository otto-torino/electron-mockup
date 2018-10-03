export default {
  basePath: '/',
  baseAbsPath:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/'
      : 'https://mockups.sqrt64.it/',
  apiBasePath:
    process.env.NODE_ENV !== 'production'
      // ? 'http://localhost:8000/api/v1/'
      ? 'https://adminmockups.sqrt64.it/api/v1/'
      : 'https://adminmockups.sqrt64.it/api/v1/',
  wsBasePath:
    process.env.NODE_ENV !== 'production'
      // ? 'ws://localhost:8000'
      ? 'wss://adminmockups.sqrt64.it'
      : 'wss://adminmockups.sqrt64.it',
  defaultGravatar: 'retro',
  refreshInterval: 5 * 60 * 1000 // 5 min
}
