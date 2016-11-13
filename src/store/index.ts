const persistState = require('redux-sessionstorage');

export const enhancers = [
  persistState('data', { key: '__anarajcevic.com__' })
  ];

if (window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}


