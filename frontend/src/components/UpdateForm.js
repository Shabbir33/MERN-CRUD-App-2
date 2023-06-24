import React from 'react'
import notesStore from '../stores/notesStore'

export default function UpdateForm() {
    const store = notesStore();

  return (
    <>
        {store.updateForm._id && <div>
            <h2>Update Form</h2>
            <form onSubmit={store.updateNote}>
                <input onChange={store.handleUpdateFieldChange} value={store.updateForm.title} name="title" />
                <textarea onChange={store.handleUpdateFieldChange} value={store.updateForm.body} name="body" />
                <button type="submit">Update Note</button>
            </form>
        </div>}
    </>
  )
}
