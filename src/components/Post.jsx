//component to make new post or edit a post
export default function Post() {
  return (
    <>
      <div className="postContainer">
        <div className="titleContainer">
          <h2>Post</h2>
        </div>
        <div className="postEditor">
          <form action="">
            <label>
              <input type="text" placeholder="Title" />
            </label>
            <label>
              <input type="text" placeholder="Description" />
            </label>
            <label ></label>
            <label htmlFor=""></label>
          </form>
        </div>
      </div>
    </>
  );
}
