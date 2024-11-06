import { useState } from 'react';
import PropTypes from 'prop-types';
import './GroupManager.css';

function GroupManager({ groups, onAddGroup, onDeleteGroup, onSelectGroup, selectedGroup }) {
    const [newGroupName, setNewGroupName] = useState('');
    const [showMaxGroupsWarning, setShowMaxGroupsWarning] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            if (groups.length < 5) {
                onAddGroup(newGroupName.trim());
                setNewGroupName('');
            } else {
                setShowMaxGroupsWarning(true);
            }
        }
    };

    const handleDeleteGroup = (groupId) => {
        setGroupToDelete(groupId);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (groupToDelete) {
            onDeleteGroup(groupToDelete);
            setShowDeleteConfirmation(false);
            setGroupToDelete(null);
        }
    };

    return (
        <div className="group-manager">
            <form onSubmit={handleSubmit} className="group-form">
                <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Nouveau groupe"
                    maxLength="20"
                />
                <button 
                    type="submit"
                    disabled={groups.length >= 5}
                >
                    Ajouter
                </button>
            </form>
            
            {showMaxGroupsWarning && (
                <div className="max-groups-warning">
                    Vous avez atteint la limite maximale de 5 groupes.
                </div>
            )}

            <div className="groups-list">
                <button 
                    className={`group-button ${!selectedGroup ? 'active' : ''}`}
                    onClick={() => onSelectGroup(null)}
                >
                    Tout
                </button>
                {groups.map(group => (
                    <div key={group.id} className="group-item">
                        <button
                            className={`group-button ${selectedGroup === group.id ? 'active' : ''}`}
                            onClick={() => onSelectGroup(group.id)}
                        >
                            {group.name}
                        </button>
                        <button
                            className="delete-group"
                            onClick={() => handleDeleteGroup(group.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {showDeleteConfirmation && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-message">
                            Attention ! Supprimer ce groupe effacera également toutes les tâches associées.
                            Êtes-vous sûr de vouloir continuer ?
                        </div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button confirm" 
                                onClick={confirmDelete}
                            >
                                Confirmer
                            </button>
                            <button 
                                className="modal-button cancel" 
                                onClick={() => setShowDeleteConfirmation(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

GroupManager.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    onAddGroup: PropTypes.func.isRequired,
    onDeleteGroup: PropTypes.func.isRequired,
    onSelectGroup: PropTypes.func.isRequired,
    selectedGroup: PropTypes.string
};

GroupManager.defaultProps = {
    selectedGroup: null
};

export default GroupManager; 