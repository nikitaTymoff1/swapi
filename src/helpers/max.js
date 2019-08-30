const max = (name) => {
    let q = name.count / 10;
    return Math.ceil(q) || '...';
};
export default max