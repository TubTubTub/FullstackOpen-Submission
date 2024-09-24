import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from '../components/CreateForm'

test('creating a blog calls create event handler correctly', async () => {
    const createBlog = vi.fn()
    const eventUser = userEvent.setup()
    const exampleArguments = {
        title: 'Called once blog',
        author: 'Called once blogger',
        url: 'Called once URL'
    }

	render(<CreateForm createNewBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    await eventUser.type(inputs[0], exampleArguments.title)
    await eventUser.type(inputs[1], exampleArguments.author)
    await eventUser.type(inputs[2], exampleArguments.url)

    const button = screen.getByText('create')
    await eventUser.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(exampleArguments.title)
    expect(createBlog.mock.calls[0][0]).toStrictEqual(exampleArguments)
})