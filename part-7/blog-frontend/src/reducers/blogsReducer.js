import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = [{ title: 'fetching blogs...', id: 'lol', user: { name: '', id: '' } }]

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            return [...state, action.payload]
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            const id = updatedBlog.id
            return state.map(blog => blog.id !== id ? blog : updatedBlog)
        },
        removeBlog(state, action) {
            console.log('removing state blog')
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        const response = await blogService.getAll()
        dispatch(setBlogs(response))
        console.log('Set blogs to:', response)
    }
}
export const createBlog = (blogObject) => {
    return async (dispatch) => {
        const newBlog = { ...blogObject, likes: 0 }
        const response = await blogService.create(newBlog)
        dispatch(addBlog(response))
    }
}
export const likeBlog = (updatedBlog) => {
    return async (dispatch) => {
        const response = await blogService.update(updatedBlog)
        dispatch(updateBlog(response))
    }
}
export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}
export const commentBlog = (commentObject) => {
    return async (dispatch) => {
        const response = await blogService.comment(commentObject)
        dispatch(updateBlog(response))
    }
}
export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer