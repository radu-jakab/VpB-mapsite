$(document).ready(function () {
    $('#example').DataTable({
        ajax: "/wp-content/themes/pedaleaza-child/assets/download/current/piste_datatable.json",
        columnDefs: [
            {"className": "dt-center", "targets": "_all"}
        ],
        paging: false,
        rowCallback: function(row, data, index) {
            console.log(row)
            if (0 <= data[8] && data[8] < 20) {
                $(row).addClass('rowTotalTwenty')
            }
            if (20 <= data[8] && data[8] < 40) {
                $(row).addClass('rowTotalForty')
            }
            if (40 <= data[8] && data[8] < 60) {
                $(row).addClass('rowTotalSixty')
            }
            if (60 <= data[8] && data[8] < 80) {
                $(row).addClass('rowTotalEighty')
            }
            if (80 <= data[8] && data[8] < 100) {
                $(row).addClass('rowTotalHundred')
            }
        }
    });
});

