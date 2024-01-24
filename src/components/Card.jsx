export const Card = ({ children, flipCard, index }) => {
  const handleClick = () => {
    flipCard(index);
  };

  return (
    <div onClick={handleClick} className="card">
      {children}
    </div>
  );
};
