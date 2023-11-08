import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../paginas/Principal/App";
import { buscaTransacoes } from "./transacoes";
import { buscaSaldo } from "./saldo";
import api from "./api";

//criando o mock da api
jest.mock('./api')


//função que simula o que a api faz com o metodo get
const mockRequest = (res) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: res,
            })
        }, 200)
    })
}

//criando o mock que é a lista que tento puxar da api
const mockTransaction = [{
    id: 1,
    transacao: 'Deposito',
    valor: 100,
    data: '22/11//2022',
    mes: 'Novembro'
}]

const mockSaldo = [{
    valor: 50
}]

//função que simula o que a api faz com o metodo get reject
const mockRequestErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe('API request', () => {
    //without mock
    // it('should return a transaction list', async () => {
    //     const transactions = await buscaTransacoes()
    //     expect(transactions).toHaveLength(3)

    //     render(<App />, {wrapper: BrowserRouter})
    //     const transaction = await screen.findAllByText('Novembro')
    //     transaction.forEach(transaction => expect(transaction).toBeInTheDocument())
    // })

   it('should return a transaction list',  async () => {
   
    //mockando a o retorno da req
        api.get.mockImplementation(() => mockRequest(mockTransaction))
        const transactions = await buscaTransacoes()
        expect(transactions).toEqual(mockTransaction)
        expect(api.get).toHaveBeenCalledWith('/transacoes')
   })


   it('should return a empty list when request fails',  async () => {
   
    //mockando a o retorno da req
        api.get.mockImplementation(() => mockRequestErro())
        const transactions = await buscaTransacoes()
        expect(transactions).toEqual([])
        expect(api.get).toHaveBeenCalledWith('/transacoes')
   })

})

describe('API Saldo request', () => {
    it('should return a transaction list',  async () => {
   
        //mockando a o retorno da req
            api.get.mockImplementation(() => mockRequest(mockTransaction))
            const saldo = await buscaSaldo()
            expect(saldo).toEqual(mockSaldo.valor)
            expect(api.get).toHaveBeenCalledWith('/saldo')
       })
    

})