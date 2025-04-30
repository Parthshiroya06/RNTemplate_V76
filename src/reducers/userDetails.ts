import {reduxTypes} from '@constants';

import {IProfileDetails} from '@types';

// export interface IUserState {
//   isLogin: boolean;
// }

interface IAction {
  type: string;
  isLogin: boolean;
  profileDetails: IProfileDetails;
  themeMode: string;
  language_code: string;
}

const initialValue = {
  isLogin: false,
  profileDetails: null,
  themeMode: 'Auto',
  language_code: 'en_US',
};
export const userDetails = (state = initialValue, action: IAction) => {
  switch (action.type) {
    case reduxTypes.IS_USER_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case reduxTypes.PROFILE_DATA:
      return {
        ...state,
        profileDetails: action.profileDetails,
      };
    case reduxTypes.THEME_MODE:
      return {
        ...state,
        themeMode: action.themeMode,
      };
    case reduxTypes.LANGUAGE_CODE:
      return {
        ...state,
        language_code: action.language_code,
      };
    case reduxTypes.RESET_DATA:
      return initialValue;
    default:
      return state;
  }
};
