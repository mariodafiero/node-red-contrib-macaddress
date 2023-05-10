const  os = require('os');

module.exports = function(RED) {
    function MACAdressNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var networkInterfaces = Object.values(os.networkInterfaces())
    .reduce((r, a) => {
        r = r.concat(a)
        return r;
    }, [])
    .filter(({ family, address,mac }) => {
        return family.toLowerCase().indexOf('v4') >= 0 &&
            address !== '127.0.0.1'
    })
     .map( ({ address,mac }) =>  { 
         return { address , mac } }
     );
var ipAddresses = networkInterfaces[0];

msg.payload = ipAddresses ;


		node.send(msg);
        });
    }
    RED.nodes.registerType("MACAdress",MACAdressNode);
}
