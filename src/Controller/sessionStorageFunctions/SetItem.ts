export default function SetItem(key:string, user:{}):void {
    sessionStorage.setItem(key, JSON.stringify(user))
}