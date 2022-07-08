
import { Dispatch } from 'react';
import { GetApi } from '../../../../network/ApiCall'


export interface DataAction {
  readonly type: 'GET_DATA';
  payload: any;
}

export interface ErrorAction {
  readonly type: 'ON_ERROR';
  payload: any;
}

export type UserAction = DataAction | ErrorAction;

export const onDataPodCast = (srchTxt: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await GetApi(`search?term=${srchTxt}&entity=podcastEpisode`);
      if (!response) {
        dispatch({
          type: 'ON_ERROR',
          payload: 'Issue with API',
        });
      } else {
        dispatch({
          type: 'GET_DATA',
          payload: JSON.parse(response).results,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_ERROR',
        payload: error,
      });
    }
  };
};
