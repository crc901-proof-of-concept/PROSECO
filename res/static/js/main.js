$(document).ready(function() {
	checkResult();
	listenStrategyLogs();
	/* SendResolution(); */
});

var strategyLogSource;
var resultSource;

var timeoutAsked;

// bind to Server-Sent Event Emitter to check process result
function checkResult() {
	if (typeof (EventSource) !== "undefined") {
		currentUrl = window.location.href.split("/").pop();
		resultSource = new EventSource("/api/result/" + currentUrl);
		resultSource.onmessage = function(event) {
//			if (!timeoutAsked && event.data.includes('.')) {
//				if (!confirm("Time out reached do you want to continue?")) {
//					document.getElementById("strategy-result").innerHTML = "Canceled";
//					StopService();
//					resultSource.close();
//					strategyLogSource.close();
//				} else {
//					timeoutAsked = true;
//					document.getElementById("strategy-result").innerHTML = event.data;
//				}
//			} else {
				document.getElementById("strategy-result").innerHTML = event.data;
//			}
		};
	} else {
		document.getElementById("strategy-result").innerHTML = "Your browser does not support server-sent events.";
	}
}

function listenStrategyLogs() {
	if (typeof (EventSource) !== "undefined") {
		currentUrl = window.location.href.split("/").pop();
		strategyLogSource = new EventSource("/api/strategyLogs/" + currentUrl);
		strategyLogSource.onmessage = function(event) {
			var field = "<div class=\"container\" style=\"margin-top: 30px\">";
			const data = JSON.parse(event.data);
			for ( var logPair in data['logList']) {
				var allLog = data['logList'][logPair]['systemAllLog'];
				allLog = allLog
						.replace(/\$\_\(/g, '<span style=\"color:red\">');
				allLog = allLog.replace(/\)\_\$/g, '</span>');
				var errLog = data['logList'][logPair]['systemErrorLog'];
				errLog = errLog
						.replace(/\$\_\(/g, '<span style=\"color:red\">');
				errLog = errLog.replace(/\)\_\$/g, '</span>');
				field = field
						+ "<div class=\"col-xs-6\">"
						+ "<ul class=\"nav nav-tabs\" id=\"myTab\" style=\"max-width: 564px\">"
						+ "<li role=\"tab\" class=\"active\"><a href=\"#merged-"
						+ data['logList'][logPair]['strategyName']
						+ "\" data-toggle=\"tab\">Merged</a></li>"
						+ "<li role=\"tab\"><a href=\"#separated-"
						+ data['logList'][logPair]['strategyName']
						+ "\" data-toggle=\"tab\">Separated</a></li>"
						+ "</ul>"
						+ "<div class=\"tab-content\">"
						+ "<div id=\"merged-"
						+ data['logList'][logPair]['strategyName']
						+ "\" class=\"tab-pane active\">"
						+ "<div class=\"col-xs-12\">"
						+ data['logList'][logPair]['strategyName']
						+ " System Out &amp; Err"
						+ "<div class=\"pre-scrollable\" style=\"min-height: 200px; max-height: 200px; max-width: 600px;\">"
						+ "<pre>"
						+ allLog
						+ "</pre>"
						+ "</div>"
						+ "</div>"
						+ "</div>"
						+ "<div id=\"separated-"
						+ data['logList'][logPair]['strategyName']
						+ "\" class=\"tab-pane\">"
						+ "<div class=\"row\">"
						+ "<div class=\"col-xs-6\">"
						+ data['logList'][logPair]['strategyName']
						+ " System Out"
						+ "<div class=\"pre-scrollable\" style=\"min-height: 200px; max-height: 200px; max-width: 300px;\">"
						+ "<pre>"
						+ data['logList'][logPair]['systemOutLog']
						+ "</pre>"
						+ "</div>"
						+ "</div>"
						+ "<div class=\"row\">"
						+ "<div class=\"col-xs-6\">"
						+ data['logList'][logPair]['strategyName']
						+ "System Error"
						+ "<div class=\"pre-scrollable\" style=\"min-height: 200px; max-height: 200px; max-width: 300px;\">"
						+ "<pre>" + errLog + "</pre>"
						+ "</div></div></div></div></div></div></div>";

			}

			$('#strategy-logs').html(field);
			for (var i = 0, len = tabArray.length; i < len; i++) {
				$('.nav-tabs a[href="' + tabArray[i] + '"]').tab('show');
			}

			// set scroll bar to the bottom
			$('.pre-scrollable').scrollTop(1E10);
		};
	} else {
		document.getElementById("strategy-result").innerHTML = "Your browser does not support server-sent events.";
	}
}

var strategyLogListenerButton = document
		.getElementById("btn-strategy-log-listener");

strategyLogListenerButton.addEventListener("click", stopListeningStrategyLogs);

// start console out
function startListeningStrategyLogs() {
	strategyLogListenerButton.removeEventListener("click",
			startListeningStrategyLogs);
	strategyLogListenerButton.addEventListener("click",
			stopListeningStrategyLogs);
	strategyLogListenerButton.value = "Stop Console";
	listenStrategyLogs();
}

// stop console out
function stopListeningStrategyLogs(event) {
	strategyLogListenerButton.removeEventListener("click",
			stopListeningStrategyLogs);
	strategyLogListenerButton.addEventListener("click",
			startListeningStrategyLogs);
	strategyLogListenerButton.value = "Start Console";
	strategyLogSource.close();
}

// Stop Created Prototype Service
function StopService() {
	currentUrl = window.location.href.split("/").pop();
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/api/stopService/" + currentUrl,
		cache : false,
		timeout : 60000,
		success : function(data) {
			console.log(data);
		},
		error : function(e) {
			console.log("ERROR : ", e);
		}
	});
	document.getElementById("strategy-result").innerHTML = "Canceled";
	resultSource.close();
	strategyLogSource.close();
}

function SendResolution() {
	var screenHeight = window.screen.height;
	var screenWidth = window.screen.width;

	currentUrl = window.location.href.split("/").pop();
	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/api/sendResolution/" + currentUrl + "?height=" + screenHeight
				+ "&width=" + screenWidth,
		cache : false,
		timeout : 60000,
		success : function(data) {
			console.log(data);
		},
		error : function(e) {
			console.log("ERROR : ", e);
		}
	});
}

var tabArray = []

$(document).on('shown.bs.tab', function(e) {
	console.log(e.target.hash);
	tabArray.push(e.target.hash);
});