import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import GroupManager from './components/GroupManager/GroupManager';
import TaskManager from './components/TaskManager/TaskManager';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Auth from './components/Auth/Auth';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [todos, setTodos] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Gérer l'installation PWA
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setShowInstallPrompt(false);
            }
            setDeferredPrompt(null);
        }
    };

    // Vos fonctions existantes
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
            <ThemeToggle />
            {showAuth && <Auth onClose={() => setShowAuth(false)} />}
            
            <header className="header">
                <h1>TodoList</h1>
                {user ? (
                    <button onClick={() => auth.signOut()}>Déco</button>
                ) : (
                    <button onClick={() => setShowAuth(true)}>Co</button>
                )}
            </header>

            <div className="content">
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

            {showInstallPrompt && (
                <div className="install-prompt">
                    <p>Installer l&apos;application ?</p>
                    <button onClick={handleInstall}>Installer</button>
                    <button onClick={() => setShowInstallPrompt(false)}>Plus tard</button>
                </div>
            )}
        </div>
    );
}

export default App; 