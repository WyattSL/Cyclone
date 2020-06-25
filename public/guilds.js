const container = document.getElementById("container")

var req = new XMLHttpRequest;
req.onreadystatechange = function() {
    if (this.readyState == 4) {
        var servers = JSON.parse(this.responseText)
        var req = new XMLHttpRequest;
        req.onreadystatechange = function() {
            if (this.readyState == 4) {
                var config = JSON.parse(this.responseText);
                var i;
                for (i=0;i<servers.length;i++) {
                    var s = servers[i];
                    if (!config[s.id] && /config[s.id].listGuilds) {
                        var div = document.createElement("div");
                        div.class = "w3-card-4"
                        container.appendChild(div);
                        var img = document.createElement("img");
                        img.src = s.iconURL
                        img.alt = "Icon"
                        div.appendChild(img);
                    }
                }
            }
        }
        req.open(`GET`, `/config`);
        req.send();
    }
}
req.open(`GET`, `/servers`)
req.send();