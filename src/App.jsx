import { useState } from 'react';
import GroupManager from './components/GroupManager/GroupManager';
import TaskManager from './components/TaskManager/TaskManager';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const addGroup = (name) => {
        const newGroup = {
            id: Date.now().toString(),
            name: name
        };
        setGroups([...groups, newGroup]);
    };

    const deleteGroup = (groupId) => {
        setGroups(groups.filter(group => group.id !== groupId));
        setTodos(todos.filter(todo => todo.groupId !== groupId));
        if (selectedGroup === groupId) {
            setSelectedGroup(null);
        }
    };

    const deleteTodo = (todoId) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    const toggleTodo = (todoId) => {
        setTodos(todos.map(todo =>
            todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now().toString(),
            text,
            completed: false,
            groupId: selectedGroup
        };
        setTodos([...todos, newTodo]);
    };

    const filteredTodos = todos.filter(todo => {
        if (selectedGroup && todo.groupId !== selectedGroup) {
            return false;
        }
        return true;
    });

    return (
        <div className="App">
            <h1>Todo List</h1>
            <GroupManager
                groups={groups}
                onAddGroup={addGroup}
                onDeleteGroup={deleteGroup}
                onSelectGroup={setSelectedGroup}
                selectedGroup={selectedGroup}
            />
            <TaskManager
                selectedGroup={selectedGroup}
                onAddTask={addTodo}
                tasks={filteredTodos}
                onDeleteTask={deleteTodo}
                onToggleTask={toggleTodo}
            />
        </div>
    );
}

export default App; 