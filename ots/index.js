const OpenTimestamps = window.OpenTimestamps;

$("#btn-hash").click(function(event) {
    event.preventDefault();
    $("#hash-output").val("Waiting for result...");

    var filename = $("#hash-filename")[0].files[0];
    var hashType = $("#hash-hashType").val();
    if (filename.size > 100 * 1024) {
        $("#hash-output").val("File too big.. not showing...");
        return;
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            var binary = new Uint8Array(e.target.result);
            console.log("binary");
            console.log(binary);
            var op;
            if (hashType == "SHA1") {
                op = new OpenTimestamps.Ops.OpSHA1();
            } else if (hashType == "SHA256") {
                op = new OpenTimestamps.Ops.OpSHA256();
            } else if (hashType == "RIPEMD160") {
                op = new OpenTimestamps.Ops.OpRIPEMD160();
            }
            const detached = OpenTimestamps.DetachedTimestampFile.fromBytes(op, binary);
            var digest = detached.fileDigest();
            var hashValue = bytesToHex(digest);

            $("#hash-output").val(hashValue);

            $("#stamp-hashType").val(hashType)
            $("#stamp-hashValue").val(hashValue);

            var file = $("#hash-filename").val().replace(/^.*[\\\/]/, '')
            $("#save-filename").val(file+".ots");
        };
    })(filename);
    reader.readAsArrayBuffer(filename);
    return false;
});

$("#btn-stamp").click(function(event) {
    event.preventDefault();
    $("#stamp-output").val("Waiting for result...");

    var hashValue = $("#stamp-hashValue").val();
    var hashType = $("#stamp-hashType").val();
    const hashData = hexToBytes(hashValue);
    var op;
    if (hashType == "SHA1") {
        op = new OpenTimestamps.Ops.OpSHA1();
    } else if (hashType == "SHA256") {
        op = new OpenTimestamps.Ops.OpSHA256();
    } else if (hashType == "RIPEMD160") {
        op = new OpenTimestamps.Ops.OpRIPEMD160();
    }
    const detachedOriginal = OpenTimestamps.DetachedTimestampFile.fromHash(op, hashData);

    OpenTimestamps.stamp(detachedOriginal).then( () => {
        hexots = bytesToHex(detachedOriginal.serializeToBytes());
        $("#stamp-output").val(hexots);
        $("#save-hex").val(hexots)
        $("#info-ots").val(hexots);
        $("#upgrade-ots").val(hexots);
        $("#verify-ots").val(hexots);
    }).catch( err => {
        $("#stamp-output").val("Error: " + err);
    });
    return false;
});

$("#btn-save").click(function(event) {
    event.preventDefault();
    var hexots = $("#save-hex").val();
    var text = hex2ascii(hexots);
    var blob = new Blob([text], {type: "octet/stream"});

    var filename = $("#save-filename").val();
    saveAs(blob, filename);

    $("#info-ots").val(hexots);
    $("#upgrade-ots").val(hexots);
    $("#verify-ots").val(hexots);
return false;
});

$("#btn-load").click(function(event) {
    event.preventDefault();
    $("#load-output").val("Waiting for result...");

    var filename = $("#load-filename")[0].files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            var binary = new Uint8Array(e.target.result);
            var hexots = bytesToHex(binary);
            $("#load-output").val(hexots);
            $("#info-ots").val(hexots);
            $("#upgrade-ots").val(hexots);
            $("#verify-ots").val(hexots);
        };
    })(filename);
    reader.readAsArrayBuffer(filename);
    return false;
});

$("#btn-info").click(function(event) {
    event.preventDefault();
    $("#info-output").val("Waiting for result...");

    var hexots = $("#info-ots").val();
    const ots = hexToBytes(hexots);
    const detachedStamped = OpenTimestamps.DetachedTimestampFile.deserialize(ots);
    const info = OpenTimestamps.info(detachedStamped);
    $("#info-output").val(info);
    $("#upgrade-ots").val(hexots);
    $("#verify-ots").val(hexots);
return false;
});

$("#btn-upgrade").click(function(event) {
    event.preventDefault();
    $("#upgrade-output").val("Waiting for result...");

    const ots = hexToBytes($("#upgrade-ots").val());
    const detachedStamped = OpenTimestamps.DetachedTimestampFile.deserialize(ots);

    OpenTimestamps.upgrade(detachedStamped).then( (changed)=>{
        var hexots = bytesToHex(detachedStamped.serializeToBytes());        
        if (changed === true) {
            $("#upgrade-output").val(hexots);
            $("#save-hex").val(hexots);
            $("#verify-ots").val(hexots);
        } else {
            $("#upgrade-output").val("No upgrade available");
        }
    }).catch( err => {
        $("#upgrade-output").val("Error: " + err);
    });
    return false;
});

$("#btn-verify").click(function(event) {
    event.preventDefault();
    $("#verify-output").val("Waiting for result...");

    const ots = hexToBytes($("#verify-ots").val());
    const detachedStamped = OpenTimestamps.DetachedTimestampFile.deserialize(ots);
    const timestamp = detachedStamped.timestamp

    OpenTimestamps.verifyTimestamp(timestamp).then( (verifyResults)=>{
        if (Object.keys(verifyResults).length === 0) {
            $("#verify-output").val("Pending attestation");
        } else {
            var text = "";
            Object.keys(results).map(chain => {
                var date = moment(results[chain].timestamp * 1000).tz(moment.tz.guess()).format('YYYY-MM-DD z')
                text += upperFirstLetter(chain) + ' block ' + results[chain].height + ' attests existence as of ' + date + "\n"
            })
            $("#verify-output").val(text);
        }
    }).catch( err => {
        $("#verify-output").val("Error: " + err);
    });
    return false;
});
