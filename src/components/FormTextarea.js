function FormTextarea(props) {
  return (
    <form>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
        What did you do?
        </label>
      </h2>
      <textarea
        name="text"
        cols="90"
        rows="25"
        value={props.workInfo}
        // audotComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default FormTextarea;