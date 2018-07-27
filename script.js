var sellVolumeZero = 0;
var buyVolumeZero = 0;
var totalVolume = 0;
var sellVolumeUSDZero = 0;
var buyVolumeUSDZero = 0;
//Starting from here, this code creates the bitmex websocket
//and comunicates and sends trading information.
var ws = new WebSocket('wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD');

 ws.onopen = function () {
     console.log('Connection Established');
 };

 ws.onmessage = function (event) { //bellow ws.onmessage - everything you want the script to do when a msg is received
    var msg = JSON.parse(event.data);
	var btc = msg.data["0"].homeNotional;
	var xpent = msg.data["0"].size;
	var xprice = msg.data["0"].price;
	var orderside = msg.data["0"].side;

    var sellVolume = 0;
    var buyVolume = 0;
    var sellVolumeUSD = 0;
    var buyVolumeUSD = 0;


    totalVolume += btc;

    if (orderside == "Sell") {
    	sellVolume = sellVolumeZero += btc; //this line adds up to the BTC sell volume
        sellVolumeUSD = sellVolumeUSDZero += xpent; //this line adds up the USD sell volume
        percentSell = (sellVolume * 100) / totalVolume;// calc percent
        $(".red").css("width", percentSell + "vw"); //this line selects the div and apply the width atribute with percenSell var as a value
        $(".sellvolume").html(sellVolume.toFixed(8) + " BTC"); //replaces the BTC total sell volume
        $(".sellvolumeusd").html(sellVolumeUSD.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD"); //replaces the BTC total sell volume
    	//console.log("Total Sold " + sellVolume);
        console.log(percentSell);
    } else if (orderside == "Buy") {
    	buyVolume = buyVolumeZero += btc; //this line adds up to the BTC buy volume
        buyVolumeUSD = buyVolumeUSDZero += xpent; //this line adds up the USD buy volume
        //buy percent sell does not exist because it's defined by the background
        $(".buyvolume").html(buyVolume.toFixed(8) + " BTC"); //replaces the BTC total buy volume
        $(".buyvolumeusd").html(buyVolumeUSD.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD"); //replaces the USD total buy volume
    	//console.log("Total Bought " + buyVolume);
    }


    
    



    //console.log(orderside + " @ " + xprice + " = " + btc + " BTC " + " = " + xpent + " USD");
 };

 ws.onclose = function () {
     // websocket is closed.
     console.log("Too many connections, wait a few minutes and reload page.");
 };//This marks the end of the bitmex websocket code



