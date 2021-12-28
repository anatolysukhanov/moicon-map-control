const selectNotes = Redux.createSelector(
    state => state.notes,
    notes => notes.data
);

const selectClickedNoteId = state => state.notes.clickedNoteId;

const selectClickedNote = Redux.createSelector(
    selectClickedNoteId,
    selectNotes,
    (clickedNoteId, notes) => clickedNoteId !== 0 ? notes.filter(n => n.id === clickedNoteId)[0] : undefined
);

const selectAddNoteForm = Redux.createSelector(
    state => state.notes,
    notes => notes.addNoteForm
);