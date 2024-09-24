import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author only', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Blogger',
        likes: 10,
        url: 'testblog.com',
		user: {
			name: "Blogger Blogs",
			id: "123"
		}
    }
	const user = {
		id: "1"
	}

	render(<Blog blog={blog} user={user} />)

	let element = screen.getByText('Test Blog Test Blogger')
	expect(element).toBeDefined()
})

test('clicking view button shows likes and url', async () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Blogger',
        likes: 10,
        url: 'testblog.com',
		user: {
			name: "Blogger Blogs",
			id: "123"
		}
    }
	const user = {
		id: "1"
	}

	const { container } = render(<Blog blog={blog} user={user} />)

	const div = container.querySelector('.hiddenClass')
	expect(div).toHaveStyle('display: none')

	const eventUser = userEvent.setup()
	const button = screen.getByText('view')
	await eventUser.click(button)

	expect(div).not.toHaveStyle('display: none')
	const likesElement = screen.getByText('likes')
	const urlElement = screen.getByText('testblog.com')
	expect(likesElement).toBeDefined()
	expect(urlElement).toBeDefined()
})

test('clicking like button calls click event handler', async () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Blogger',
        likes: 10,
        url: 'testblog.com',
		user: {
			name: "Blogger Blogs",
			id: "123"
		}
    }
	const user = {
		id: "1"
	}

	const mockHandler = vi.fn()

	const { container } = render(<Blog blog={blog} user={user} optionalLikeHandler={mockHandler} />)
	const button = screen.getByText('like')

	const eventUser = userEvent.setup()
	await eventUser.click(button)
	await eventUser.click(button)

	expect(mockHandler.mock.calls).toHaveLength(2)
})