export interface User {
  
  username: string | null;

  isLoading: boolean;

  isAdmin: boolean;

  isAuthed: boolean;

}

export function createDefaultUser(): User {
  return {
    username: null,
    isLoading: false,
    isAdmin: false,
    isAuthed: false
  };
}