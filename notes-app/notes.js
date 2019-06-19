const fs = require('fs')
const chalk = require('chalk')

const notesFile = 'notes.json'

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(notesFile)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync(notesFile, dataJSON)
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue.inverse('Your notes'))
  notes.forEach(note => console.log(note.title))
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added'))
  } else {
    console.log(chalk.red.inverse('Note title taken'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const newNotes = notes.filter(note => note.title !== title)

  if (notes.length > newNotes.length) {
    saveNotes(newNotes)
    console.log(chalk.green.inverse('Note removed'))
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}

const readNote = title => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)

  if (note) {
    console.log(chalk.blue.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}

module.exports = {
  listNotes,
  addNote,
  removeNote,
  readNote,
}
