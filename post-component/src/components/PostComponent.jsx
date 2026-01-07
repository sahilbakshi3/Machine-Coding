const PostComponent = ({ value, handlePageChange, data }) => {
  return (
    <div>
      <input type="number" min="1" value={value} onChange={handlePageChange} />

      {data && <div>{data.title}</div>}
    </div>
  );
};

export default PostComponent;
