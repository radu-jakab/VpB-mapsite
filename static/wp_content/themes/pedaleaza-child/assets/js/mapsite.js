$(document).ready(function () {

    var table = $('#example').DataTable({
        ajax: "./wp_content/themes/pedaleaza-child/assets/download/current/piste_datatable_2019.json",
        columnDefs: [
            {"className": "dt-center", "targets": "_all"}
        ],
        paging: false,
        order: [[8, "desc"]],
        rowCallback: function (row, data, index) {
            var order = table.order();
            console.log(row);
            //alert( 'Column '+order[0][0]+' is the ordering column' );
            var orderingCol = order[0][0];
            if (orderingCol < 6) {
                orderingCol = 8;
            }
            if (orderingCol > 4) {
                if (0 < data[orderingCol] && data[orderingCol] < 20) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalTwenty');
                }
                if (20 <= data[orderingCol] && data[orderingCol] < 40) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalForty');
                }
                if (40 <= data[orderingCol] && data[orderingCol] < 60) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalSixty');
                }
                if (60 <= data[orderingCol] && data[orderingCol] < 80) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalEighty');
                }
                if (80 <= data[orderingCol] && data[orderingCol] < 100) {
                    $(row).removeClass('rowTotalTwenty rowTotalForty rowTotalSixty rowTotalEighty rowTotalHundred');
                    $(row).addClass('rowTotalHundred');
                }
            }
        },
    });
});


