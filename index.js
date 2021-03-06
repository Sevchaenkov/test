window.onload = function(){
	games = ["413150", "578080", "271590"] //Stardew Valley, PUBG, GTA:V
	if (localStorage.getItem("webhookURL")){
		console.log("Webhook has been found in localStorage");
		$("#webhooklink").prop("value", localStorage.getItem("webhookURL"))
	};
}
function update() {
	let url = $("#webhooklink").prop("value");
	if (url == ''){
		alert("Webhook link is empty!");
	}
	games.forEach( (element) => {
		$.get("http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=381210"+element+"&count=3&maxlength=300&format=json", (data) => {
			let description = data.appnews.newsitems[0].contents;
			description = description.replace(/<[^>]*>/g, '');
			localStorage.setItem("webhookURL", url);
			$.post(url,
				JSON.stringify({
				"embeds": [
					{
						"title": data.appnews.newsitems[0].title,
						"url": data.appnews.newsitems[0].url,
						"description": description,
						"color": 15158332
					}]
			})
		);
		});
	});
	alert('Successfully posted!');
};
