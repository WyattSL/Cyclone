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
                    if ((!config[s.id]) || config[s.id].listGuilds == "true" || !config[s.id].listGuilds) {
                        var div = document.createElement("div");
                        div.setAttribute("class", "w3-card-2 w3-center");
                        container.appendChild(div);
                        var img = document.createElement("img");
                        img.src = `/icon/${s.id}`;
                        img.alt = "Icon"
                        img.setAttribute("class", "w3-section")
                        div.appendChild(img);
                        var name = document.createElement("h3");
                        name.innerHTML = s.name;
                        name.setAttribute("class", "")
                        div.appendChild(name)
                        if (s.description) {
                            var desc = document.createElement("p");
                            desc.innerHTML = s.description;
                            desc.setAttribute("class", "");
                            div.appendChild(desc);
                        }
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