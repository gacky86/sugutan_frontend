const CheckEmailMessage = () => {
  return (
    <div className="max-w-md m-auto text-center">
      <div className="my-6">
        <h2 className="text-2xl">仮登録完了画面</h2>
      </div>
      <div className="text-left">
        <p>
          仮登録が完了しました。ご登録いただいたメールアドレス宛に仮登録メールを送付しました。
        </p>
        <p>メールに記載のURLよりログイン画面へと進み、ログインしてください。</p>
        <p>（送付元ドメインは@example.comです）</p>
        <p>届かない場合は、迷惑メールフォルダなどを確認してください。</p>
        <p>
          また、登録されたメールアドレスに誤りがあると、メールは送付されません。
        </p>
        <p>再度、アカウント登録を行なってください。</p>
      </div>
    </div>
  );
};

export default CheckEmailMessage;
