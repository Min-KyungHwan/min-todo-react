import { useState, useRef, useEffect  } from "react";
import { nanoid } from "nanoid";
import { getWorkInfo } from './api/todoApi.js';
import Form from "./components/Form";
import FormTextarea from "./components/FormTextarea";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

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
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [workInfo, setWorkInfo] = useState("데이터를 입력해주세요.");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if(id === task.id){
        // use object spread to make a new object
        // whose `completed` props has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // 이 할 일이 편집된 작업과 동일한 ID를 갖는 경우
      if(id === task.id){
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id}
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
          //const data = await getWorkInfo();
          //setWorkInfo(data);
          setWorkInfo('123123123123');
        } catch (error) {
          console.error('Failed to fetch workinfo', error);
        }
      };
      fetchWorkInfo();
  }, []);

  useEffect(() => {
    if(tasks.length - prevTaskLength === -1){
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>Daily Work</h1>
      <div class="flex-container">
      <div id="min1" style={{width: '1000px'}}>
      <FormTextarea workInfo={workInfo} />
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
