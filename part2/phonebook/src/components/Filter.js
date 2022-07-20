const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filterValue} onChange={props.FilterInput} />
    </div>
  );
};

export default Filter