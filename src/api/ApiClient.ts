import axios, { AxiosInstance } from 'axios';

class ApiClient {
  public baseUrl: AxiosInstance;
  public reportUrl: AxiosInstance;
  public header: any = {};

  public constructor () {
    this.baseUrl = axios.create({ baseURL: process.env.VUE_APP_API_URL });
    this.reportUrl = axios.create({ baseURL: process.env.VUE_APP_REPORT_API_URL });
    this.header = { 'Content-Type': 'application/json' };
  }

  public getToken (data: any) {
    return this.baseUrl.request({
      method: 'post',
      url: './PHCTEST/gtkn',
      data: data,
      headers: {
        Authorization: 'Bearer JWT_token',
        ...this.header
      }
    });
  }

  public sendData (data: any, auth: string) {
    return this.baseUrl.request({
      method: 'post',
      url: './PHCC/PHCB',
      data: data,
      headers: {
        Authorization: `Bearer ${auth}`,
        ...this.header
      }
    });
  }

  public getList (type: any, auth: string) {
    return this.baseUrl.request({
      method: 'POST',
      url: '/PHCC/Subjectlist',
      data: type,
      headers: {
        Authorization: `Bearer ${auth}`,
        ...this.header
      }
    });
  }

  public get192Token (data: any) {
    return this.reportUrl.request({
      method: 'post',
      url: './PHCTEST/gtkn',
      data: data,
      headers: {
        Authorization: 'Bearer JWT_token',
        ...this.header
      }
    });
  }

  public getReport (data: any) {
    return this.reportUrl.request({
      method: 'POST',
      url: './PHCC/PHCB_Result',
      data: data,
      headers: {
        Authorization: 'Bearer JWT_token',
        ...this.header
      }
    });
  }
}

const ApiClientInstance = new ApiClient();
export default ApiClientInstance;
