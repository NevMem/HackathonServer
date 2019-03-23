// const db = require('./db')
const io = require('socket.io-client')
require('colors')

const socket = io.connect('http://localhost:80')

socket.on('connect', () => {
    console.log('Connected'.green)
    socket.emit('auth', { login: 'demo', password: 'demo' })
    
    socket.on('auth succeed', msg => {
        const user = msg.user
        const token = user.token
        console.log(user)

        socket.emit('getUserConcerts')

        socket.on('tray new emoji', msg => {
            console.log(msg)
        })

        socket.on('userConcerts', data => {
            console.log(data)
            let ids = data.map(elem => elem._id)

            setInterval(() => {
                console.log('Sending click')
                socket.emit('emoji clicked', { concertId: ids[0], index: 1 })
            }, 500)

            // for (let i = 1; i != 7; ++i)
                // socket.emit('emoji clicked', { concertId: ids[0], index: i })

        })
    })
})

// setTimeout(() => {
//     const database = db.getDB()
//     database.collection('concerts')
//         .updateMany({}, { $set: { emoji: [ 0, 0, 0, 0, 0, 0 ] } }, (err, data) => {
//             console.log(err, data)
//             db.close()
//         })
// }, 2500)

// app.get('/', (req, res) => {
//     geo.loadMap({ latitude: '59.944595', longitude: '30.312003' }, 500, 500, 12)
//         .then(data => {
//             data.pipe(res)
//         })
//         .catch(err => {
//             console.log(err)
//             res.send('Error')
//         })
// })

// app.listen(81)

// geo.createSuggestions({ latitude: 59.944595, longitude: 30.312003 })
//     .then(data => {
//         console.log(data.length)
//     })
//     .catch(err => {
//         console.log(err)
//     })
