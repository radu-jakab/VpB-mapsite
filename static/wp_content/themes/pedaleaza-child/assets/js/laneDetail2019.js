function populateFileds() {
    let laneId = new URL(document.URL).searchParams.get("laneId");

    Promise.all(
        [loadDataFile('/wp_content/themes/pedaleaza-child/assets/download/current/piste_detalii.json'),
            loadDataFile('/wp_content/themes/pedaleaza-child/assets/download/current/piste_detalii_2019.json')]
    ).then((values) => {
        const lane2018 = values[0].filter(lane => (lane.number + '-' + lane.direction) === laneId)[0];
        const lane2019 = values[1].filter(lane => (lane.number + '-' + lane.direction) === laneId)[0];

        buildPageTop(lane2019);
        setFields2019(lane2019);
        if (lane2018) setFields2018(lane2018);
    });
}

function buildPageTop(laneInfo) {
    $("#name").html("Pista " + laneInfo.number + " (" + laneInfo.direction + ")");
    $("#from").html(laneInfo.from);
    $("#via").html(laneInfo.via);
    $("#to").html(laneInfo.to);
    $("#distance").html(laneInfo.distanceKM + " km");

    // percentage meter
    $("#percentage-meter-number").html(Math.floor(laneInfo.evaluationTotal));
    $("#percentage-meter-bar").css({"border-color": getRGB(laneInfo.evaluationTotal)});
    $("#percentage-meter-fill").css({"border-color": getRGB(laneInfo.evaluationTotal)});
    $("#percentage-meter-div").addClass("p" + Math.floor(laneInfo.evaluationTotal));

    // add the movie URL
    if (laneInfo.movieLink) $("#movieBox").attr('src', laneInfo.movieLink);
    else $("#movieBox").css({"display": "none"});
}

function setFields2019(laneInfo) {
    // build score bars
    Object.keys(elementsMap).forEach(key => $('#' + key).html(buildScoreBar(laneInfo.evaluationPercentage[elementsMap[key]])));

    // add score points
    Object.keys(elementsMap).forEach(key => $(`#${key}-points`).html(buildScorePoints(laneInfo, elementsMap[key])));
}

function setFields2018(laneInfo) {
    // build score bars
    Object.keys(elementsMap).forEach(key => $(`#${key}-2018`).html(buildScoreBar(laneInfo.evaluationPercentage[elementsMap[key]], false)));

    // add score points
    Object.keys(elementsMap).forEach(key => $(`#${key}-points-2018`).html(buildScorePoints(laneInfo, elementsMap[key])));
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

function buildScoreBar(percent, isPrimary = true) {
    percent *= 100;
    const adjusted = percent * 4 / 5 + 20;
    let result = `<div class="gradient-scorebar${isPrimary ? '' : '-secondary'} eval-${percent}" style="width: ${adjusted}%;"></div>`;
    result += `<div class="gradient-gray${isPrimary ? '' : '-secondary'}" style="width: ${100 - adjusted}%"></div>`;
    return result;
}

elementsMap = {
    "latime": "Lățime",
    "stare": "Stare",
    "aderenta": "Aderență",
    "siguranta": "Siguranță",
    "marcaje": "Marcaje",
    "borduri": "Borduri",
    "alte-piste": "Alte piste",
    "traversari": "Traversări",
    "mobilier-urban": "Mobilier urban",
    "masini-parcate": "Mașini parcate",
    "curatenie": "Curățenie",
    "altele": "Observații"
};

$(document).ready(function () {
    if (document.URL.includes("/detalii-pista.html/?laneId"))
        populateFileds();
});
