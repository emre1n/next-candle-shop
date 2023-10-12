import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// AAA (Arrange, Act, Assert) method

describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE
    
        const docsElement = screen.getByText('Docs') // ACT
    
        expect(docsElement).toBeInTheDocument(); // ASSERT
    })

    it('should contain the text "information"', () => {
        render(<Home />) // ARRANGE
    
        const docsElement = screen.getByText(/information/i) // ACT
    
        expect(docsElement).toBeInTheDocument(); // ASSERT
    })
})
