const apiUrl = `https://strangers-things.herokuapp.com/api/2209-acc-pt-web-pt-d`;

//USER API FUNCTIONS
//register user
//need username and password
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
//need username and password
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

//get user data
//messages received, can be used to have notifications
export const userData = async (userToken) => {
  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in getting user data", error);
  }
};

// ---------------------------------------------------------------

// POST API FUNCTIONS
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

//make a new post
//need user's authentication token, and form contents
export const createPost = async (
  userToken,
  title,
  description,
  price,
  willDeliver
) => {
  try {
    const response = await fetch(`${apiUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          willDeliver: willDeliver,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with creating post", error);
  }
};

export const editPost = async (
  userToken,
  title,
  description,
  price,
  willDeliver,
  postId
) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          willDeliver: willDeliver,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with editing post", error);
  }
};

export const deletePost = async (postId, userToken) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in deleting post", error);
  }
};

//----------------------------------------------------------------

//MESSAGES API FUNCTIONS

//create a new message
export const createMessage = async (postId, userToken, content) => {
  try {
    console.log("were in create message function",userToken)
    const response = await fetch(`${apiUrl}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        message: {
          content: content,
        }
      })
    });
    const result = await response.json();
    console.log("Message sent:",result);
    return result;
  } catch (error) {
    console.error("Error in creating message", error);
  }
};
