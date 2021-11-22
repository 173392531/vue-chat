let fillZero = (n) => {
    let result = (n).toString().length === 1 ? ('0' + n): n;
    return result;
}
export let formatTime = (t = new Date()) => {
    let d = new Date(t);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let result = `${year}-${fillZero(month)}-${fillZero(date)} ${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`;
    return result;
}