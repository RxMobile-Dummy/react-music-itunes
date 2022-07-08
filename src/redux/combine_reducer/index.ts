import { combineReducers } from "redux";
import { MusicReducer } from "../../screens/Music/music_redux/reducers/MusicReducer";
import { PodcastReducer } from "../../screens/Podcast/podcast_redux/reducers/PodCastReducer";
const rootReducer = combineReducers({
  musicReducer: MusicReducer,
  podcastReducer: PodcastReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
