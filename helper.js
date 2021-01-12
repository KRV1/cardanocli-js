exports.ownerToString = (ownerList) => {
  let result = "";
  ownerList.forEach(
    (owner) => (result += `--pool-owner-stake-verification-key-file ${owner} `)
  );
  return result;
};

exports.relayToString = (relayList) => {
  let result = "";
  relayList.forEach((relay) => {
    if (!((relay.host || relay.ip) && relay.port) && !relay.multiHost)
      throw new Error("Relay is missing arguments");
    if (relay.host) {
      result += `--single-host-pool-relay ${relay.host} --pool-relay-port ${relay.port} `;
    } else if (relay.ip) {
      result += `--pool-relay-ipv4 ${relay.ip} --pool-relay-port ${relay.port} `;
    } else if (relay.multiHost) {
      result += `--multi-host-pool-relay ${relay.multiHost} `;
    }
  });
  return result;
};

exports.certToString = (certList) => {
  let result = "";
  certList.forEach((cert) => (result += `--certificate-file ${cert} `));
  return result;
};

exports.txInToString = (txInList) => {
  let result = "";
  txInList.forEach(
    (txIn) => (result += `--tx-in ${txIn.txHash}#${txIn.txId} `)
  );
  return result;
};

exports.txOutToString = (txOutList) => {
  let result = "";
  txOutList.forEach(
    (txOut) => (result += `--tx-out ${txOut.address}+${txOut.amount} `)
  );
  return result;
};

exports.signingKeysToString = (signingKeys) => {
  let result = "";
  signingKeys.forEach(
    (signingKey) => (result += `--signing-key-file ${signingKey} `)
  );
  return result;
};

exports.witnessFilesToString = (witnessFiles) => {
  let result = "";
  witnessFiles.forEach(
    (witnessFile) => (result += `--witness-file ${witnessFile} `)
  );
  return result;
};

exports.fileException = (callback) => {
  try {
    callback();
  } catch {}
};

exports.setKeys = (obj, path, value) => {
  var pList = path.split(".");
  var len = pList.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!obj[elem]) obj[elem] = {};
    obj = obj[elem];
  }

  obj[pList[len - 1]] = value;
};

exports.tryParseJSON = (jsonString) => {
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return true;
    }
  } catch (e) {}

  return false;
};
