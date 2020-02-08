const observableModule = require("tns-core-modules/data/observable");
const SocialShare = require("nativescript-social-share");
const utilsModule = require("tns-core-modules/utils/utils");
const admob = require("nativescript-admob");



function HomeViewModel() {

    const viewModel = observableModule.fromObject({
        shareTap: function () {
            let data = viewModel.get("imgSrc");
            SocialShare.shareUrl(data, "Here is your Cat!");
        },
        refreshTap: function () {
            viewModel.set("loadIndicator", "true");
            function ajax_get(url, callback) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        try {
                            var data = JSON.parse(xmlhttp.responseText);
                        } catch (err) {
                            return;
                        }
                        callback(data);
                    }
                };

                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
            ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
                let url = data[0]["url"];
                viewModel.set("imgData", url);
                viewModel.set("imgSrc", url);
                setTimeout(function(){ viewModel.set("loadIndicator", "false")}, 1200);
            });
        },
        urlTap: function () {
            let data = viewModel.get("imgSrc");
            utilsModule.openUrl(data);
        },
        showAd: function () {
            console.log('admoba girdi');

            
            // admob.createBanner({
            //     // if this 'view' property is not set, the banner is overlayed on the current top most view
            //     // view: Frame.topmost(),
            //     testing: true, // set to false to get real banners
            //     size: admob.AD_SIZE.SMART_BANNER, // anything in admob.AD_SIZE, like admob.AD_SIZE.SMART_BANNER
            //     iosBannerId: "ca-app-pub-6300265975338589/2608990858", // add your own
            //     androidBannerId: "ca-app-pub-6300265975338589/5226241877", // add your own
            //     // Android automatically adds the connected device as test device with testing:true, iOS does not
            //     // iosTestDeviceIds: ["yourTestDeviceUDIDs", "canBeAddedHere"],
            //     margins: {
            //         // if both are set, top wins
            //          top: 10,
            //         bottom: 5
            //     },
            //
            //     // keywords: ["cat", "cat toys","pets"] // add keywords for ad targeting
            // }).then(
            //     function() {
            //         console.log("admob createBanner done");
            //     },
            //     function(error) {
            //         console.log("admob createBanner error: " + error);
            //     }
            // )




        }
        /* Add your view model properties here */

});
    viewModel.refreshTap();
    // viewModel.showAd();

    return viewModel;
}

module.exports = HomeViewModel;
