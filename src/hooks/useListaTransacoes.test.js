import { act, renderHook } from "@testing-library/react";
import  useListaTransacoes  from './useListaTransacoes'
import { buscaTransacoes } from '../services/transacoes';

jest.mock('../services/transacoes')

const mockTransaction = [{
    transacao: "Depósito",
    valor: "150",
    data: "18/11/2022",
    mes: "Novembro",
    id: 1
}]

describe('hooks/useListaTransacoes', () => {
    it('should return a transaction list and a update function', async () => {
        
        buscaTransacoes.mockImplementation(() => mockTransaction)
        const { result } = renderHook(() => {
            useListaTransacoes()
        })

        expect(result.current[0]).toEqual([])

        await act( async () => {
            result.current[1]()
        })

        expect(result.current[0]).toEqual(mockTransaction)
    })
})

