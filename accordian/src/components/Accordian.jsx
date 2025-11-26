const Accordian = ({ qna, isOpen, onToggle }) => {
  return (
    <div className="accordian">
      <h3>
        {qna.question} <span onClick={onToggle}>{isOpen ? "-" : "+"}</span>
      </h3>
      {isOpen && <p>{qna.answer}</p>}
    </div>
  );
};

export default Accordian;

