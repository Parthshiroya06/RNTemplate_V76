export interface IProfileDetails {
  name?: string | null;
  email?: string | null;

  uid?: string;
  giro_coin: number;
}
export interface IRootReduxState {
  userDetails: {
    isLogin: string;
    profileDetails: IProfileDetails;
    themeMode: string;
  };
}
