import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useShoppingList } from '../hooks/useShoppingList';
import { Link } from 'react-router-dom';
import './ShoppingList.css';

export default function ShoppingListPage() {
  const { user } = useAuth();
  const {
    lists, items, activeList, loading,
    setActiveList, createList, deleteList,
    addItem, toggleItem, removeItem, clearChecked,
  } = useShoppingList();
  const [newItem, setNewItem] = useState('');
  const [newQty, setNewQty] = useState('');

  if (!user) {
    return (
      <div className="shop-page">
        <div className="shop-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <h2>Accedi per usare la lista della spesa</h2>
          <Link to="/auth" className="shop-cta">Registrati o accedi</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="shop-page"><div className="loading-state"><div className="spinner-lg" /></div></div>;
  }

  const checked = items.filter((i) => i.checked);
  const unchecked = items.filter((i) => !i.checked);

  async function handleAdd() {
    if (!newItem.trim()) return;
    await addItem(newItem.trim(), newQty.trim());
    setNewItem('');
    setNewQty('');
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Lista della spesa</h1>
        {lists.length === 0 && (
          <button className="shop-create" onClick={() => createList('Lista della spesa')}>
            Crea lista
          </button>
        )}
      </div>

      {/* List selector */}
      {lists.length > 1 && (
        <div className="list-tabs">
          {lists.map((l) => (
            <button
              key={l.id}
              className={`list-tab ${activeList?.id === l.id ? 'active' : ''}`}
              onClick={() => setActiveList(l)}
            >
              {l.name}
            </button>
          ))}
        </div>
      )}

      {activeList && (
        <>
          {/* Add item */}
          <div className="add-item-row">
            <input
              type="text"
              placeholder="Aggiungi ingrediente..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="add-input"
            />
            <input
              type="text"
              placeholder="Quantita"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              className="add-qty"
            />
            <button className="add-btn" onClick={handleAdd} disabled={!newItem.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 5v14m-7-7h14" />
              </svg>
            </button>
          </div>

          {/* Unchecked items */}
          {unchecked.length > 0 && (
            <ul className="shop-items">
              {unchecked.map((item) => (
                <li key={item.id} className="shop-item">
                  <button className="item-check" onClick={() => toggleItem(item.id, true)}>
                    <span className="check-circle" />
                  </button>
                  <span className="item-name">{item.ingredient_name}</span>
                  {item.quantity && <span className="item-qty">{item.quantity}</span>}
                  <button className="item-delete" onClick={() => removeItem(item.id)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Checked items */}
          {checked.length > 0 && (
            <>
              <div className="checked-header">
                <span className="checked-label">Comprati ({checked.length})</span>
                <button className="clear-checked" onClick={clearChecked}>Rimuovi</button>
              </div>
              <ul className="shop-items checked">
                {checked.map((item) => (
                  <li key={item.id} className="shop-item checked">
                    <button className="item-check done" onClick={() => toggleItem(item.id, false)}>
                      <span className="check-circle filled">&#10003;</span>
                    </button>
                    <span className="item-name strikethrough">{item.ingredient_name}</span>
                    {item.quantity && <span className="item-qty">{item.quantity}</span>}
                  </li>
                ))}
              </ul>
            </>
          )}

          {items.length === 0 && (
            <div className="shop-empty-list">
              <p>La lista e vuota</p>
              <p className="shop-hint">Aggiungi ingredienti manualmente o da una ricetta</p>
            </div>
          )}

          {/* Delete list */}
          <div className="shop-footer">
            <button className="delete-list-btn" onClick={() => deleteList(activeList.id)}>
              Elimina lista
            </button>
          </div>
        </>
      )}
    </div>
  );
}
