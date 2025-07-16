// import {Dispatch} from '@reduxjs/toolkit';
import {getAxiosInstance} from '@services';

export const performGetRequest = (endpoint: string) => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();

      const response = await wrapper.get(endpoint);

      console.log(
        'check response >>>>',
        JSON.stringify(response.data, null, 2),
      );
      return response.data;
    } catch (error: any) {
      console.log('check error is >>>', error);
      throw error;
    }
  };
};

export const performPostRequest = (endPoint: string, jsonRequest: any) => {
  //   return async (dispatch: Dispatch, getState: any): Promise<any> => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();
      const response = await wrapper.post(endPoint, jsonRequest);
      return response;
    } catch (error: any) {
      throw error;
    }
  };
};
export const performPutRequest = (endPoint: string, jsonRequest: any) => {
  //   return async (dispatch: Dispatch, getState: any): Promise<any> => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();
      const response: any = await wrapper.put(endPoint, jsonRequest);
      return response;
    } catch (error: any) {
      throw error;
    }
  };
};

export const performDeleteRequest = (endPoint: string, jsonRequest?: any) => {
  // return async (dispatch: Dispatch, getState: any): Promise<any> => {
  return async (): Promise<any> => {
    try {
      let wrapper = getAxiosInstance();
      const response: any = await wrapper.delete(endPoint, {
        data: jsonRequest,
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  };
};

export const performParallelRequest = async (
  jsonArray: Promise<any>[],
): Promise<any[]> => {
  try {
    const responses = await Promise.all(jsonArray);
    return responses;
  } catch (error) {
    throw error;
  }
};
