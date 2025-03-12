import fs from "fs";

type User = {
    wallet: string,
    token: string
}

const users: User[] = JSON.parse(fs.readFileSync("users.json", "utf-8"));

function saveUsers() {
    fs.writeFileSync("users.json", JSON.stringify(users));
}

export { users, saveUsers, User };