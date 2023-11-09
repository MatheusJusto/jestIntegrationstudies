import { act, renderHook } from "@testing-library/react";
import useSaldo from './useSaldo'
import { buscaSaldo } from '../services/saldo';

jest.mock('../services/saldo')

const mockSaldo = {
    valor: 100,
  };

describe('Hooks useSaldo', () => {
    it('should show current saldo and a update function', async () => {

        buscaSaldo.mockImplementation(() => mockSaldo)
        const { result } = renderHook(() => {
            useSaldo()
        })

        expect(result.current[0]).toEqual([])

        await act( async () => {
            result.current[1]()
        })

        expect(result.current[0]).toEqual(mockSaldo)
    })
})
