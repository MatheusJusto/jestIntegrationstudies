import { renderHook } from "@testing-library/react";
import { useState, useEffect } from "react";

describe('HOOKS', () => {
    it('should test the hooks', () => {
      const {result} = renderHook(() => {
        const [nome, setNome] = useState('')

        useEffect(() => {
            setNome('Matheus')
        }, [])
        return nome
    })

    expect(result.current).toEqual('Matheus')
    })
})