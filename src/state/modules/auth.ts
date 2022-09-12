import * as types from "../types";
import { authenticationApi, firebase } from "@/api";
import { ActionContext } from "vuex";
import router from "@/router";
export interface IState {
  userId: string;
  token: string;
}
export interface IData {
  localId: string;
  idToken: string;
}
export interface IUserInputs {
  email: string;
  password: string;
}
const handlesessionStorage = (data: IData) => {
  sessionStorage.setItem("token", data.idToken);
  sessionStorage.setItem("userId", data.localId);
};
const clearLoclaStorage = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("expireDate");
};
const state: IState = {
  userId: "",
  token: "",
};
const getters = {
  [types.GET_USER_DATA]: (state: IState) => {
    return state;
  },
  [types.VALIDATE_USER_DATA]: ({ token, userId }: IState) => {
    return token && userId ? true : false;
  },
};
const mutations = {
  [types.SET_USER_DATA]: (state: IState, { localId, idToken }: IData) => {
    console.log(localId, idToken);
    state.userId = localId;
    state.token = idToken;
  },
  [types.LOGOUT_USER]: (state: IState) => {
    router.replace("/login");
    state.userId = "";
    state.token = "";
    clearLoclaStorage();
  },
};
const actions = {
  [types.SIGN_UP]: (
    { commit }: ActionContext<IState, any>,
    { email, password }: IUserInputs
  ) => {
    authenticationApi
      .post("/accounts:signUp?key=AIzaSyCRUBSGj1E_xjo6QsTYg3ty1CdG9M2xmGg", {
        email,
        password,
        returnSecureToken: true,
      })
      .then(({ data }) => {
        firebase
          .patch(`/users/${data.localId}.json?auth=${data.idToken}`, {
            email: data.email,
          })
          .then((res) => {
            handlesessionStorage(data);
          })
          .catch((e) => {
            console.log(e.response);
          });
        commit(types.SET_USER_DATA, data);
        router.replace(`/home/${data.localId}`);
      })
      .catch((e) => {
        if (e.response.status === 400) {
          alert("E-Mail Is Already Exists");
        }
        console.log("Error", e.response);
      });
  },
  [types.SIGN_IN]: (
    { commit, dispatch }: ActionContext<IState, any>,
    { email, password }: IUserInputs
  ) => {
    authenticationApi
      .post(
        "/accounts:signInWithPassword?key=AIzaSyCRUBSGj1E_xjo6QsTYg3ty1CdG9M2xmGg",
        { email, password, returnSecureToken: true }
      )
      .then(({ data }) => {
        console.log(data);
        commit(types.SET_USER_DATA, data);

        handlesessionStorage(data);

        router.replace(`/home/${data.localId}`);
      })
      .catch((e) => {
        if (e.response.status === 400) {
          alert("Inavalid User Name or Password");
        }
        console.log("Error", e.response);
      });
  },
  [types.AUTO_LOGIN]: ({ commit }: ActionContext<IState, any>) => {
    console.log("try");
    const token = sessionStorage.getItem("token");

    if (!token) {
      return;
    }
    console.log("token", token);

    const userId = sessionStorage.getItem("userId");
    console.log("userId", userId);
    commit(types.SET_USER_DATA, { localId: userId, idToken: token });
    router.replace(`/home/${userId}`);
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
