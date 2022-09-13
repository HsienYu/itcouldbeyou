const osc = new OSC()

osc.on('/param/density', (message, rinfo) => {
    console.log(message.args)
    console.log(rinfo)
})

osc.on('*', message => {
    console.log(message.args)
})

osc.on('/{foo,bar}/*/param', message => {
    console.log(message.args)
})

osc.on('open', () => {
    const message = new OSC.Message('/test', 12.221, 'hello')
    osc.send(message)
})

osc.open({ port: 9000 })