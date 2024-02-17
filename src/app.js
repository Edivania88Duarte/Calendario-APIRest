import express, { request, response } from 'express'

const app = express()

app.use(express.json())

//mock - mockar = testar
const eventos = [
    {id: 1, name: 'Edi', event: 'aniversario', date: 21, datetime:19},
    {id: 2, name: 'Pri', event: 'prova faculdade', date: 28, datetime: 14},
]

//Retornar o objeto por id
function buscarEventosPorId(id) {
    return eventos.filter(eventos => eventos.id == id)
}

//Pegar a posição ou index do elemento no array por id
function buscarIndexEventos(id){
    return eventos.findIndex(eventos => eventos.id == id)
}

//ROTA POST PARA FAZER A INSERÇÃO DE DADOS
app.post('/eventos', (request, response) => {
    eventos.push(request.body)
    response.status(201).send('Evento criado com sucesso!')
})

//ROTA RAIZ OU PADRÃO
app.get('/', (require, response) => {
    response.send('Vamos conseguir em nome de Jesus!')
})

//ROTA GET PARA LER/LISTAR OS EVENTOS
app.get('/eventos', (require, response) => {
    response.send(eventos)
})

//ROTA GET PARA LISTAR OS EVENTOS POR ID
app.get('/eventos/:id', (request, response) => {
    response.json(buscarEventosPorId (request.params.id))
})

//ROTA PARA ATUALIZAR OS EVENTOS POR ID
app.put('/eventos/:id', (request, response) => {
    let index = buscarIndexEventos(request.params.id)
    eventos[index].date = request.body.date
    eventos[index].datetime = request.body.datetime
    response.json(eventos)
})

//ROTA PARA DELETAR OS EVENTOS POR ID
app.delete('/eventos/:id', (request, response) => {
    let index = buscarIndexEventos(request.params.id)
    eventos.splice(index, 1)
    response.send('Evento excluído com sucesso')
})



export default app
