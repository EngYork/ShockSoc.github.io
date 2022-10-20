import { initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAayvJqsMqXc1FK3vg1TMuLOM6UR2g9h84",
  authDomain: "website-storage-74225.firebaseapp.com",
  projectId: "website-storage-74225",
  storageBucket: "website-storage-74225.appspot.com",
  messagingSenderId: "32339138874",
  databaseURL:
    "https://website-storage-74225-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:32339138874:web:0a5168dc151bbf6ea2d803",
};

const firebaseClient = initializeApp(firebaseConfig);

type AuthObserverArgs = (onUser?: () => void, cleanup?: () => void) => Auth;

const authObserver: AuthObserverArgs = (onUser, cleanup) => {
  const auth = getAuth(firebaseClient);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (onUser) onUser();
    } else {
      if (cleanup) cleanup();
    }
  });

  return auth;
};

const deploy = () =>
  new Promise((resolve, reject) => {

    // Get GitHub access token from cookie
    const cookies = document.cookie.split(";");
    let index = 0;
    let token: string | undefined = undefined;
    while (token === undefined) {
      const cookie = cookies[index];
      if (cookie.includes("gh=")) {
        token = cookie.replace("gh=", "");
      }
      index++;
      if (index === cookies.length) break;
    }

    fetch(
      "https://api.github.com/repos/ShockSoc/ShockSoc.github.io/actions/workflows/deploy.yml/dispatches",
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ref: "main" }),
      }
    )
      .then(async (res) => {
        if (res.ok) resolve(true);
        else reject(`Could not rebuild website: ${await res.text()}`);
      })
      .catch((err) => reject(`Could not rebuild website: ${err}`));
  });

export { firebaseClient, authObserver, deploy };
