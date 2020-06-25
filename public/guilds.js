var req = new XMLHttpRequest;
req.onreadystatechange = function() {
    if (this.readyState == 4) {
        var servers = JSON.parse(this.responseText)
        var req = new XMLHttpRequest;
        req.onreadystatechange = function() {
            if (this.readyState == 4) {
                var config = JSON.parse(this.responseText);
                if (config[servers])
            }
        }
        req.open(`GET`, `/config`);
        req.send();
    }
}
req.open(`GET`, `/servers`)
req.send();