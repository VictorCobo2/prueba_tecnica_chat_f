import { default as axios } from "axios";

export const host = "http://localhost:5000/api/";
export const api_avatar = `https://api.multiavatar.com/4645646`;

export const ingresar = `${host}auth/ingreso`;
export const registro = `${host}auth/registro`;
export const logout = `${host}auth/logout`;
export const get_usuarios = `${host}auth/traer-usuarios`;
export const post_msg = `${host}msg/post-msg`;
export const get_msg = `${host}msg/get-msg`;
export const post_avatar = `${host}auth/post-avatar`;

export const postData = ({
  url,
  data = {},
  method = "POST",
  header = {},
  responseType = "json",
}) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `${host}${url}`,
      method,
      data,
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + sessionStorage.token,
        ...header,
      },
      responseType,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
      },
    };
    axios(config)
      .then((res) => resolve(res.data))
      .catch((error) => {
        let response = { code: -1, msg: null, tipo: "error" };
        if (error.response) {
          response.code = error.response.status;
          response.msg = error.response.data || "Error de conexión, con el servidor";
          response.code = -1;
        } else if (response.request) {
          response.msg = error.request || "Error de conexión, con el servidor";
          response.code = -1;
        } else {
          response.msg = error.msg || "Error de conexión, con el servidor";
          response.code = -1;
        }
        errorConsole("global", error);
        reject(response);
      });
  });
};
export const Api = ({ url, method = "POST" }) => {
  return new Promise((resolve, reject) => {
    let config = {
      url,
      method,
    };
    axios(config)
      .then((res) => resolve(res))
      .catch((error) => {
        let response = { code: -1, msg: null, tipo: "error" };
        if (error.response) {
          response.code = error.response.status;
          response.msg = error.response.data || "Error de conexión, con el servidor";
          response.code = -1;
        } else if (response.request) {
          response.msg = error.request || "Error de conexión, con el servidor";
          response.code = -1;
        } else {
          response.msg = error.msg || "Error de conexión, con el servidor";
          response.code = -1;
        }
        errorConsole("global", error);
        reject(response);
      });
  });
};

const errorConsole = (form, error, data = null) => {
  console.debug("-> Error:", form, error, data);
};
