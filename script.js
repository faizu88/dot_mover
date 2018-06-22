$(function () {
    var loopPaths = [];
    var paths = [
        {d: "M 100 547 L 100 547", id: "pointPath_0"},
        {d: "M 155 534 L 155 534", id: "pointPath_1"},
        {d: "M 172 500 L 172 500", id: "pointPath_2"},
        {d: "M 220 497 L 220 497", id: "pointPath_3"},
        {d: "M 241 453 L 241 453", id: "pointPath_4"},
        {d: "M 275 436 L 275 436", id: "pointPath_5"},
        {d: "M 348 427 L 348 427", id: "pointPath_6"},
        {d: "M 387 404 L 387 404", id: "pointPath_7"},
        {d: "M 352 360 L 352 360", id: "pointPath_8"},
        {d: "M 400 300 L 400 300", id: "pointPath_9"},
        {d: "M 449 206 L 449 206", id: "pointPath_10"},
        {d: "M 504 256 L 504 256", id: "pointPath_11"},
        {d: "M 597 327 L 597 327", id: "pointPath_12"},
        {d: "M 598 389 L 598 389", id: "pointPath_13"},
        {d: "M 651 456 L 651 456", id: "pointPath_14"},
        {d: "M 648 536 L 648 536", id: "pointPath_15"}
    ];

    function checkSelectedPointDirection(selElemRef) {
        var previousActivePointPathId = $(".activePointPath").attr("data-active-point-path-id");
        var previousActivePointPathIdNumber = +previousActivePointPathId.split("_")[1];
        var selectedPointPathId = $(selElemRef).attr("id");
        var selectedPointPathIdNumber = +selectedPointPathId.split("_")[1];
        var pointObj = {
            selPointNo: selectedPointPathIdNumber,
            prePointNo: previousActivePointPathIdNumber,
            dir: selectedPointPathIdNumber <= previousActivePointPathIdNumber ? "lesser" : "greater"
        };
        return pointObj;
    }

    function animeTimeline(loopPaths) {
        if (loopPaths && loopPaths.length) {
            var timeline = anime.timeline();
            timeline.add({
                targets: ".activePointPath",
                d: {value: loopPaths[0]["d"], duration: 1000, easing: "easeInOutQuad"},
                complete: function () {
                    $(".activePointPath").attr(
                        "data-active-point-path-id",
                        loopPaths[0]["id"]
                    );
                    loopPaths.shift();
                    animeTimeline(loopPaths);
                }
            });
        } else {
            $(".pointPath").off("click", pointPathAnimationInProgress);
            $(".pointPath").on("click", pointPathOnClick);
        }
    }

    function pointPathOnClick() {
        $(".pointPath").off("click", pointPathOnClick);
        $(".pointPath").on("click", pointPathAnimationInProgress);
        var pointObj = checkSelectedPointDirection(this);
        switch (pointObj.dir) {
            case "lesser":
                loopPaths = paths.slice(pointObj.selPointNo, pointObj.prePointNo).reverse();
                animeTimeline(loopPaths);
                break;
            case "greater":
                loopPaths = paths.slice(pointObj.prePointNo + 1, pointObj.selPointNo + 1);
                animeTimeline(loopPaths);
                break;
            default:
                alert("Something went wrong");
        }
    }

    function pointPathAnimationInProgress() {
        new PNotify.removeAll();
        new PNotify({title: "Warning", text: "Animation is in progress. Please wait!"});
    }

    $(".pointPath").on("click", pointPathOnClick);
});

