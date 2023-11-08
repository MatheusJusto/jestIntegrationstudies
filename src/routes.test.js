import {render, screen } from "@testing-library/react"
import App from "./paginas/Principal/App"
import { BrowserRouter, MemoryRouter, Route, Routes, } from "react-router-dom"
import AppRoutes from './routes'
import Cartoes from './componentes/Cartoes'

describe('routes', () => {
    it('should render the main route', () => {
        // render(<BrowserRouter><App /></BrowserRouter>)
        render(<App />, {wrapper: BrowserRouter})

        const user = screen.getByText('Olá, Joana :)!')
        expect(user).toBeInTheDocument()
    })

    it('should renders credit card route', () => {
        const route = '/cartoes'

        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path={'/'} element={<App />}>
                        <Route path={'/cartoes'} element={<Cartoes />}/>
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        const myCards = screen.getByText('Meus cartões')
        expect(myCards).toBeInTheDocument()
        expect(myCards).toHaveTextContent('Meus cartões')
    })

    it('should renders actual route', () => {

        const route = '/cartoes'
        render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>)
        
        const actualLocation = screen.getByTestId('route')

        expect(actualLocation).toHaveTextContent(route)
    })

    it('should renders 404 page', () => {

        const route = '/extrato'
        render(<MemoryRouter initialEntries={[route]}><AppRoutes /></MemoryRouter>)
        
        const errorPage = screen.getByTestId('pagina-404')
        expect(errorPage).toContainHTML('<h1>Ops! Não encontramos a página</h1>')
    })
})


