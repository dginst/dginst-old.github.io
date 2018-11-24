const OpenTimestamps = window.OpenTimestamps;

$("#btn-hash").click(function(event){
    event.preventDefault();
    var filename = $("#hash-filename")[0].files[0];
    var hashType = $("#hash-hashType").val();
    if (filename.size > 100 * 1024) {
        $("#hash-hashValue").val("File too big.. not showing...");
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

            $("#hash-hashValue").val(hashValue);

            $("#stamp-hashType").val(hashType)
            $("#stamp-hashValue").val(hashValue);

            var file = $("#hash-filename").val().replace(/^.*[\\\/]/, '')
            $("#save-filename").val(file+".ots");
            $("#load-filename").val(file+".ots");

            $("#verify-hashType").val(hashType)
            $("#verify-hashValue").val(hashValue);
        };
    })(filename);
    reader.readAsArrayBuffer(filename);
    return false;
});

$("#btn-stamp").click(function(event){
    event.preventDefault();
    var hashValue = $("#stamp-hashValue").val();
    var hashType = $("#stamp-hashType").val();

    $("#stamp-ots").val("Waiting for result...");

    const hashData = hexToBytes(hashValue);
    var op;
    if (hashType == "SHA1") {
        op = new OpenTimestamps.Ops.OpSHA1();
    } else if (hashType == "SHA256") {
        op = new OpenTimestamps.Ops.OpSHA256();
    } else if (hashType == "RIPEMD160") {
        op = new OpenTimestamps.Ops.OpRIPEMD160();
    }
    const detached = OpenTimestamps.DetachedTimestampFile.fromHash(op, hashData);
    OpenTimestamps.stamp(detached).then( () => {
        hexots = bytesToHex(detached.serializeToBytes());
        $("#stamp-ots").val(hexots);
        $("#save-hex").val(hexots)
        $("#info-ots").val(hexots);
        $("#upgrade-ots-in").val(hexots);
        $("#verify-ots").val(hexots);
    });
    return false;
});


$("#btn-info").click(function(event){
    event.preventDefault();
    var hexots = $("#info-ots").val();
    const ots = hexToBytes(hexots);
    const detachedOts = OpenTimestamps.DetachedTimestampFile.deserialize(ots);
    const info = OpenTimestamps.info(detachedOts);
    $("#info-info").val(info);
    $("#upgrade-ots-in").val(hexots);
    $("#verify-ots").val(hexots);
return false;
});

$("#btn-upgrade").click(function(event){
    event.preventDefault();
    const ots = hexToBytes($("#upgrade-ots-in").val());

    $("#upgrade-ots-out").val("Waiting for result...");

    const detachedOts = OpenTimestamps.DetachedTimestampFile.deserialize(ots);
    OpenTimestamps.upgrade(detachedOts).then( (changed)=>{
        var hexots = bytesToHex(detachedOts.serializeToBytes());        
        if(changed === true) {
            $("#upgrade-ots-out").val(hexots);
            $("#save-hex").val(hexots);
            $("#verify-ots").val(hexots);
        } else {
            $("#upgrade-ots-out").val("Upgrade not available");
        }
    });
    return false;
});

$("#btn-verify").click(function(event){
    event.preventDefault();
    const hash = hexToBytes($("#verify-hashValue").val());
    var hashType = $("#verify-hashType").val();
    const ots = hexToBytes($("#verify-ots").val());

    var op;
    if (hashType == "SHA1") {
        op = new OpenTimestamps.Ops.OpSHA1();
    } else if (hashType == "SHA256") {
        op = new OpenTimestamps.Ops.OpSHA256();
    } else if (hashType == "RIPEMD160") {
        op = new OpenTimestamps.Ops.OpRIPEMD160();
    }

    $("#verify-attestations").val("Waiting for result...");

    const detached = OpenTimestamps.DetachedTimestampFile.fromHash(op, hash);
    const detachedOts = OpenTimestamps.DetachedTimestampFile.deserialize(ots);
    OpenTimestamps.verify(detachedOts,detached).then( (verifyResults)=>{
        if (Object.keys(verifyResults).length === 0){
            $("#verify-attestations").val("Pending attestation");
        } else {
            var text = "";
            Object.keys(results).map(chain => {
                var date = moment(results[chain].timestamp * 1000).tz(moment.tz.guess()).format('YYYY-MM-DD z')
                text += upperFirstLetter(chain) + ' block ' + results[chain].height + ' attests existence as of ' + date + "\n"
            })
            $("#verify-attestations").val(text);
        }
    }).catch( err => {
        $("#verify-attestations").val("Bad attestation" + err);
    });
    return false;
});

$("#btn-load").click(function(event){
    event.preventDefault();
    var filename = $("#load-filename")[0].files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            var binary = new Uint8Array(e.target.result);
            var hexots = bytesToHex(binary);
            $("#load-ots").val(hexots);
            $("#info-ots").val(hexots);
            $("#upgrade-ots-in").val(hexots);
            $("#verify-ots").val(hexots);
        };
    })(filename);
    reader.readAsArrayBuffer(file);
    return false;
});


$("#btn-save").click(function(event){
    event.preventDefault();
    var hexots = $("#save-hex").val();
    var text = hex2ascii(hexots);
    var blob = new Blob([text], {type: "octet/stream"});

    var filename = $("#save-filename").val();
    saveAs(blob, filename);

    $("#load-filename").val(filename);
    $("#info-ots").val(hexots);
    $("#upgrade-ots-in").val(hexots);
    $("#verify-ots").val(hexots);
return false;
});
