function buildStandardsCriterion(criterionDetail) {
    let result = "<div class='standards-criterion-box' style='flex: 0 0 45%'>\n";
    result += "<span style=\"float: right\">" + criterionDetail.totalPoints + " puncte</span>\n";
    result += criterionDetail.criterionName + "<br>\n";
    result += "<span style=\"font-weight: normal\">" + criterionDetail.criterionDescription + "</span>\n";

    for (let score of criterionDetail.scores) {
        result += addStandardsScoreBar(score, criterionDetail.totalPoints);
    }
    if (criterionDetail.otherMentions && criterionDetail.otherMentions !== "")
        result += "<div class=\"standards-criterion-score-bar\">" + criterionDetail.otherMentions + "</div>";
    result += "</div>";

    return result;
}

function addStandardsScoreBar(score, totalPoints) {
    const step = score.level === 0 ? 0 : score.level / totalPoints * 4;
    let result = "<div class=\"standards-criterion-score-bar\">";

    result += "<div>" + score.description + "</div>";
    result += "<div>";
    result += "<div class=\"gradient-scorebar eval-" + (step * 25) + "\" style=\"width: " + (step + 1) * 15 + "%;\"></div>";
    result += "<div class=\"gradient-gray\" style=\"width: " + (4 - step) * 15 + "%; float: left;\"></div>";
    result += "<span style=\"float: right\">" + score.level + " / " + totalPoints + "</span>";
    result += "</div>\n</div>";

    return result;
}

$(document).ready(function () {
    $.getJSON("/wp-content/themes/pedaleaza-child/assets/download/current/barem.json", function (data) {
        const categories = ["caracteristici", "conectivitate", "obstacole"];

        for (let cat of categories) {
            const categoryData = data[cat];
            let htmlToAdd = "";
            for (let criterion of categoryData) {
                htmlToAdd += buildStandardsCriterion(criterion);
            }
            $("#" + cat).html(htmlToAdd);
        }
    });
});
