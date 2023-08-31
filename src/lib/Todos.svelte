<script>
  import "../app.css";
   import trash from "../assets/trash.webp"
  import { db } from "./fireConfig";
  import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    query,
    orderBy,
  } from "firebase/firestore";

  let task = "";
  let error = "";
  let fbTodos = [];

  const handleSnapshot = (querySnapshot) => {
    fbTodos.length = 0;
    querySnapshot.forEach(
      (/** @type {{ data: () => any; id: any; }} */ doc) => {
        const todo = {
          ...doc.data(),
          id: doc.id,
        };
        fbTodos.push(todo);
      }
    );
    console.table(fbTodos);
  };

  const firestoreInit = () => {
    const todoRef = query(collection(db, "todos"), orderBy("createdAt", "desc"));
  
    return onSnapshot(todoRef, handleSnapshot, handleError);
  };

  const handleError = (err) => {
    console.error("Firebase error:", err);
  };

  const unsubscribe = firestoreInit();

  const addTodo = async () => {

    const currentDate = new Date();
    const formattedDateAndTime = `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`;

    if (task !== "") {
      const addRef = await addDoc(collection(db, "todos"), {
        task: task,
        isComplete: false,
        createdAt: formattedDateAndTime
      });
      error = "";
    } else error = "Input field is empty";
    task = "";
  };

  const keyPressed = (/** @type {{ keyCode: number; }} */ event) => {
    if (event.keyCode === 13) addTodo();
  };

  const markComplete = async (item) => {
    await updateDoc(doc(db, "todos", item.id), {
      isComplete: !item.isComplete,
    });
  };

  const markIncomplete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
};

</script>

<svelte:window on:keydown={keyPressed} />

<div class="container">
  <div class="input-container">
    <input type="text" placeholder="Add a Task" bind:value={task} />
    <button class="addBtn" on:click={addTodo}>Add</button>
  </div>

  <ul>
    <div class="task-container">
      {#each fbTodos as item}
        <li class:complete={item.isComplete}>
          <span class="list">
            {item.task}
          </span>
          <span>
            <button class="markBtn" on:click={() => markComplete(item)}
              >&#10003;</button
            >
            <!-- <button class="trashBtn" on:click={() => markIncomplete(item.id)}
              >&#128465;</button
            > -->
            <button class="trashBtn" on:click={() => markIncomplete(item.id)}
              ><img class="trashIcon" src={trash} alt=""></button
            >
          </span>
        </li>
      {:else}
        <p>No Tasks todo</p>
      {/each}
    </div>
  </ul>
  <p class="error">{error}</p>
</div>

<style>
  .container {
    margin-top: 80px;
    display: grid;
    place-items: center;
  }

  .task-container {
    display: inline;
  }

  input {
    padding: 0.5em;
    width: 200px;
  }

  .addBtn {
    padding: 0.5em;
  }

  li,
  p {
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 2rem;
  }

  .btn {

  }
  .markBtn {
    padding: 0.5rem;
  }
  
  .trashBtn {
    padding: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  .trashIcon {
    height: 30px;
  }
  .complete > .list {
    color: rgba(255, 255, 255, 0.802);
    text-decoration: line-through;
    text-decoration-color: rgb(49, 48, 48);
  }
</style>
