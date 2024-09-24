const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Correct name',
                username: 'Correct username',
                password: 'Correct password'
            }
        })
        
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const usernameElement = await page.getByText('username')
        await expect(usernameElement).toBeVisible()

        const passwordElement = await page.getByText('password')
        await expect(passwordElement).toBeVisible()

        const loginElement = await page.getByRole('button', { name: 'login' })
        await expect(loginElement).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'Correct username', 'Correct password')

            const successMessage = await page.getByText('Successfully logged in as Correct name')
            await expect(successMessage).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'Wrong username', 'Wrong password')
            
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            const successMessage = await page.getByText('Successfully logged in as Correct name')
            await expect(successMessage).not.toBeVisible()
        })
    })
    
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Correct username', 'Correct password')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, { title: 'Example title', author: 'Example author', url: 'Example URL'})
            
            const successMessage = await page.getByText('Example title by Example author added')
            await expect(successMessage).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, { title: 'Example title', author: 'Example author', url: 'Example URL'})
            })

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).first().click()
                await page.getByRole('button', { name: 'like' }).click()
                
                const likeMessage = await page.getByText('likes 1').first()
                await expect(likeMessage).toBeVisible()
            })

            test('a blog can be deleted', async ({ page }) => {
                await page.on('dialog', dialog => dialog.accept())
                await page.getByRole('button', { name: 'view ' }).first().click()
                await page.getByRole('button', { name: 'remove ' }).click()

                const blogMessage = await page.getByText('Example title Example author')
                await expect(blogMessage).not.toBeVisible()
            })
        })
    })
    
    test('remove blog can only be seen by user who added it', async ({ page, request }) => {
        await request.post('/api/users', {
            data: {
                name: 'Other name',
                username: 'Other username',
                password: 'Other password'
            }
        })
        await loginWith(page, 'Correct username', 'Correct password')
        await createBlog(page, { title: 'Example title', author: 'Example author', url: 'Example URL'})
        await page.getByRole('button', { name: 'logout' }).click()

        await loginWith(page, 'Other username', 'Other password')
        await page.getByRole('button', { name: 'view' }).click()

        const removeButton = await page.getByRole('button', { name: 'remove' })
        await expect(removeButton).not.toBeVisible()
    })

    test('multiple blogs are arranged in the order according to the likes', async ({ page }) => {
        await loginWith(page, 'Correct username', 'Correct password')
        await createBlog(page, { title: 'Example title 1', author: 'Example author 1', url: 'Example URL 2'})
        await createBlog(page, { title: 'Example title 2', author: 'Example author 2', url: 'Example URL 2'})   

        await page.getByRole('button', { name: 'view' }).nth(0).click()
        await page.getByRole('button', { name: 'view' }).nth(0).click()
        
        await page.getByRole('button', { name: 'like' }).nth(1).click()
        
        await page.reload()
        await page.getByText('Example title 1 Example author 1').first().waitFor()

        const firstBlogDiv = page.locator('.blogClass').nth(0)
        await expect(firstBlogDiv).toContainText('Example title 2 Example author 2')
        const secondBlogDiv = page.locator('.blogClass').nth(1)
        await expect(secondBlogDiv).toContainText('Example title 1 Example author 1')
    })
})