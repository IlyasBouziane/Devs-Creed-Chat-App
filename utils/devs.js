const devs = []


function devJoin(devId, devname , room){
    const dev = {devId,devname,room}
    devs.push(dev)
    return dev
}


function getDev(devId){
    return dev = devs.find(dev => dev.devId == devId)
    
}

function devLeave(devId) {
    const index = devs.findIndex(dev => dev.devId == devId)
    if(index != -1) {
        return devs.splice(index,1)[0]
    }
}

function getDevsRoom (room){
    return devs.filter(dev => dev.room == room)
}
module.exports = {devJoin,getDev,devLeave,getDevsRoom}