export const UrlRegex =
    /((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?/;

export const isURL = (str: string): boolean => {
    const url = new RegExp(UrlRegex, 'i');
    return str.length < 2083 && url.test(str);
};

export default isURL;
