const persistState = require('redux-sessionstorage');

export const enhancers = [
  persistState('applicationData', { key: '__anarajcevic.com__' })
  ];

if (window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}


