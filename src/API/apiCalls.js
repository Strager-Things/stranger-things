const apiUrl = `https://strangers-things.herokuapp.com/api/2209-acc-pt-web-pt-d`;

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
