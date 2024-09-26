import { render, screen } from '@testing-library/react'
import Todo from '../src/Todos/Todo.jsx'

test('renders content', () => {
    const todo = {
        text: "Testing todo",
        done: false,
    }
    const placeholder = () => null
    render(<Todo todo={todo} onClickDelete={placeholder} onClickComplete={placeholder} />)

    const element = screen.getByText('Testing todo')
    expect(element).toBeDefined()
})