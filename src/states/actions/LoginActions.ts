const url = "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs";
export const loginByCredintials =
  (crediantials: any) => async (dispatch: any) => {
    console.log(crediantials);
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(crediantials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data.authToken,
      });
    } catch (err) {
      dispatch({
        type: "USER_LOGIN_FAILURE",
        payload: err,
      });
    }
  };

export const submitForm = (data: any) => async (dispatch: any) => {
  dispatch({
    type: "USER_FORM_SUBMIT_REQUEST",
  });
  try {
    const res = await fetch(`${url}/form`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    dispatch({
      type: "USER_FORM_SUBMIT_SUCCESS",
      payload: json,
    });
  } catch (err) {
    dispatch({
      type: "USER_FORM_SUBMIT_FAILURE",
      payload: err,
    });
  }
};
