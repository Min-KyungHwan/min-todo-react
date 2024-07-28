import { useState, useRef, useEffect  } from "react";
import { nanoid } from "nanoid";
import { getWorkInfoApi, setWorkInfoApi, addWorkInfoApi, getTodoListApi, addTodoApi, delTodoApi, setTodoApi } from './api/todoApi.js';
import Form from "./components/Form";
import FormTextarea from "./components/FormTextarea";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import MyDatePicker from './components/datePicker/DatePicker.jsx';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//All 필터는 모든 할 일을 표시하므로, 모든 할 일에 대해 true를 반환합니다.
//Active 필터는 completed 속성이 false인 할 일을 표시합니다.
//Completed 필터는 completed 속성이 true인 할 일을 표시합니다.
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.status,
  Completed: (task) => task.status,
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [workInfo, setWorkInfo] = useState("데이터를 입력해주세요.");
  const [workInfoSeq, setWorkInfoSeq] = useState("");

  async function addTask(submittedTodo) {
    // const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    // setTasks([...tasks, newTask]);
    try {
      const result = await addTodoApi(submittedTodo);
      console.log("Server response : ", result);
      const data = await getTodoListApi();
      setTasks(data);
    } catch (error) {
      console.error("Failed to set todo : ", error);
    }
  }

  async function toggleTaskCompleted(id) {
    var status = false;
    const updatedTasks = tasks.map((task) => {
      if(id === task.workTodoSeq){
        status = !task.status;
      }
    })

    const submittedTodo = {
      workTodoSeq : id,
      status : status
    };
    try {
      const result = await setTodoApi(submittedTodo);
      console.log("Server response : ", result);
      const data = await getTodoListApi();
      setTasks(data);
    } catch (error) {
      console.error("Failed to set todo : ", error)
    }

  }

  async function deleteTask(submittedTodo){
    // const remainingTasks = tasks.filter((task) => id !== task.id);
    // setTasks(remainingTasks);
    try {
      const result = await delTodoApi(submittedTodo);
      console.log("Server response : ", result);
      const data = await getTodoListApi();
      setTasks(data);

    } catch (error) {
      console.error("Failed to del todo : ", error)
    }
  }

  async function editTask(id, newName) {
    // const editedTaskList = tasks.map((task) => {
    //   // 이 할 일이 편집된 작업과 동일한 ID를 갖는 경우
    //   if(id === task.id){
    //     return { ...task, name: newName };
    //   }
    //   return task;
    // });
    // setTasks(editedTaskList);
    var status = false;
    const updatedTasks = tasks.map((task) => {
      if(id === task.workTodoSeq){
        status = task.status;
      }
    })

    const submittedTodo = {
      workTodoSeq : id,
      todoNm : newName,
      status : status
    };
    try {
      const result = await setTodoApi(submittedTodo);
      console.log("Server response : ", result);
      const data = await getTodoListApi();
      setTasks(data);
    } catch (error) {
      console.error("Failed to set todo : ", error)
    }
  }

  async function handleFormTextareaSubmit(submittedInfo) {
    console.log("Submitted info:", submittedInfo);
    try {
      if(submittedInfo.workInfoSeq){
        const result = await setWorkInfoApi(submittedInfo);
        console.log("Server response: ", result);
      }else{
        const result = await addWorkInfoApi(submittedInfo);
        console.log("Server response: ", result);
      }

      const data = await getWorkInfoApi();
      if(data){
        setWorkInfo(data.workInfo);
        setWorkInfoSeq(data.workInfoSeq);
      }
    } catch (error) {
      console.error("Failed to set work info: ", error);
    }
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
    <Todo 
      id={task.workTodoSeq} 
      name={task.todoNm} 
      completed={task.status}
      key={task.workTodoSeq}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter} />
  ));
  console.log(filterList);

  const tasksNoun = taskList.length != 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    const fetchWorkInfo = async () => {
        try {
          const data = await getWorkInfoApi();
          if(data){
            setWorkInfo(data.workInfo);
            setWorkInfoSeq(data.workInfoSeq);
          }
        } catch (error) {
          console.error('Failed to fetch work info', error);
        }
      };
      fetchWorkInfo();
  }, []);

  useEffect(() => {
    const fetchWorkTodo = async () => {
        try {
          const data = await getTodoListApi();
          if(data){
            setTasks(data);
          }
        } catch (error) {
          console.error('Failed to fetch work todo list', error);
        }
      };
      fetchWorkTodo();
  }, []);


  useEffect(() => {
    if(tasks.length - prevTaskLength === -1){
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>Daily Work</h1>
      <div className="flex-container">
        <div id="min1" style={{width: '1000px'}}>
          <div className="horizontal-layout">
            <MyDatePicker />
            <h2 className="label-wrapper">
              <label htmlFor="new-todo-input" className="label__lg">
              What did you do?
              </label>
            </h2>
          </div>
          <FormTextarea 
            workInfoSeq={workInfoSeq}
            workInfo={workInfo}
            onSubmit={handleFormTextareaSubmit} />
        </div>


        <div id="min2" style={{width: '500px'}}>
          <Form addTask={addTask} />
          <div className="filters btn-group stack-exception">
            {filterList}
          </div>
          <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
            {headingText}
          </h2>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {taskList}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
