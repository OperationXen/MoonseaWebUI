import create from 'zustand'

const useCharacterStore = create(set => ({
  characters: [],
  setCharacters: (newVal) => set(state => ({characters: newVal}))
}))

export default useCharacterStore