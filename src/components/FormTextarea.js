import { useEffect, useState } from "react";

function FormTextarea(props) {
  const [editWorkInfo, setEditWorkInfo] = useState("");

  useEffect(() => {
    setEditWorkInfo(props.workInfo);
  }, [props.workInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    // props.onSubmit(editWorkInfo);
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    props.onSubmit(formValues);
  }
  function handleChange(e) {
    console.log(e.target.value);
    setEditWorkInfo(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="workInfoSeq" value={props.workInfoSeq} />

      {/* <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
        What did you do?
        </label>
      </h2> */}

      <textarea
        name="workInfo"
        cols="90"
        rows="25"
        value={editWorkInfo}
        onChange={handleChange}
        // audotComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default FormTextarea;