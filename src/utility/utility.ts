import Cookies from 'js-cookie';
import { forEach, cloneDeep, random } from 'lodash-es';
import * as crypto from 'crypto';

export function setCookie (cookieName: string, cookieObj: any) {
  const cookieExpiresDay: any = {
    Login: {
      email: {
        expires: 365 * 10 // days
      },
      rememberEmail: {
        expires: 365 * 10
      }
    },
    user: {
      userName: {
        expires: 1 / 24
      }
    },
    api: {
      token: {
        expires: 1 / 24
      },
      loginToken: {
        expires: 1 / 24
      },
      sinopacToken: {
        expires: 1 / 24
      }
    },
    investDiagnosis: {
      userAge: {
        expires: 3
      },
      questions: {
        expires: 3
      },
      reload: {
        expires: 1 / 24
      },
      hasNoTickerId: {
        expires: 1 / 24
      },
      selectionAuto: {
        expires: 1 / 24
      }
    },
    google: {
      googleUserName: {
        expires: 1 / 24
      },
      gmail: {
        expires: 1 / 24
      },
      googleId: {
        expires: 1 / 24
      }
    },
    yahoo: {
      yahooData: {
        expires: 1 / 24
      },
      yahooAction: {
        expires: 1 / 24
      },
      errResponse: {
        expires: 1 / 24
      },
      keepSearch: {
        expires: 1 / 24
      }
    },
    register: {
      data: {
        expires: 1 / 24
      }
    },
    source: {
      camp: {
        expires: 1 / 24
      },
      ABtest: {
        expires: 1 / 24
      }
    }
  };

  forEach(cookieExpiresDay[cookieName], (expiresDayObj: any, key: string) => {
    if (cookieObj[key] !== undefined) {
      Cookies.set(key, cookieObj[key], expiresDayObj);
    }
  });
}

export function getCookie (name: string) {
  const cookieName: any = {
    Login: ['email', 'rememberEmail', 'rememberEmail'],
    user: ['userName'],
    api: ['token', 'loginToken', 'sinopacToken'],
    investDiagnosis: ['userAge', 'questions', 'reload', 'hasNoTickerId', 'selectionAuto', 'hasNoTickerId', 'selectionAuto'],
    google: ['googleUserName', 'gmail', 'googleId'],
    yahoo: ['yahooData', 'yahooAction', 'errResponse', 'keepSearch'],
    register: ['data'],
    source: ['camp', 'ABtest']
  };

  const data: any = {};
  for (const nameItem of cookieName[name]) {
    data[nameItem] = Cookies.get(nameItem);
  }

  return data;
}

export function removeCookie (name: Array<string>) {
  const cookieClear = name.map((item: string) => {
    return Cookies.remove(item);
  });
}

export function rules (ruleName: string) {
  const rule: any = {
    required: (value: any) => !!value || '此欄位必填',
    cellphone: (value: any) => {
      const patt = /[0][9][0-9]{8}/g;
      return (patt.test(value) && value.length === 10) || '格式不正確';
    },
    mail: (value: any) => /.+@.+\..+/.test(value) || '格式不正確',
    couponCode: (value: any) => (value && value.length >= 17) || '格式不正確',
    checkNumber: (value: any) => {
      let reg = /^\d+(\.\d{1,2})?$/;
      return reg.test(value) || '格式不正確'},
    age: (value: any) => (value >= 0 && value <= 90) || '格式不正確'
  };
  return rule[ruleName];
}

export function randomText (length: number) {
  let result = '';
  const numGroup = [[48, 57], [65, 90], [97, 122]];
  // 0~9  A ~ Z  a ~ z

  for (let i = 0; i < length; i++) {
    result = result + String.fromCharCode(random(numGroup[i % 3][0], numGroup[i % 3][1]));
  }

  return result;
}

export function encrypt (text: string | number, aesKey: string) {
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey.substr(0, 32), aesKey.substr(aesKey.length - 16));
  let crypted = cipher.update(text, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = Buffer.from(crypted, 'binary').toString('base64');
  return crypted;
}

export function decrypt (text: string, aesKey: string) {
  const crypted = Buffer.from(text, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey.substr(0, 32), aesKey.substr(aesKey.length - 16));
  let decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');

  return decoded;
}
