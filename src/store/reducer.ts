interface ADD_NOTE_ACTION {
  type: 'ADD_NOTE'
  payload: {
   message: string,
   position: number,
   podcastURL: string,
  }
}

export interface NotesStateType {
  notes: {
    [podcastURL: string]: {
      message: string
      position: number,
    }[] | undefined
  }
}

const defaultState: NotesStateType = {
  notes: {}
}

// reducers
export default (
  state: NotesStateType = defaultState,
  action: ADD_NOTE_ACTION,
): NotesStateType => {
  if (action.type === 'ADD_NOTE') {
    const currentPodcastURLState = state.notes[action.payload.podcastURL] || []
    const newPodcastURLState = [
      ...currentPodcastURLState,
      {
        message: action.payload.message,
        position: action.payload.position,
      },
    ].sort((a, b) => {
      if (a.position > b.position) {
        return 1
      }
      return -1
    })
    return {
      notes: {
        ...state.notes,
        [action.payload.podcastURL]: newPodcastURLState,
      }
    }
  }
  return state
}

export const addNote = (
  payload: ADD_NOTE_ACTION['payload']
): ADD_NOTE_ACTION => ({
  type: 'ADD_NOTE',
  payload,
})
