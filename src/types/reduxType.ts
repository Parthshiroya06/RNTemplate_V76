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
    language_code: string;
    select_currency: currencySysmbol;
  };
}

export interface currencySysmbol {
  country: string;
  locale: string;
  symbol: string;
  code: string;
  name: string;
}
