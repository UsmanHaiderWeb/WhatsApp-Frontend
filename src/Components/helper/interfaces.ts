export interface loginInterface {
    email: string,
    password: string
}

export interface signupInterface {
    username: string,
    email: string,
    password: string,
    caption: string,
    dp: string,
}

export interface addGroupFriendInterface {
    email: string;
    username: string,
    _id: string
}