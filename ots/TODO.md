
- evaluate removal of hash value from VERIFY
- "serialize to file" checkbok in STAMP, that enable file name field and download file automatically,
   that is merge 2 and 3   
    - add checkbox "save as file"
    - add filename entry form
    - verify if code below is redundant
        var text = hex2ascii(hexots);
        var blob = new Blob([text], {type: "octet/stream"});
        saveAs(blob, filename);
- in upgrade, if upgraded save to file
    - add checkbox "save as file"
    - add filename entry form
