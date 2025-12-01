// 引数:文字列, 制限文字数
// 文字列が文字数制限以下の長さの場合にはそのままの文字列を返す。
// 文字列が文字数制限以上の長さの場合には、文字列を文字数制限の長さまででカットし、最後に”…”を追加した文字列を返す。
export const limitString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return `${str.slice(0, maxLength)}...`;
  }
};
