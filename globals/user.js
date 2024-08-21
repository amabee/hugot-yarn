export const username = "";
export const image = "";
export const firstname = "";
export const lastname = "";
export const email = "";

export const setUserDetails = (user) => {
  username = user.username;
  image = user.image;
  firstname = user.firstname;
  lastname = user.lastname;
  email = user.email;
};

export const getUserDetails = () => ({
  username,
  image,
  firstname,
  lastname,
  email,
});
