import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// persit reducer conteudo da roocktseeat no youtube para os dados não se perde
const persistConfig = {
  key: 'root-trivia',
  storage,
  whitelist: ['loginRedux'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
if (window.Cypress) {
  window.store = store;
}
