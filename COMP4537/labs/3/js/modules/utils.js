function getDate(name = 'Guest') {
    const currentTime = new Date().toLocaleString();
    const message = `Hello ${name}, What a beautiful day. Server current date and time is`;
    return `${message} ${currentTime}`;
}

module.exports = { getDate };