$(document).ready(function () {
    Promise.all(
        [loadYearData('./wp_content/themes/pedaleaza-child/assets/download/current/piste_datatable.json'),
            loadYearData('./wp_content/themes/pedaleaza-child/assets/download/current/piste_datatable_2019.json')]
    ).then((values) => {
        const merged = merge2018with2019(values[0].data, values[1].data);

        $('#example').DataTable({
            data: merged,
            columnDefs: [
                {"className": "dt-center", "targets": "_all"}
            ],
            paging: false,
            order: [[6, "desc"]],
            rowCallback: function (row, data) {
                const columnTotal2019 = 6;
                if (0 < data[columnTotal2019] && data[columnTotal2019] < 20) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalTwenty');
                }
                if (20 <= data[columnTotal2019] && data[columnTotal2019] < 40) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalForty');
                }
                if (40 <= data[columnTotal2019] && data[columnTotal2019] < 60) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalSixty');
                }
                if (60 <= data[columnTotal2019] && data[columnTotal2019] < 80) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalEighty');
                }
                if (80 <= data[columnTotal2019] && data[columnTotal2019] < 100) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalHundred');
                }
            },
        });
    });
});

function merge2018with2019(json2018, json2019) {
    json2018.forEach(item2018 => {
        const urlAsId = item2018[0];
        const foundMatch = json2019.filter(item => item[0] === urlAsId);
        if (foundMatch[0]) {
            foundMatch[0].splice(8, 0, item2018[8]); // add score from 2018
            foundMatch[0].push(Number.parseFloat(foundMatch[0][9]) - Number.parseFloat(item2018[8])); // add score difference
        } else {
            item2018.push('-'); // add score from 2018
            item2018.push(0);
            json2019.push(item2018);
        }
    });
    json2019.forEach(item => {
        if (item.length < 10) {
            item.splice(8, 0, '-'); // add score from 2018
            item.push(0);
        }
        item.splice(5, 3);
    }); // remove category scores
    return json2019;
}

function loadYearData(fileURL) {
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
