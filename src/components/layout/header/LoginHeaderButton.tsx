import { createSignal } from "solid-js";
import { authObserver } from "../../../firebase";

type LoginHeaderParams = [url: string, text?: string];

const [lhparams, setLHParams] = createSignal<LoginHeaderParams>([
  "/website/login",
  "log in",
]);

const setLogIn = () => setLHParams(["/website/login", "log in"]);
const setLogOut = () => setLHParams(["/website/logout", "log out"]);
const LoginHeaderButton = () => {
  authObserver(
    () => setLogOut(),
    () => setLogIn()
  );
  return (
    <a
      href={lhparams()[0]}
      class="hover:bg-slate-300 dark:hover:bg-slate-800 rounded transition-colors ease-in-out duration-200 uppercase font-bold text-lg p-4"
    >
      {lhparams()[1] ? lhparams()[1] : lhparams()[0]}
    </a>
  );
};

export default LoginHeaderButton;
