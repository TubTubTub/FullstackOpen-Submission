const loginWith = async (page, username, password) => {
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill(username)
    await textboxes[1].fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, content) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill(content.title)
    await textboxes[1].fill(content.author)
    await textboxes[2].fill(content.url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(`${content.title} ${content.author}`).first().waitFor()
}

export { loginWith, createBlog }