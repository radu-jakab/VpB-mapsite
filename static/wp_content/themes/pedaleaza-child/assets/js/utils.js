function loadDataFile(fileURL) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', fileURL, true);
        request.onload = function () {
            try {
                resolve(JSON.parse(request.response.toString()));
            } catch (e) {
                reject(e);
            }
        };
        request.send();
    });
}
