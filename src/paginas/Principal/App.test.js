import {screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import AppRoutes from '../../routes'
import { BrowserRouter } from 'react-router-dom'

describe('<App /> Component', () => {
    it('should allows to add a statement bank', () => {
        render(<App />, { wrapper: BrowserRouter})

        const fieldValue = screen.getByPlaceholderText('Digite um valor')
        const button = screen.getByRole('button')
        const select = screen.getByRole('combobox')

        userEvent.selectOptions(select, ['Depósito'])
        userEvent.type(fieldValue, ['100'])
        userEvent.click(button)

        const newTransection = screen.getByTestId('lista-transacoes')
        const statementList = screen.getByRole('listitem')

        expect(newTransection).toContainElement(statementList)
    })

    it('Should go to the link clicked', async ()  => {
        render(<AppRoutes />, {wrapper: BrowserRouter})

        const linkCardsPage = screen.getByText('Cartões')
        expect(linkCardsPage).toBeInTheDocument()

        userEvent.click(linkCardsPage)
        const cardsPageTitle = await screen.findByText('Meus cartões')
        expect(cardsPageTitle).toBeInTheDocument()
    })

    it('Should go to the Investiment link clicked', async ()  => {
        render(<AppRoutes />, {wrapper: BrowserRouter})

        const linkInvestimentPage = screen.getByText('Investimentos')
        expect(linkInvestimentPage).toBeInTheDocument()

        userEvent.click(linkInvestimentPage)
        const investimentPageTitle = await screen.findByText('Total: R$ 1.000.000,00')
        expect(investimentPageTitle).toBeInTheDocument()
    })
})