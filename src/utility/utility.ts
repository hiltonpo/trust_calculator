import Cookies from 'js-cookie';
import * as echarts from 'echarts/core';
import { forEach, cloneDeep, random } from 'lodash-es';
import * as crypto from 'crypto';

export const preffix = 'TWD $';
export const suffix = {
  year: '年',
  old: '歲',
  everyMonth: '/每月',
  everyYear: '/每年',
  percentage: '%'
};

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
      const reg = /^\d+(\.\d{1,2})?$/;
      return reg.test(value) || '格式不正確';
    },
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

// 數字添加千分位逗點 適用負數與小數點
export function toThousand (num: number, digits = 0) {
  function thousand (integerStr: string) {
    const arr = [];
    let integerLength = integerStr.length;
    while (true) {
      arr.unshift(integerStr.substring(Math.max(integerLength - 3, 0), integerLength));
      integerLength = integerLength - 3;
      if (Math.max(integerLength, 0) === 0) break;
    }
    return arr.join(',');
  }

  const money = (Number(num)).toFixed(digits);
  const float = money.split('.')[1];
  let number;
  // 負數 不含小數點
  if (money.includes('-') && digits) {
    number = money.toString().substr(1, money.length).split('.')[0];
    return `-${thousand(number)}.${float}`;
  }
  // 負數 含小數點
  if (money.includes('-') && !digits) {
    return thousand(money);
  }
  // 正數 不含小數點
  if (!money.includes('-') && !digits) {
    return thousand(money);
  }
  // 正數 含小數點
  if (!money.includes('-') && digits) {
    number = money.toString().split('.')[0];
    return `${thousand(number)}.${float}`;
  }
}

/**
 * 以下兩個函式為 Echarts 升級 版本後修復 Dom 重複 init 警告所用
 */
export function initEchartsWhenMounted (domIdStr: string) {
  const ele: any = document.getElementById(domIdStr);
  if (ele.getAttribute('_echarts_instance_') === null) {
    return echarts.init(ele as HTMLCanvasElement);
  }
}

export function renderEchartsDom (thisObj: any, option: any) {
  setTimeout(() => {
    // thisObj.clear(); // 清除樣式
    thisObj && thisObj.setOption(option, true);
    thisObj && thisObj.resize();
  }, 10);
}
