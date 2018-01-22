export function strFormat(str: string, list: Array<string>) : string {
    let num = list.length;
    for (let i = 1; i < num; i++) {
        let pattern = "\\{" + (i - 1) + "\\}";
        let re = new RegExp(pattern, "g");
        str = str.replace(re, arguments[i]);
    }
    return str;
}