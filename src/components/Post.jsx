//component to make new post or edit a post
export default function Post() {
  function handleSubmit() {}
  return (
    <>
      <div className="postContainer">
        <div className="titleContainer">
          <h2>Post</h2>
        </div>
        <div className="postEditor">
          <form onSubmit={handleSubmit()}>
            <label>
              <input type="text" placeholder="Title" />
            </label>
            <label>
              <input type="text" placeholder="Description" />
            </label>
            <label>
              <input type="number" placeholder="Price" />
            </label>
            <label>
              <input type="text" placeholder="Location" />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
