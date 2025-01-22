import { combineReducers } from "redux";
import awardsReducer from "./awardsReducer";
import aktuelnostiReducer from "./aktuelnostiReducer";
import aktuelnostiDetailsReducer from "./aktuelnostiDetailsReducer";
import tribineReducer from "./tribineReducer";
import membersReducer from "./membersReducer";
import sliderReducer from "./sliderReducer";
import razgovoriReducer from "./razgovoriReducer";

const rootReducer = combineReducers({
  awards: awardsReducer,
  aktuelnosti: aktuelnostiReducer,
  aktuelnostiDetails: aktuelnostiDetailsReducer,
  tribine: tribineReducer,
  members: membersReducer,
  slider: sliderReducer,
  razgovori: razgovoriReducer,
});

export default rootReducer;
