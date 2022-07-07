import { UserAction } from '../actions/UserActions';

type UserState = {
  data: any;
  error: string | undefined;
};

const initialState = {
  data: {} as any,
  error: undefined,
};

const PodcastReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'ON_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { PodcastReducer };
