const CardBoardLink = ({boardId}) => {
  const boardLink = `${
  
  process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://navaneethcaterers.com"
}/b/${boardId}`;

return(
  <div className="bg-base-100 rounded-3xl text-sm px-4 py-2.5">
{boardLink}
  </div>
);
  
  };


  export default CardBoardLink;