export interface Phrase {
  id: bigint;
  content: string;
  created_at: string;
  update_at: string;
  user_id: uuid;
}

export interface CreatePhrase {
  content: string;
  user_id: uuid;
}

export interface UpdatePhrase {
  content: string;
}
