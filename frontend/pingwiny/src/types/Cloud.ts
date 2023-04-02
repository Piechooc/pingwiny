
type UserInChat = {
    id: string
    isActive: boolean
}

type Cloud = {
    chat_id: string
    users_in_chat: UserInChat[]
    x: number;
    y: number;
    text: string;
    can_access: boolean
}

export default Cloud;