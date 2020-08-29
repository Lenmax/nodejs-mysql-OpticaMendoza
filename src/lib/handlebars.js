const {format} = require('timeago.js');

const helpers  = {
    timeago : timeago = (timestamp) => {
        //console.log(timestamp);
        return format(timestamp);
    },
    // ArrayJS : ArrayJS = (items, options) =>{
    //     console.log("ITEMs")
    //     const Clientes = [];
    //     for (var i = 0; i < items.length; i++) {
    //         //console.log(items[i]);
    //         var item = items[i];
    //         console.log("ITEM")
    //         console.log(item);
    //         console.log(item.idCliente);
    //         const cliente = [item.idCliente, item.Nombre, item.Edad, item.FechaVisita];
    //         Clientes.push(cliente);
    //     };
    //     console.log(JSON.stringify(Clientes).toString());
    //     //console.log(options.fn(Clientes));
    //     return JSON.stringify(Clientes).toString();
    // },
};

module.exports = helpers;