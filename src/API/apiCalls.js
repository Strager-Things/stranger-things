const apiUrl = `https://strangers-things.herokuapp.com/api/2209-acc-pt-web-pt-d`;

//get the posts on the market
export const getPosts = async () => {
  try {
    const response = await fetch(`${apiUrl}/posts`);
    const result = await response.json();
    const posts = result.data.posts;
    return posts;
  } catch (error) {
    console.error("Error in getting the posts call from api", error);
  }
};

//register user
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in registering user`, error);
  }
};

//user logs in
export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in loging in", error);
  }
};
