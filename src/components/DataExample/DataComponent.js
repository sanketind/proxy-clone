import React, { useState, useEffect } from 'react'
import { getRecords, createRecord, updateRecord, deleteRecord, subscribeToTable } from '../../utils/database'

const DataComponent = () => {
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')
  
  useEffect(() => {
    // Load initial data
    loadItems()

    // Subscribe to real-time updates
    const subscription = subscribeToTable('items', (payload) => {
      // Reload items when there's a change
      loadItems()
    })

    return () => {
      // Cleanup subscription
      subscription.unsubscribe()
    }
  }, [])

  const loadItems = async () => {
    try {
      const data = await getRecords('items', {
        orderBy: { column: 'created_at', ascending: false },
        filters: [
          { column: 'active', operator: 'eq', value: true }
        ]
      })
      setItems(data)
    } catch (error) {
      console.error('Error loading items:', error.message)
    }
  }

  const handleCreateItem = async (e) => {
    e.preventDefault()
    try {
      await createRecord('items', {
        name: newItemName,
        active: true,
        created_at: new Date().toISOString()
      })
      setNewItemName('')
    } catch (error) {
      console.error('Error creating item:', error.message)
    }
  }

  const handleUpdateItem = async (id, updates) => {
    try {
      await updateRecord('items', id, updates)
    } catch (error) {
      console.error('Error updating item:', error.message)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await deleteRecord('items', id)
    } catch (error) {
      console.error('Error deleting item:', error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateItem}>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleUpdateItem(item.id, { name: item.name + ' (updated)' })}>
              Update
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DataComponent
