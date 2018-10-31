function populateFileds() {
    let laneId = new URL(document.URL).searchParams.get("laneId");
    let laneInfo = sessionStorage.getItem(laneId);
    if (laneInfo !== null && laneInfo !== '[object Object]') {
        setFields(JSON.parse(laneInfo));

        // add the movie URL
        $("#movieBox").src(laneInfo.movieLink);
    } else {
        loadSessionStorage(setFields, laneId);
    }
}

function setFields(laneInfo) {
    $("#name").html("Pista " + laneInfo.number + " (" + laneInfo.direction + ")");
    $("#from").html(laneInfo.from);
    $("#via").html(laneInfo.via);
    $("#to").html(laneInfo.to);
    $("#distance").html(laneInfo.distanceKM + " km");

    // build score bars
    $("#latime").html(buildScoreBar(laneInfo.evaluationPercentage["Lățime"]));
    $("#stare").html(buildScoreBar(laneInfo.evaluationPercentage["Stare"]));
    $("#rugozitate").html(buildScoreBar(laneInfo.evaluationPercentage["Rugozitate"]));
    $("#siguranta").html(buildScoreBar(laneInfo.evaluationPercentage["Siguranță"]));
    $("#marcaje").html(buildScoreBar(laneInfo.evaluationPercentage["Marcaje"]));
    $("#borduri").html(buildScoreBar(laneInfo.evaluationPercentage["Borduri"]));

    $("#alte-piste").html(buildScoreBar(laneInfo.evaluationPercentage["Alte piste"]));
    $("#traversari").html(buildScoreBar(laneInfo.evaluationPercentage["Traversări"]));

    $("#mobilier-urban").html(buildScoreBar(laneInfo.evaluationPercentage["Mobilier urban"]));
    $("#masini-parcate").html(buildScoreBar(laneInfo.evaluationPercentage["Mașini parcate"]));
    $("#curatenie").html(buildScoreBar(laneInfo.evaluationPercentage["Curățenie"]));
    $("#altele").html(buildScoreBar(laneInfo.evaluationPercentage["Observații"]));

    // add score points
    $("#latime-points").html(buildScorePoints(laneInfo, "Lățime"));
    $("#stare-points").html(buildScorePoints(laneInfo, "Stare"));
    $("#rugozitate-points").html(buildScorePoints(laneInfo, "Rugozitate"));
    $("#siguranta-points").html(buildScorePoints(laneInfo, "Siguranță"));
    $("#marcaje-points").html(buildScorePoints(laneInfo, "Marcaje"));
    $("#borduri-points").html(buildScorePoints(laneInfo, "Borduri"));

    $("#alte-piste-points").html(buildScorePoints(laneInfo, "Alte piste"));
    $("#traversari-points").html(buildScorePoints(laneInfo, "Traversări"));

    $("#mobilier-urban-points").html(buildScorePoints(laneInfo, "Mobilier urban"));
    $("#masini-parcate-points").html(buildScorePoints(laneInfo, "Mașini parcate"));
    $("#curatenie-points").html(buildScorePoints(laneInfo, "Curățenie"));
    $("#altele-points").html(buildScorePoints(laneInfo, "Observații"));

    // percentage meter
    $("#percentage-meter-number").html(Math.floor(laneInfo.evaluationTotal) + "%");
    $("#percentage-meter-bar").css({"border-color": getRGB(laneInfo.evaluationTotal)});
    $("#percentage-meter-fill").css({"border-color": getRGB(laneInfo.evaluationTotal)});
    $("#percentage-meter-div").addClass("p" + Math.floor(laneInfo.evaluationTotal));
}

function getRGB(value) {
    if (0 <= value && value < 20) return '#ed2224';
    if (20 <= value && value < 40) return '#f6871f';
    if (40 <= value && value < 60) return '#f5eb1e';
    if (60 <= value && value < 80) return '#98ca3c';
    if (80 <= value && value <= 100) return '#04aa48';
    return 'lightgray';
}

function buildScorePoints(laneInfo, key) {
    const eval = laneInfo.evaluation[key];
    const evalPercent = laneInfo.evaluationPercentage[key];

    return eval + (eval === 0 ? "" : " / " + eval / evalPercent);
}

function buildScoreBar(percent) {
    percent *= 100;
    const adjusted = percent * 4 / 5 + 20;
    let result = "<div class='gradient-scorebar eval-" + (percent) + "' style='width: " + (adjusted) + "%; '></div>";
    result += '<div class="gradient-gray" style="width: ' + (100 - adjusted) + '%"></div>';
    return result;
}

function loadSessionStorage(callback, laneId) {
    $.getJSON("/wp-content/themes/pedaleaza-child/assets/download/current/piste_detalii.json", function (data) {
        data.forEach(function (lane) {
            sessionStorage.setItem(storageNumber + '-' + lane.direction, JSON.stringify(lane));
        });
        callback(JSON.parse(sessionStorage.getItem(laneId)));
    });
}

$(document).ready(function () {
    populateFileds();
});
