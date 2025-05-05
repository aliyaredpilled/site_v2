import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Battery from '../../components/shared/Battery';
import { Icon, Image } from '../../utils/general';
import './back.scss'; // Убедимся, что стили подключены

const LockScreen = (props) => {
  const wall = useSelector((state) => state.wallpaper);
  const [lock, setLock] = useState(false);
  const [unlocked, setUnLock] = useState(false);
  // const [password, setPass] = useState(""); // Закомментировано, т.к. не используется
  // const [passType, setType] = useState(1); // Закомментировано
  // const [forgot, setForget] = useState(false); // Закомментировано
  const dispatch = useDispatch();

  // const userName = useSelector((state) => state.setting.person.name); // Закомментировано

  const action = (e) => {
    var act = e.target.dataset.action;
      // payload = e.target.dataset.payload; // Закомментировано

    if (act == "splash") setLock(true);
    // Логика ввода пароля/пина закомментирована, т.к. сам ввод закомментирован
    // else if (act == "inpass") {
    //   var val = e.target.value;
    //   if (!passType) {
    //     val = val.substring(0, 4);
    //     val = !Number(val) ? "" : val;
    //   }
    //   setPass(val);
    // } else if (act == "forgot") setForget(true);
    // else if (act == "pinlock") setType(0);
    // else if (act == "passkey") setType(1);
    //
    // if (act == "pinlock" || act == "passkey") setPass("");
  };

  const proceed = () => {
    setUnLock(true);
    dispatch({ type: "WALLUNLOCK" });
  };

  // const action2 = (e) => { // Закомментировано
  //   if (e.key == "Enter") proceed();
  // };

  return (
    <div
      className={"lockscreen " + (props.dir === -1 ? "slowfadein" : "")}
      data-unlock={unlocked}
      style={{
        backgroundImage: `url('/img/wallpaper/lock.jpg')`, // Уточняем путь к img
      }}
      onClick={action}
      data-action="splash"
      data-blur={lock}
    >
      <div className="splashScreen mt-40" data-faded={lock}>
        <div className="text-6xl font-semibold text-gray-100">
          {new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })}
        </div>
        <div className="text-lg font-medium text-gray-200">
          {new Date().toLocaleDateString("ru-RU", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="fadeinScreen" data-faded={!lock} data-unlock={unlocked}>
        <Image
          className="rounded-full overflow-hidden"
          src="/img/ui/avatar_cat.png"
          w={200}
          ext
        />
        <div className="mt-2 text-2xl font-medium text-gray-200">
          Topson
        </div>
        {/* Кнопка "Sign in" теперь вызывает proceed при клике */}
        <div className="flex items-center mt-6 signInBtn" onClick={proceed}>
          Sign in
        </div>
        {/* Закомментированный код ввода пароля/пина */}
        {/* <input type={passType?"text":"password"} value={password} onChange={action}
              data-action="inpass" onKeyDown={action2} placeholder={passType?"Password":"PIN"}/>
          <Icon className="-ml-6 handcr" fafa="faArrowRight" width={14}
            color="rgba(170, 170, 170, 0.6)" onClick={proceed}/>
        </div>
        <div className="text-xs text-gray-400 mt-4 handcr"
          onClick={proceed}>
          {!forgot?`I forgot my ${passType?"password":"pin"}`:"Not my problem"}
        </div>
        <div className="text-xs text-gray-400 mt-6">
          Sign-in options
        </div>
        <div className="lockOpt flex">
          <Icon src="pinlock" onClick={action} ui width={36}
            click="pinlock" payload={passType==0}/>
          <Icon src="passkey" onClick={action} ui width={36}
            click="passkey" payload={passType==1}/>
        </div> */}
      </div>
      <div className="bottomInfo flex">
        <Icon className="mx-2" src="wifi" ui width={16} invert />
        <Battery invert />
      </div>
    </div>
  );
};

export default LockScreen; 